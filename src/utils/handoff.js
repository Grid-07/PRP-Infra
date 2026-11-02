import { reactive } from 'vue'

/**
 * The hand-off between the group page and a project page.
 *
 * The cover is not a page transition -- it is one fixed element that outlives
 * the route change. Clicking a project card records the card's rectangle and
 * its image; the overlay then grows from exactly that rectangle to fill the
 * viewport, the router swaps the page underneath while the screen is covered,
 * and the project page releases the cover only once its own hero has decoded.
 * Without that last step the cover lifts onto a half-loaded page and the whole
 * illusion breaks.
 *
 * Coming back, the same frame shrinks onto the card it was lifted from. That
 * needs the card's position to still be known, so the click also remembers the
 * slug and the scroll offset in sessionStorage -- the project page replaces the
 * group page, and anything held in component state would go with it.
 */
export const KEY = 'prp:handoff'

export const handoff = reactive({
  active: false,
  phase: 'idle', // idle | growing | fading | reversing | shrinking
  src: '',
  name: '',
  /** Card frame in viewport px. `null` means full bleed. */
  rect: null,
  /** Set by the project page once it is ready to be seen. */
  ready: false,
})

export function openHandoff({ src, name, rect }) {
  handoff.src = src
  handoff.name = name
  handoff.rect = rect
  handoff.ready = false
  handoff.phase = 'growing'
  handoff.active = true
}

/** Called by the project page: the page is painted, let the cover go. */
export function releaseHandoff() {
  if (!handoff.active) return
  handoff.phase = 'fading'
  window.setTimeout(reset, 700)
}

/* ------------------------------------------------------------- remember --- */

/** Record where the visitor was, so Back can replay the move in reverse. */
export function remember(slug) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ slug, y: Math.round(window.scrollY) }))
  } catch {
    /* private mode -- the forward transition still works */
  }
}

/** Non-destructive: the router asks this before the group page remounts. */
export function hasPending() {
  try {
    return Boolean(sessionStorage.getItem(KEY))
  } catch {
    return false
  }
}

export function takePending() {
  let raw = ''
  try {
    raw = sessionStorage.getItem(KEY) || ''
    if (raw) sessionStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    if (parsed && parsed.slug) return parsed
  } catch {
    /* corrupt value -- treat as no pending move */
  }
  return null
}

/* ---------------------------------------------------------------- reverse --- */

/** Cover the screen at full bleed, so the group page never flashes through. */
export function beginReverse({ src, name }) {
  handoff.src = src
  handoff.name = name
  handoff.rect = null
  handoff.ready = true
  handoff.phase = 'reversing'
  handoff.active = true
}

/** Shrink the cover back onto the card it came from. */
export function shrinkTo(rect) {
  handoff.rect = rect
  handoff.phase = 'shrinking'
}

export function endReverse(delay = 0) {
  window.setTimeout(() => {
    handoff.phase = 'fading'
    window.setTimeout(reset, 320)
  }, delay)
}

export function reset() {
  handoff.active = false
  handoff.phase = 'idle'
  handoff.rect = null
  handoff.src = ''
  handoff.name = ''
  handoff.ready = false
  document.documentElement.style.scrollBehavior = ''
}

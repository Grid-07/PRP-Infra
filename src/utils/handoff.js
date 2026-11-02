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
 */
export const handoff = reactive({
  active: false,
  phase: 'idle', // idle | growing | holding | fading
  src: '',
  name: '',
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
  window.setTimeout(() => {
    handoff.active = false
    handoff.phase = 'idle'
    handoff.rect = null
    handoff.src = ''
  }, 700)
}

<template>
  <!-- Teleported out of the app tree so the page behind can be dimmed without
       dragging this fixed overlay along. -->
  <Teleport to="body">
    <div
      v-if="handoff.active"
      class="handoff"
      :class="{
        'is-open': open,
        'is-landed': landed,
        'is-fading': handoff.phase === 'fading',
      }"
      :style="frameVars"
      aria-hidden="true"
    >
      <div class="handoff__scrim"></div>

      <div class="handoff__frame">
        <img :src="handoff.src" alt="" />
        <div class="handoff__veil"></div>
        <span class="handoff__name">{{ handoff.name }}</span>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, ref, watch, nextTick } from 'vue'
import { handoff } from '../utils/handoff'

const open = ref(false)
const landed = ref(false)

/**
 * The frame is positioned from the card's own rectangle and grown to the
 * viewport by changing left/top/width/height -- not by clipping a full-screen
 * copy. The photograph is `object-fit: cover` inside the frame, so it re-crops
 * as the frame moves and the frame's edges always show the same crop the card
 * was showing. Clipping would show the centre of a full-screen crop instead,
 * which is a different picture, and the move would jump at both ends.
 */
const frameVars = computed(() => {
  const r = handoff.rect
  if (!r) {
    return { '--hl': '0px', '--ht': '0px', '--hw': '100vw', '--hh': '100vh' }
  }
  return {
    '--hl': `${r.left}px`,
    '--ht': `${r.top}px`,
    '--hw': `${r.right - r.left}px`,
    '--hh': `${r.bottom - r.top}px`,
  }
})

watch(
  () => handoff.phase,
  async (phase) => {
    if (phase === 'growing') {
      landed.value = false
      open.value = false
      await nextTick()
      // One frame with the frame parked on the card, then let it run.
      requestAnimationFrame(() => requestAnimationFrame(() => (open.value = true)))
    }

    // Reverse: already full bleed, about to shrink onto the card.
    if (phase === 'reversing') {
      landed.value = false
      open.value = true
    }

    // `shrinking` is driven by the caller, which sets the rect first and then
    // flips the phase, so closing the frame animates straight onto the card.
    if (phase === 'shrinking') {
      open.value = false
    }

    // Fading out of a forward hand-off: the scrim, veil and caption drop in a
    // single frame so what is left is a full-bleed copy of the photograph the
    // hero is already showing underneath, and only that copy fades.
    if (phase === 'fading') {
      landed.value = true
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.handoff {
  position: fixed;
  inset: 0;
  z-index: 9000;
  pointer-events: none;
  transition: opacity 0.3s var(--ease);
}

.handoff.is-fading {
  opacity: 0;
}

.handoff__scrim {
  position: absolute;
  inset: 0;
  background: rgba(0, 18, 37, 0.55);
  opacity: 0;
  transition: opacity 0.5s var(--ease);
}

.handoff.is-open .handoff__scrim {
  opacity: 1;
}

.handoff__frame {
  position: fixed;
  left: var(--hl);
  top: var(--ht);
  width: var(--hw);
  height: var(--hh);
  overflow: hidden;
  background: var(--navy-950);
  transition:
    left 0.78s cubic-bezier(0.65, 0, 0.2, 1),
    top 0.78s cubic-bezier(0.65, 0, 0.2, 1),
    width 0.78s cubic-bezier(0.65, 0, 0.2, 1),
    height 0.78s cubic-bezier(0.65, 0, 0.2, 1);
}

.handoff.is-open .handoff__frame {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.handoff__frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 1.02 is the resting scale of a grid card's own image. Matching it means the
     cover is pixel-identical to the card it lands on, so the fade at the end of
     a reverse reveals no jump. */
  transform: scale(1.02);
  transition: transform 0.8s var(--ease);
}

.handoff.is-open .handoff__frame img {
  transform: scale(1.07);
}

.handoff__veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 18, 37, 0.35) 0%, rgba(0, 18, 37, 0.82) 100%);
  opacity: 0;
  transition: opacity 0.55s var(--ease);
}

.handoff.is-open .handoff__veil {
  opacity: 1;
}

.handoff__name {
  position: absolute;
  left: 50%;
  bottom: clamp(2rem, 12vh, 7rem);
  transform: translateX(-50%) translateY(14px);
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 6vw, 3.6rem);
  font-weight: 300;
  letter-spacing: 0.04em;
  color: var(--cream);
  opacity: 0;
  white-space: nowrap;
  /* Leaving: get out of the way fast. */
  transition: opacity 0.26s var(--ease), transform 0.34s var(--ease);
}

.handoff.is-open .handoff__name {
  opacity: 1;
  transform: translateX(-50%);
  /* Arriving: settle in after the frame has mostly opened. */
  transition: opacity 0.45s var(--ease) 0.16s, transform 0.6s var(--ease) 0.16s;
}

/* --------------------------------------------------------------- landing --- */
/* Arrived in the project: everything that made this a card cover comes off at
   once, with no transition of its own, so the only thing left on screen is the
   photograph the hero is already showing underneath. */
.handoff.is-landed .handoff__scrim,
.handoff.is-landed .handoff__veil,
.handoff.is-landed .handoff__name {
  opacity: 0;
  transition: none;
}

.handoff.is-landed .handoff__frame img {
  transform: scale(1);
  transition: none;
}

@media (prefers-reduced-motion: reduce) {
  .handoff,
  .handoff__frame,
  .handoff__frame img,
  .handoff__veil,
  .handoff__scrim,
  .handoff__name {
    transition-duration: 0.01ms;
  }
}
</style>

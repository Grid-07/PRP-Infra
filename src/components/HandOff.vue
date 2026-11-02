<template>
  <div
    v-if="handoff.active"
    class="handoff"
    :class="{ 'is-grown': grown, 'is-fading': handoff.phase === 'fading' }"
    :style="clipStyle"
    aria-hidden="true"
  >
    <img class="handoff__img" :src="handoff.src" alt="" />
    <div class="handoff__veil"></div>
    <span class="handoff__name">{{ handoff.name }}</span>
  </div>
</template>

<script setup>
import { computed, ref, watch, nextTick } from 'vue'
import { handoff } from '../utils/handoff'

const grown = ref(false)

/**
 * Grow from the clicked card's exact rectangle to the viewport, using clip-path
 * inset so nothing in the overlay has to re-layout while it animates.
 */
const clipStyle = computed(() => {
  const r = handoff.rect
  if (grown.value || !r) return { clipPath: 'inset(0 0 0 0)' }
  const top = Math.max(0, r.top)
  const left = Math.max(0, r.left)
  const right = Math.max(0, window.innerWidth - r.right)
  const bottom = Math.max(0, window.innerHeight - r.bottom)
  return { clipPath: `inset(${top}px ${right}px ${bottom}px ${left}px)` }
})

watch(
  () => handoff.phase,
  async (phase) => {
    if (phase === 'growing') {
      grown.value = false
      await nextTick()
      // One frame with the clip parked on the card, then let it run.
      requestAnimationFrame(() => requestAnimationFrame(() => (grown.value = true)))
    }
    if (phase === 'fading') grown.value = true
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
  will-change: clip-path;
  transition: clip-path 0.85s cubic-bezier(0.65, 0, 0.2, 1), opacity 0.6s ease;
  background: var(--navy-950);
}

.handoff.is-grown {
  clip-path: inset(0 0 0 0);
}

.handoff.is-fading {
  opacity: 0;
}

.handoff__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.06);
  transition: transform 1.1s var(--ease);
}

.handoff.is-grown .handoff__img {
  transform: scale(1);
}

.handoff__veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 18, 37, 0.55), rgba(0, 18, 37, 0.78));
  opacity: 0.35;
  transition: opacity 0.8s var(--ease);
}

.handoff.is-grown .handoff__veil {
  opacity: 1;
}

.handoff__name {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 6vw, 3.6rem);
  font-weight: 300;
  letter-spacing: 0.04em;
  color: var(--cream);
  opacity: 0;
  transition: opacity 0.5s var(--ease);
  white-space: nowrap;
}

.handoff.is-grown .handoff__name {
  opacity: 1;
  transition-delay: 0.25s;
}

@media (prefers-reduced-motion: reduce) {
  .handoff {
    transition-duration: 0.01ms;
  }
}
</style>

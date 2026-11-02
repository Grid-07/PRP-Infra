<template>
  <section class="hero" aria-label="PRP Infra Project">
    <!-- One stacked frame per project. The slides crossfade on a timer and
         drift slowly in scale, so the opening reads as a portfolio reel rather
         than a slideshow. Only the active slide is allowed to animate. -->
    <div class="hero__stage">
      <div
        v-for="(p, i) in projects"
        :key="p.slug"
        class="hero__slide"
        :class="{ 'is-active': i === active }"
      >
        <img
          :src="projectImage(p.slug, 'hero')"
          :alt="`${p.name} — ${p.location}`"
          :loading="i === 0 ? 'eager' : 'lazy'"
          :fetchpriority="i === 0 ? 'high' : 'low'"
        />
      </div>
    </div>

    <div class="hero__veil" aria-hidden="true"></div>

    <div class="hero__content shell">
      <p class="hero__eyebrow" v-reveal>
        <span class="hero__dot"></span>
        PRP Infra Project · {{ company.city }}
      </p>

      <h1 class="hero__title" v-reveal="{ delay: 90 }">
        Eight addresses.<br />
        <em>One standard.</em>
      </h1>

      <p class="hero__claim" v-reveal="{ delay: 180 }">{{ company.claim }} — from Kanke Road to Van Vrindavan.</p>

      <div class="hero__actions" v-reveal="{ delay: 260 }">
        <a href="#projects" class="btn btn--accent" @click.prevent="scrollTo('#projects')">
          <span>See the projects</span>
          <AppIcon name="arrow" :size="15" />
        </a>
        <a href="#contact" class="btn btn--ghost" @click.prevent="scrollTo('#contact')">
          <span>Talk to us</span>
        </a>
      </div>
    </div>

    <!-- The reel's caption doubles as the index: it names the project currently
         on screen and lets you jump to any of the eight. -->
    <div class="hero__reel">
      <div class="hero__reel-inner shell">
        <p class="hero__now">
          <span class="hero__now-no num">{{ String(active + 1).padStart(2, '0') }}</span>
          <span class="hero__now-name">{{ projects[active].name }}</span>
          <span class="hero__now-loc">{{ projects[active].location }}</span>
        </p>

        <div class="hero__ticks" role="tablist" aria-label="Featured projects">
          <button
            v-for="(p, i) in projects"
            :key="p.slug"
            class="hero__tick"
            :class="{ 'is-active': i === active }"
            role="tab"
            :aria-selected="i === active"
            :aria-label="p.name"
            @click="select(i)"
          >
            <span class="hero__tick-fill" :style="{ animationDuration: `${DWELL}ms` }"></span>
          </button>
        </div>
      </div>
    </div>

    <a href="#intro" class="hero__scroll" aria-label="Scroll to content" @click.prevent="scrollTo('#intro')">
      <span>Scroll</span>
      <span class="hero__scroll-line"></span>
    </a>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import AppIcon from './AppIcon.vue'
import { projectImage } from '../utils/asset'
import { company } from '../data/projects'

const props = defineProps({
  projects: { type: Array, required: true },
})

const DWELL = 5600
const active = ref(0)
let timer = null
let paused = false

const advance = () => {
  if (paused) return
  active.value = (active.value + 1) % props.projects.length
}

const restart = () => {
  window.clearInterval(timer)
  timer = window.setInterval(advance, DWELL)
}

const select = (i) => {
  active.value = i
  restart()
}

const scrollTo = (sel) => {
  const el = document.querySelector(sel)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' })
}

// Stop the reel while the tab is hidden, so it is not three projects ahead
// when the visitor comes back.
const onVisibility = () => {
  paused = document.hidden
  if (!document.hidden) restart()
}

onMounted(() => {
  restart()
  document.addEventListener('visibilitychange', onVisibility)
})

onUnmounted(() => {
  window.clearInterval(timer)
  document.removeEventListener('visibilitychange', onVisibility)
})

watch(active, () => {
  // Keeps the tick animation in step with the slide it belongs to.
})
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  isolation: isolate;
}

/* --- stage ------------------------------------------------------------- */

.hero__stage {
  position: absolute;
  inset: 0;
  z-index: -2;
}

.hero__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 1.5s var(--ease);
}

.hero__slide.is-active {
  opacity: 1;
}

.hero__slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.07);
}

.hero__slide.is-active img {
  animation: drift 7s ease-out forwards;
}

@keyframes drift {
  from {
    transform: scale(1.07);
  }
  to {
    transform: scale(1);
  }
}

.hero__veil {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(180deg, rgba(0, 18, 37, 0.82) 0%, rgba(0, 18, 37, 0.5) 38%, rgba(0, 18, 37, 0.86) 100%),
    linear-gradient(100deg, rgba(0, 18, 37, 0.72), transparent 62%);
}

/* --- content ----------------------------------------------------------- */

.hero__content {
  padding-top: calc(var(--nav-h) + 4vh);
  padding-bottom: 15vh;
}

.hero__eyebrow {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-indent: 0.3em;
  text-transform: uppercase;
  color: var(--copper-200);
}

.hero__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--copper-400);
  box-shadow: 0 0 0 4px rgba(220, 160, 120, 0.18);
}

.hero__title {
  margin-top: 1.4rem;
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 7.4vw, 6rem);
  font-weight: 300;
  line-height: 0.98;
  letter-spacing: -0.015em;
  color: var(--cream);
  text-wrap: balance;
}

.hero__title em {
  font-style: italic;
  color: var(--copper-300);
}

.hero__claim {
  margin-top: 1.5rem;
  max-width: 34ch;
  font-size: clamp(0.95rem, 1.3vw, 1.1rem);
  line-height: 1.7;
  color: var(--on-dark-soft);
}

.hero__actions {
  margin-top: 2.2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

/* --- reel -------------------------------------------------------------- */

.hero__reel {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 3.4rem;
}

.hero__reel-inner {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
}

.hero__now {
  display: flex;
  align-items: baseline;
  gap: 0.85rem;
  min-width: 0;
}

.hero__now-no {
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  color: var(--copper-400);
}

.hero__now-name {
  font-family: var(--font-display);
  font-size: clamp(1rem, 1.8vw, 1.3rem);
  color: var(--cream);
  white-space: nowrap;
}

.hero__now-loc {
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--on-dark-faint);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hero__ticks {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-shrink: 0;
}

.hero__tick {
  position: relative;
  width: 34px;
  height: 2px;
  background: rgba(242, 236, 224, 0.22);
  overflow: hidden;
  transition: width 0.4s var(--ease), background 0.4s var(--ease);
}

.hero__tick.is-active {
  width: 52px;
}

.hero__tick-fill {
  position: absolute;
  inset: 0;
  background: var(--copper-300);
  transform-origin: 0 50%;
  transform: scaleX(0);
}

.hero__tick.is-active .hero__tick-fill {
  animation-name: fill;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

@keyframes fill {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.hero__scroll {
  position: absolute;
  right: var(--gutter);
  bottom: 3.4rem;
  display: none;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.56rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--on-dark-faint);
}

.hero__scroll-line {
  width: 1px;
  height: 34px;
  background: linear-gradient(180deg, var(--copper-400), transparent);
}

@media (max-width: 900px) {
  .hero__reel-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .hero__now-loc {
    display: none;
  }

  .hero__reel {
    bottom: 2.4rem;
  }

  .hero__content {
    padding-bottom: 20vh;
  }
}

/* Once the buttons are too narrow to sit side by side, let them share the
   column instead of stacking at two different intrinsic widths. */
@media (max-width: 560px) {
  .hero__actions {
    flex-direction: column;
    align-items: stretch;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__slide.is-active img {
    animation: none;
    transform: none;
  }
}
</style>

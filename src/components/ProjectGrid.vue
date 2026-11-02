<template>
  <section id="projects" class="grid-section">
    <div class="shell">
      <header class="grid-head">
        <div>
          <span class="eyebrow" v-reveal>The portfolio</span>
          <h2 class="h2" v-reveal="{ delay: 80 }">Eight projects,<br />all in Ranchi.</h2>
        </div>
        <p class="grid-head__note lead" v-reveal="{ delay: 160 }">
          Residential, mixed-use and township schemes — each with its own address, its own plan and
          its own printed brochure. Open one to see the floor plates, the specification and what is
          within walking distance.
        </p>
      </header>

      <div class="grid">
        <!--
          Eight projects: the first and last span both columns, which leaves
          exactly six in the middle -- three clean rows of two. Without the
          closing card the eighth would sit alone beside a dead gap.
        -->
        <article
          v-for="(p, i) in projects"
          :key="p.slug"
          class="card"
          :class="{ 'card--wide': i === 0 || i === projects.length - 1 }"
          v-reveal="{ delay: (i % 2) * 70 }"
        >
          <button class="card__btn" :aria-label="`Open ${p.name}`" @click="open(p, $event)">
            <div class="card__media">
              <img
                :src="projectImage(p.slug, 'hero')"
                :alt="`${p.name} — ${p.location}`"
                loading="lazy"
              />
              <span class="card__wash"></span>
              <span class="card__no num">{{ String(i + 1).padStart(2, '0') }}</span>
            </div>

            <div class="card__body">
              <div class="card__id">
                <h3 class="card__name">{{ p.name }}</h3>
                <p class="card__meta">
                  <span>{{ p.location }}</span>
                  <span v-if="p.rera" class="card__rera">{{ p.rera }}</span>
                </p>
              </div>
              <span class="card__go" aria-hidden="true">
                <AppIcon name="arrow" :size="16" />
              </span>
            </div>
          </button>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import AppIcon from './AppIcon.vue'
import { projectImage } from '../utils/asset'
import { openHandoff } from '../utils/handoff'

const props = defineProps({
  projects: { type: Array, required: true },
})

const router = useRouter()

/**
 * The card's own image becomes the cover, grown from the card's rectangle.
 * Pushing the route only after the cover has covered the screen means the
 * visitor never sees the old page disappear.
 */
const open = (project, event) => {
  const media = event.currentTarget.querySelector('.card__media')
  const rect = media.getBoundingClientRect()

  openHandoff({
    src: projectImage(project.slug, 'hero'),
    name: project.name,
    rect: { top: rect.top, left: rect.left, right: rect.right, bottom: rect.bottom },
  })

  window.setTimeout(() => router.push(`/${project.slug}`), 620)
}
</script>

<style scoped>
.grid-section {
  padding: clamp(4.5rem, 9vw, 8rem) 0;
  background: var(--navy-950);
}

.grid-head {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: clamp(1.5rem, 5vw, 4rem);
  align-items: end;
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
}

.grid-head .h2 {
  margin-top: 0.8rem;
  color: var(--cream);
}

.grid-head__note {
  max-width: 46ch;
  justify-self: end;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1rem, 2.2vw, 1.8rem);
}

.card--wide {
  grid-column: 1 / -1;
}

.card__btn {
  display: block;
  width: 100%;
  text-align: left;
}

.card__media {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: var(--navy-800);
}

.card--wide .card__media {
  aspect-ratio: 21 / 9;
}

.card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
  transition: transform 1.1s var(--ease), filter 0.7s var(--ease);
  filter: saturate(0.94);
}

.card__btn:hover .card__media img {
  transform: scale(1.07);
  filter: saturate(1.05);
}

.card__wash {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 18, 37, 0) 40%, rgba(0, 18, 37, 0.55) 100%);
  transition: opacity 0.6s var(--ease);
}

.card__btn:hover .card__wash {
  opacity: 0.7;
}

.card__no {
  position: absolute;
  top: 0.9rem;
  left: 1rem;
  font-size: 0.6rem;
  letter-spacing: 0.22em;
  color: rgba(242, 236, 224, 0.72);
}

.card__body {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0.2rem 0;
  border-bottom: 1px solid rgba(242, 236, 224, 0.1);
  padding-bottom: 1.1rem;
  transition: border-color 0.5s var(--ease);
}

.card__btn:hover .card__body {
  border-color: var(--copper-500);
}

.card__name {
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2.2vw, 1.75rem);
  font-weight: 400;
  line-height: 1.1;
  color: var(--cream);
  transition: color 0.4s var(--ease);
}

.card__btn:hover .card__name {
  color: var(--copper-200);
}

.card__meta {
  margin-top: 0.45rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 0.9rem;
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--on-dark-faint);
}

.card__rera {
  color: var(--copper-500);
}

.card__go {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(242, 236, 224, 0.18);
  color: var(--copper-300);
  flex-shrink: 0;
  transition: background 0.4s var(--ease), transform 0.4s var(--ease), border-color 0.4s var(--ease);
}

.card__btn:hover .card__go {
  background: var(--copper-400);
  border-color: var(--copper-400);
  color: var(--navy-950);
  transform: translateX(3px);
}

@media (max-width: 860px) {
  .grid-head {
    grid-template-columns: minmax(0, 1fr);
    align-items: start;
  }

  .grid-head__note {
    justify-self: start;
  }

  .grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .card--wide .card__media {
    aspect-ratio: 4 / 3;
  }
}
</style>

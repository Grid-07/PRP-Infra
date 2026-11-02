<template>
  <div class="page" :style="themeVars">
    <Navigation :project="project" :links="links" />

    <main>
      <!-- ---------------------------------------------------------- hero -->
      <section class="phero">
        <img class="phero__img" :src="heroSrc" :alt="`${project.name} — ${project.location}`" />
        <span class="phero__veil"></span>

        <div class="phero__content shell">
          <p class="phero__crumb">
            <router-link to="/">All projects</router-link>
            <span aria-hidden="true">/</span>
            <span>{{ project.name }}</span>
          </p>

          <h1 class="phero__name">{{ project.name }}</h1>
          <p v-if="project.tagline" class="phero__tag">{{ project.tagline }}</p>

          <ul class="phero__facts">
            <li>{{ project.location }}</li>
            <li v-if="project.rera">{{ project.rera }}</li>
            <li v-if="project.year">Delivered {{ project.year }}</li>
          </ul>

          <div class="phero__actions">
            <a href="#enquire" class="btn btn--accent" @click.prevent="scrollTo('#enquire')">
              <span>Enquire about {{ project.short }}</span>
            </a>
            <a v-if="project.plans" href="#plans" class="btn btn--ghost" @click.prevent="scrollTo('#plans')">
              <span>Floor plans</span>
            </a>
          </div>
        </div>
      </section>

      <!-- ------------------------------------------------------ overview -->
      <section id="intro" class="sec sec--paper">
        <div class="shell ov">
          <div class="ov__head" v-reveal>
            <span class="eyebrow">The project</span>
            <h2 class="h2">{{ project.name }}</h2>
          </div>

          <div class="ov__body" v-reveal="{ delay: 80 }">
            <p v-for="(para, i) in project.copy" :key="i" class="ov__para" :class="{ 'ov__para--lead': i === 0 }">
              {{ para }}
            </p>

            <ul v-if="project.highlights" class="ov__chips">
              <li v-for="h in project.highlights" :key="h">{{ h }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- ----------------------------------------------------- residences -->
      <section v-if="project.residences" id="homes" class="sec sec--paper sec--tight">
        <div class="shell">
          <header class="sec-head" v-reveal>
            <span class="eyebrow">The homes</span>
            <h2 class="h2">Floor plates &amp; areas</h2>
            <p class="sec-head__note">
              Figures as printed in the {{ project.name }} brochure{{ project.areaLabels ? ` — ${Object.values(project.areaLabels).join(' / ')}` : '' }}.
            </p>
          </header>

          <div class="units" v-reveal>
            <div class="units__head" :class="{ 'units__head--two': project.areaLabels?.built }">
              <span>Type</span>
              <span>{{ project.areaLabels?.area || 'Area' }}</span>
              <span v-if="project.areaLabels?.built">{{ project.areaLabels.built }}</span>
              <span>Notes</span>
            </div>

            <div
              v-for="(u, i) in project.residences"
              :key="i"
              class="units__row"
              :class="{ 'units__row--two': project.areaLabels?.built }"
            >
              <span class="units__type">{{ u.type }}</span>
              <span class="units__area num" :data-label="project.areaLabels?.area || 'Area'">{{ u.area }}</span>
              <span v-if="project.areaLabels?.built" class="units__area num" :data-label="project.areaLabels.built">{{ u.built }}</span>
              <span class="units__note">{{ u.note }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ------------------------------------------------------ amenities -->
      <section v-if="project.amenities" class="sec sec--ink">
        <div class="shell">
          <header class="sec-head" v-reveal>
            <span class="eyebrow">In the compound</span>
            <h2 class="h2">What you get</h2>
          </header>

          <ul class="amen" v-reveal="{ delay: 80 }">
            <li v-for="a in project.amenities" :key="a">
              <AppIcon name="check" :size="13" />
              <span>{{ a }}</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- --------------------------------------------------- specification -->
      <section v-if="project.specifications" class="sec sec--paper">
        <div class="shell">
          <header class="sec-head" v-reveal>
            <span class="eyebrow">The specification</span>
            <h2 class="h2">Written down, not promised</h2>
          </header>

          <dl class="spec" v-reveal="{ delay: 80 }">
            <div v-for="s in project.specifications" :key="s.label" class="spec__item">
              <dt>{{ s.label }}</dt>
              <dd>{{ s.value }}</dd>
            </div>
          </dl>
        </div>
      </section>

      <!-- ---------------------------------------------------------- plans -->
      <section v-if="project.plans" id="plans" class="sec sec--ink">
        <div class="shell">
          <header class="sec-head" v-reveal>
            <span class="eyebrow">Drawings</span>
            <h2 class="h2">Floor plans</h2>
            <p class="sec-head__note">Tap any drawing to open it full size.</p>
          </header>

          <div
            class="plans"
            :class="{ 'plans--solo': planCount === 1 }"
            :style="{ '--plan-cols': planCols }"
          >
            <button
              v-for="(pl, i) in project.plans"
              :key="pl.src"
              class="plan"
              v-reveal="{ delay: (i % 3) * 60 }"
              @click="lightbox = pl"
            >
              <span class="plan__frame">
                <img :src="projectImage(project.slug, pl.src)" :alt="pl.caption" loading="lazy" />
              </span>
              <span class="plan__cap">{{ pl.caption }}</span>
            </button>
          </div>
        </div>
      </section>

      <!-- --------------------------------------------------------- nearby -->
      <section v-if="project.proximity" class="sec sec--paper sec--tight">
        <div class="shell">
          <header class="sec-head" v-reveal>
            <span class="eyebrow">Around it</span>
            <h2 class="h2">What is within reach</h2>
          </header>

          <div class="near" v-reveal="{ delay: 80 }">
            <div v-for="group in project.proximity" :key="group.label" class="near__group">
              <h3>{{ group.label }}</h3>
              <ul>
                <li v-for="item in group.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- -------------------------------------------------------- gallery -->
      <section v-if="project.gallery" class="sec sec--ink sec--tight">
        <div class="shell">
          <header class="sec-head" v-reveal>
            <span class="eyebrow">Inside</span>
            <h2 class="h2">Impressions</h2>
          </header>

          <div class="gal">
            <button
              v-for="(g, i) in project.gallery"
              :key="g.src"
              class="gal__item"
              v-reveal="{ delay: (i % 3) * 60 }"
              @click="lightbox = g"
            >
              <img :src="projectImage(project.slug, g.src)" :alt="g.caption" loading="lazy" />
              <span class="gal__cap">{{ g.caption }}</span>
            </button>
          </div>
        </div>
      </section>

      <!-- -------------------------------------------------------- enquire -->
      <section id="enquire" class="sec sec--ink enq">
        <div class="shell enq__inner">
          <div v-reveal>
            <span class="eyebrow">Enquire</span>
            <h2 class="h2">Ask about {{ project.short }}</h2>
            <p class="enq__note">
              Call the office and ask for {{ project.name }} — we will tell you what is
              available, what it costs, and arrange a site visit.
            </p>
          </div>

          <div class="enq__actions" v-reveal="{ delay: 80 }">
            <a :href="company.phoneHref" class="btn btn--accent">
              <AppIcon name="phone" :size="15" />
              <span>{{ company.phone }}</span>
            </a>
            <a :href="`mailto:${company.email}?subject=${encodeURIComponent('Enquiry — ' + project.name)}`" class="btn btn--ghost">
              <AppIcon name="mail" :size="15" />
              <span>Email the office</span>
            </a>
            <router-link to="/" class="enq__back">
              <span aria-hidden="true">&larr;</span> Back to all projects
            </router-link>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter />

    <!-- ------------------------------------------------------- lightbox -->
    <div v-if="lightbox" class="lb" role="dialog" aria-modal="true" :aria-label="lightbox.caption" @click.self="lightbox = null">
      <button class="lb__close" aria-label="Close" @click="lightbox = null">&times;</button>
      <figure class="lb__fig">
        <img :src="projectImage(project.slug, lightbox.src)" :alt="lightbox.caption" />
        <figcaption>{{ lightbox.caption }}</figcaption>
      </figure>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import Navigation from '../components/Navigation.vue'
import SiteFooter from '../components/SiteFooter.vue'
import AppIcon from '../components/AppIcon.vue'
import { bySlug, company } from '../data/projects'
import { projectImage } from '../utils/asset'
import { releaseHandoff } from '../utils/handoff'

const props = defineProps({
  slug: { type: String, required: true },
})

const project = computed(() => bySlug[props.slug])
const heroSrc = computed(() => projectImage(props.slug, 'hero'))
const lightbox = ref(null)

const links = computed(() => {
  const out = [{ label: 'Overview', href: '#intro' }]
  if (project.value.residences) out.push({ label: 'Homes', href: '#homes' })
  if (project.value.plans) out.push({ label: 'Plans', href: '#plans' })
  out.push({ label: 'Enquire', href: '#enquire' })
  return out
})

const themeVars = computed(() => ({
  '--ink': project.value.theme.ink,
  '--paper': project.value.theme.paper,
  '--accent': project.value.theme.accent,
  '--accent-soft': project.value.theme.accentSoft,
}))

/**
 * Plan counts run 1 to 4 across the eight brochures, and a fixed three-column
 * grid leaves a dead gap at either end: a lone plan stranded in a third of the
 * row, or a fourth plan orphaned on its own line. Follow the count instead --
 * four become a 2x2 block, one sits centred on its own.
 */
const planCount = computed(() => project.value.plans?.length || 0)
const planCols = computed(() => {
  if (planCount.value <= 1) return 1
  if (planCount.value === 4) return 2
  return planCount.value
})

const scrollTo = (sel) => {
  const el = document.querySelector(sel)
  if (!el) return
  const offset = document.querySelector('.nav')?.getBoundingClientRect().height ?? 78
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset - 8, behavior: 'smooth' })
}

const onKey = (e) => {
  if (e.key === 'Escape') lightbox.value = null
}

// The dialog is declared aria-modal, so the page behind it must not scroll
// while it is open -- otherwise a wheel gesture slides the backdrop away from
// the drawing you are trying to read.
watch(lightbox, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
onUnmounted(() => {
  document.body.style.overflow = ''
})

/**
 * The cover only lifts once this page's own hero has decoded. Without that the
 * hand-off lands on a half-painted page and the transition reads as a glitch.
 */
onMounted(() => {
  window.addEventListener('keydown', onKey)

  const img = new Image()
  let released = false
  const release = () => {
    if (released) return
    released = true
    releaseHandoff()
  }
  img.onload = release
  img.onerror = release
  img.src = heroSrc.value
  if (img.complete) window.setTimeout(release, 80)
  // Never hold the screen hostage to a slow image.
  window.setTimeout(release, 2600)
})

onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.page {
  background: var(--ink);
  color: var(--paper);
  min-height: 100vh;
}

/* --------------------------------------------------------------- hero */

.phero {
  position: relative;
  min-height: 92svh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  isolation: isolate;
}

.phero__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
  animation: heroIn 1.6s var(--ease) both;
}

@keyframes heroIn {
  from {
    transform: scale(1.06);
    opacity: 0.6;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.phero__veil {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.42) 0%, transparent 32%, rgba(0, 0, 0, 0.2) 62%, var(--ink) 100%),
    linear-gradient(95deg, rgba(0, 0, 0, 0.55), transparent 68%);
}

.phero__content {
  padding-bottom: clamp(3rem, 7vw, 5.5rem);
  padding-top: calc(var(--nav-h) + 3rem);
}

.phero__crumb {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.62);
}

.phero__crumb a:hover {
  color: var(--accent-soft);
}

.phero__name {
  margin-top: 1rem;
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 8vw, 6.2rem);
  font-weight: 300;
  line-height: 0.98;
  letter-spacing: -0.02em;
  color: #fff;
  text-wrap: balance;
}

.phero__tag {
  margin-top: 0.7rem;
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(1.05rem, 2.2vw, 1.6rem);
  color: var(--accent-soft);
}

.phero__facts {
  margin-top: 1.4rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.4rem;
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.78);
}

.phero__facts li {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.phero__facts li + li::before {
  content: '';
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent);
  margin-right: 0.7rem;
}

.phero__actions {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}

/* ----------------------------------------------------------- sections */

.sec {
  padding: clamp(3.5rem, 7vw, 6.5rem) 0;
}

.sec--tight {
  padding-top: clamp(2rem, 4vw, 3rem);
}

.sec--paper {
  background: var(--paper);
  color: var(--ink);
}

.sec--ink {
  background: var(--ink);
  color: var(--paper);
}

.sec-head {
  margin-bottom: clamp(1.8rem, 3.5vw, 3rem);
  max-width: 62ch;
}

.sec-head .h2 {
  margin-top: 0.7rem;
}

.sec-head__note {
  margin-top: 0.8rem;
  font-size: 0.9rem;
  line-height: 1.7;
  color: color-mix(in srgb, currentColor 62%, transparent);
}

/* On the paper sections the eyebrow and rules need the darker accent. */
.sec--paper .eyebrow {
  color: var(--accent);
}

.sec--ink .eyebrow {
  color: var(--accent-soft);
}

/* ---------------------------------------------------------- overview */

.ov {
  display: grid;
  grid-template-columns: minmax(0, 0.42fr) minmax(0, 1fr);
  gap: clamp(1.5rem, 5vw, 4rem);
  align-items: start;
}

.ov__head .h2 {
  margin-top: 0.7rem;
}

.ov__para {
  font-size: 0.98rem;
  line-height: 1.85;
  color: color-mix(in srgb, var(--ink) 78%, transparent);
  max-width: 64ch;
}

.ov__para + .ov__para {
  margin-top: 1.1rem;
}

.ov__para--lead {
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 2vw, 1.45rem);
  line-height: 1.5;
  color: var(--ink);
}

.ov__chips {
  margin-top: 1.8rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.ov__chips li {
  padding: 0.42rem 0.85rem;
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border: 1px solid color-mix(in srgb, var(--ink) 18%, transparent);
  color: color-mix(in srgb, var(--ink) 72%, transparent);
}

/* --------------------------------------------------------- residences */

.units {
  border-top: 1px solid color-mix(in srgb, var(--ink) 16%, transparent);
}

.units__head,
.units__row {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) 120px minmax(0, 1.6fr);
  gap: 1rem;
  align-items: baseline;
  padding: 0.95rem 0.2rem;
  border-bottom: 1px solid color-mix(in srgb, var(--ink) 10%, transparent);
}

.units__head--two,
.units__row--two {
  grid-template-columns: minmax(0, 1.1fr) 110px 110px minmax(0, 1.4fr);
}

.units__head {
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--ink) 52%, transparent);
  border-bottom-color: color-mix(in srgb, var(--ink) 20%, transparent);
}

.units__row {
  transition: background 0.3s var(--ease);
}

.units__row:hover {
  background: color-mix(in srgb, var(--ink) 4%, transparent);
}

.units__type {
  font-family: var(--font-display);
  font-size: 1.05rem;
  color: var(--ink);
}

.units__area {
  font-size: 0.95rem;
  color: var(--accent);
  letter-spacing: 0.02em;
}

.units__note {
  font-size: 0.8rem;
  line-height: 1.6;
  color: color-mix(in srgb, var(--ink) 58%, transparent);
}

/* ---------------------------------------------------------- amenities */

.amen {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem 2rem;
}

.amen li {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  font-size: 0.92rem;
  line-height: 1.6;
  color: color-mix(in srgb, var(--paper) 78%, transparent);
  padding-bottom: 0.9rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.amen li svg {
  margin-top: 0.28rem;
  color: var(--accent-soft);
}

/* ------------------------------------------------------ specification */

.spec {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 3rem;
}

.spec__item {
  padding: 1.1rem 0;
  border-bottom: 1px solid color-mix(in srgb, var(--ink) 12%, transparent);
}

.spec__item dt {
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
}

.spec__item dd {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.7;
  color: color-mix(in srgb, var(--ink) 76%, transparent);
}

/* -------------------------------------------------------------- plans */

.plans {
  display: grid;
  grid-template-columns: repeat(var(--plan-cols, 3), minmax(0, 1fr));
  gap: clamp(0.9rem, 2vw, 1.6rem);
}

/* A single drawing at full row width would be a wide white band with a small
   plan floating in it; hold it to a plate-sized column instead. */
.plans--solo .plan {
  max-width: 520px;
  margin-inline: auto;
}

.plan {
  text-align: left;
  display: block;
}

/* The brochures draw their plans at wildly different proportions -- 0.40 to
   2.02 across the eight projects -- so the images cannot size themselves: the
   row would come out ragged with three captions at three heights. Give every
   frame the same height and contain the drawing inside it. The plates are
   white-backed drawings on a white frame, so the slack is invisible. */
.plan__frame {
  display: flex;
  align-items: center;
  justify-content: center;
  height: clamp(190px, 25vw, 320px);
  background: rgba(255, 255, 255, 0.94);
  padding: 0.6rem;
  overflow: hidden;
}

.plan__frame img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  transition: transform 0.9s var(--ease);
}

.plan:hover .plan__frame img {
  transform: scale(1.03);
}

.plan__cap {
  display: block;
  margin-top: 0.7rem;
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--paper) 62%, transparent);
}

/* ------------------------------------------------------------- nearby */

.near {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.6rem 2.5rem;
}

.near__group h3 {
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.6rem;
}

.near__group li {
  font-size: 0.86rem;
  line-height: 1.9;
  color: color-mix(in srgb, var(--ink) 72%, transparent);
}

/* ------------------------------------------------------------ gallery */

.gal {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(0.7rem, 1.6vw, 1.2rem);
}

.gal__item {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: rgba(255, 255, 255, 0.05);
}

.gal__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1s var(--ease);
}

.gal__item:hover img {
  transform: scale(1.05);
}

.gal__cap {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.6rem 0.9rem 0.8rem;
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.7));
  text-align: left;
}

/* ------------------------------------------------------------ enquire */

.enq__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: center;
}

.enq .h2 {
  margin-top: 0.7rem;
}

.enq__note {
  margin-top: 1rem;
  max-width: 46ch;
  font-size: 0.94rem;
  line-height: 1.75;
  color: color-mix(in srgb, var(--paper) 68%, transparent);
}

.enq__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.7rem;
}

.enq__back {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-left: 0.4rem;
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--paper) 55%, transparent);
  transition: color 0.3s var(--ease);
}

.enq__back:hover {
  color: var(--accent-soft);
}

/* ----------------------------------------------------------- lightbox */

.lb {
  position: fixed;
  inset: 0;
  z-index: 9500;
  background: rgba(0, 0, 0, 0.9);
  display: grid;
  place-items: center;
  padding: clamp(1rem, 4vw, 3rem);
  overflow: auto;
}

.lb__fig {
  max-width: min(1400px, 100%);
  text-align: center;
}

.lb__fig img {
  max-width: 100%;
  max-height: 82vh;
  width: auto;
  margin-inline: auto;
  background: #fff;
}

.lb__fig figcaption {
  margin-top: 0.9rem;
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.lb__close {
  position: fixed;
  top: 1rem;
  right: 1.2rem;
  width: 46px;
  height: 46px;
  font-size: 1.9rem;
  line-height: 1;
  color: #fff;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.lb__close:hover {
  background: rgba(255, 255, 255, 0.12);
}

/* --------------------------------------------------------- responsive */

@media (max-width: 1000px) {
  .ov,
  .enq__inner {
    grid-template-columns: minmax(0, 1fr);
  }

  .amen,
  .plans,
  .near,
  .gal {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .spec {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 640px) {
  .amen,
  .plans,
  .near,
  .gal {
    grid-template-columns: minmax(0, 1fr);
  }

  /* A four-column table has nowhere to go on a phone. Drop the header row and
     let each home become a stacked block: type, then the areas side by side,
     then the note. Dropping the header would leave two bare numbers, so each
     area carries its column label inline instead. */
  .units__head {
    display: none;
  }

  .units__area::before {
    content: attr(data-label);
    display: block;
    margin-bottom: 0.2rem;
    font-family: var(--font-body);
    font-size: 0.55rem;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: color-mix(in srgb, var(--ink) 45%, transparent);
  }

  .units__row,
  .units__row--two {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.25rem 1rem;
    padding: 0.95rem 0;
  }

  .units__type,
  .units__note {
    grid-column: 1 / -1;
  }

  .units__note {
    margin-top: 0.15rem;
  }
}
</style>

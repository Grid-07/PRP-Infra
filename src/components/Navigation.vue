<template>
  <header class="nav" :class="{ 'nav--solid': solid || !isHome, 'nav--open': open }">
    <div class="nav__progress" :style="{ transform: `scaleX(${progress})` }"></div>

    <div class="nav__inner shell">
      <!-- The medallion is the group mark: on a project page it leaves the
           project and lands back on the PRP page, which is the only way the
           eight projects read as one portfolio. -->
      <div class="brand">
        <router-link to="/" class="brand__mark" aria-label="PRP Infra Project — all projects" @click="close">
          <img :src="asset('images/brand/mark-512.png')" alt="" width="512" height="512" />
        </router-link>
        <router-link to="/" class="brand__text" @click="close">
          <span class="brand__name">PRP</span>
          <span class="brand__sub">{{ lockupSub }}</span>
        </router-link>
      </div>

      <nav class="nav__links" aria-label="Primary">
        <a v-for="l in links" :key="l.href" :href="l.href" class="nav__link" @click="go(l.href)">
          {{ l.label }}
        </a>
      </nav>

      <div class="nav__actions">
        <router-link v-if="project" to="/" class="nav__back" @click="close">
          <span aria-hidden="true">&larr;</span> All projects
        </router-link>
        <a :href="company.phoneHref" class="nav__phone">
          <AppIcon name="phone" :size="14" />
          <span>{{ company.phone }}</span>
        </a>
        <a :href="project ? '#enquire' : '#contact'" class="btn btn--accent btn--sm" @click="go(project ? '#enquire' : '#contact')">
          <span>Enquire</span>
        </a>
      </div>

      <button class="burger" :aria-expanded="open" aria-controls="menu" aria-label="Menu" @click="toggle">
        <span></span><span></span>
      </button>
    </div>
  </header>

  <div id="menu" class="drawer" :class="{ 'is-open': open }" :inert="!open">
    <div class="drawer__inner">
      <a v-for="(l, i) in links" :key="l.href" :href="l.href" class="drawer__link" :style="{ '--i': i }" @click="go(l.href)">
        <span class="drawer__no">0{{ i + 1 }}</span>
        {{ l.label }}
      </a>

      <div class="drawer__foot">
        <router-link v-if="project" to="/" class="drawer__back" @click="close">
          <span aria-hidden="true">&larr;</span> All PRP projects
        </router-link>
        <a :href="company.phoneHref" class="drawer__phone">{{ company.phone }}</a>
        <a :href="`mailto:${company.email}`" class="drawer__mail">{{ company.email }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppIcon from './AppIcon.vue'
import { asset } from '../utils/asset'
import { company } from '../data/projects'

const props = defineProps({
  project: { type: Object, default: null },
  links: { type: Array, required: true },
})

const route = useRoute()
const solid = ref(false)
const open = ref(false)
const progress = ref(0)

const isHome = computed(() => route.path === '/')

// "PRP / PRP Godavari" repeats the wordmark twice. Drop the leading PRP so the
// lockup reads "PRP / Godavari"; project names that do not start with it keep
// their full name.
const lockupSub = computed(() => {
  if (!props.project) return 'Infra Project'
  return props.project.name.replace(/^PRP\s+/i, '')
})

const onScroll = () => {
  const y = window.scrollY
  solid.value = y > 40
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(1, y / max) : 0
}

const toggle = () => (open.value = !open.value)
const close = () => (open.value = false)

const go = (href) => {
  close()
  if (!href.startsWith('#')) return
  // Let the drawer start closing before the scroll begins.
  requestAnimationFrame(() => {
    const el = document.querySelector(href)
    if (!el) return
    const offset = document.querySelector('.nav')?.getBoundingClientRect().height ?? 78
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset - 8, behavior: 'smooth' })
  })
}

watch(open, (v) => document.body.classList.toggle('no-scroll', v))

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.body.classList.remove('no-scroll')
})
</script>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 900;
  color: var(--on-dark);
  transition: background 0.5s var(--ease), box-shadow 0.5s var(--ease);
}

.nav--solid {
  background: rgba(0, 18, 37, 0.88);
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  box-shadow: 0 1px 0 var(--line-dark), 0 18px 40px -30px #000;
}

.nav--open {
  background: var(--navy-950);
}

.nav__progress {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 100%;
  transform-origin: 0 50%;
  background: linear-gradient(90deg, var(--copper-600), var(--copper-300));
  transform: scaleX(0);
  transition: transform 0.12s linear;
}

.nav__inner {
  height: var(--nav-h);
  display: flex;
  align-items: center;
  gap: clamp(0.8rem, 2.4vw, 2rem);
}

/* --- brand ------------------------------------------------------------- */

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  flex-shrink: 0;
}

.brand__mark {
  display: inline-flex;
  padding: 4px;
  margin: -4px;
  border-radius: 50%;
  transition: transform 0.4s var(--ease), box-shadow 0.4s var(--ease);
}

.brand__mark img {
  width: 38px;
  height: 38px;
}

.brand__mark:hover {
  transform: scale(1.05);
  box-shadow: 0 0 0 1px var(--line-dark);
}

.brand__text {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  line-height: 1;
}

.brand__name {
  font-family: var(--font-display);
  font-size: 1.32rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-indent: 0.22em;
  color: var(--copper-200);
}

.brand__sub {
  font-size: 0.44rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-indent: 0.2em;
  text-transform: uppercase;
  color: var(--on-dark-faint);
  white-space: nowrap;
}

/* --- links ------------------------------------------------------------- */

.nav__links {
  display: flex;
  align-items: center;
  gap: clamp(0.85rem, 1.8vw, 1.7rem);
  margin-left: auto;
}

.nav__link {
  position: relative;
  font-size: 0.68rem;
  letter-spacing: 0.17em;
  text-transform: uppercase;
  color: var(--on-dark-soft);
  padding: 0.4rem 0;
  transition: color 0.3s var(--ease);
}

.nav__link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: var(--copper-400);
  transform: scaleX(0);
  transform-origin: 0 50%;
  transition: transform 0.45s var(--ease);
}

.nav__link:hover {
  color: var(--copper-200);
}

.nav__link:hover::after {
  transform: scaleX(1);
}

.nav__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav__back {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--on-dark-faint);
  transition: color 0.3s var(--ease);
}

.nav__back:hover {
  color: var(--copper-200);
}

.nav__phone {
  display: inline-flex;
  align-items: center;
  gap: 0.42rem;
  font-size: 0.74rem;
  color: var(--on-dark-soft);
  transition: color 0.3s var(--ease);
}

.nav__phone svg {
  color: var(--copper-400);
}

.nav__phone:hover {
  color: var(--copper-200);
}

.btn--sm {
  min-height: 42px;
  padding: 0.6rem 1.25rem;
  font-size: 0.62rem;
}

/* --- burger + drawer --------------------------------------------------- */

.burger {
  display: none;
  width: 44px;
  height: 44px;
  margin-left: auto;
  margin-right: -8px;
  position: relative;
  align-items: center;
  justify-content: center;
}

.burger span {
  position: absolute;
  left: 11px;
  width: 22px;
  height: 1px;
  background: var(--copper-200);
  transition: transform 0.45s var(--ease), opacity 0.3s var(--ease);
}

.burger span:nth-child(1) {
  transform: translateY(-6px);
}

.burger span:nth-child(2) {
  transform: translateY(6px);
}

.nav--open .burger span:nth-child(1) {
  transform: rotate(45deg);
}

.nav--open .burger span:nth-child(2) {
  transform: rotate(-45deg);
}

.drawer {
  position: fixed;
  inset: var(--nav-h) 0 0 0;
  z-index: 890;
  background: var(--navy-950);
  overflow-y: auto;
  overscroll-behavior: contain;
  clip-path: inset(0 0 100% 0);
  transition: clip-path 0.6s var(--ease);
  pointer-events: none;
}

.drawer.is-open {
  clip-path: inset(0 0 0 0);
  pointer-events: auto;
}

.drawer__inner {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 1.6rem var(--gutter) 2.4rem;
}

.drawer__link {
  display: flex;
  align-items: baseline;
  gap: 0.9rem;
  padding-block: 0.95rem;
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 7vw, 2.1rem);
  color: var(--on-dark);
  border-bottom: 1px solid rgba(242, 236, 224, 0.1);
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.5s var(--ease), transform 0.5s var(--ease);
}

.drawer.is-open .drawer__link {
  opacity: 1;
  transform: none;
  transition-delay: calc(90ms + var(--i) * 45ms);
}

.drawer__no {
  font-family: var(--font-sans);
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  color: var(--copper-600);
}

.drawer__foot {
  margin-top: auto;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.drawer__back {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 0.7rem;
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--on-dark-faint);
}

.drawer__phone {
  font-family: var(--font-display);
  font-size: 1.3rem;
  color: var(--copper-200);
}

.drawer__mail {
  font-size: 0.8rem;
  color: var(--on-dark-soft);
  word-break: break-word;
}

@media (max-width: 1080px) {
  .nav__links,
  .nav__back {
    display: none;
  }

  .nav__phone span {
    display: none;
  }

  .nav__phone {
    width: 40px;
    height: 40px;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid rgba(242, 236, 224, 0.2);
  }
}

@media (max-width: 860px) {
  .nav__actions {
    display: none;
  }

  .burger {
    display: flex;
  }

  .brand__mark img {
    width: 32px;
    height: 32px;
  }
}
</style>

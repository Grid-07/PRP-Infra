import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ProjectPage from '../pages/ProjectPage.vue'
import { projects } from '../data/projects'
import { hasPending } from '../utils/handoff'

/**
 * One page for the group, one page per project.
 *
 * The project page is a single component driven by the data model rather than
 * eight near-identical files -- the brochures share a structure, and a shared
 * component means a fix to the layout lands everywhere at once.
 */
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { title: 'PRP Infra Project — Homes across Ranchi' },
  },
  ...projects.map((p) => ({
    path: `/${p.slug}`,
    name: p.slug,
    component: ProjectPage,
    props: { slug: p.slug },
    meta: { title: `${p.name} — PRP Infra Project`, project: p.slug },
  })),
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, saved) {
    // Coming back out of a project: ProjectGrid replays the reverse hand-off
    // and puts the page back where the visitor left it, so the router must keep
    // its hands off — a jump to the top here would shrink the cover onto a card
    // that is no longer where it was.
    if (to.name === 'home' && from.meta.project) {
      // Unless there is nothing to replay — a deep link straight into a project
      // leaves no record, and the group page would otherwise open at whatever
      // offset the project page happened to be at.
      return hasPending() ? false : { top: 0, behavior: 'instant' }
    }

    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    if (saved) return saved

    // `instant`, not the default. The group page is twice the height of a
    // project page, so arriving from a card near the bottom leaves the new page
    // clamped somewhere past its own hero; with `html { scroll-behavior: smooth }`
    // the browser then animates the correction, and the cover lifts onto a page
    // that is visibly scrolling itself up. The hero has to already be there when
    // the cover goes, so the jump is instant and happens while still hidden.
    return { top: 0, behavior: 'instant' }
  },
})

router.afterEach((to) => {
  if (to.meta?.title) document.title = to.meta.title
})

export default router

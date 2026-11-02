import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ProjectPage from '../pages/ProjectPage.vue'
import { projects } from '../data/projects'

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
    if (saved) return saved
    // A project opens on its hero, not on the previous scroll position.
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.meta?.title) document.title = to.meta.title
})

export default router

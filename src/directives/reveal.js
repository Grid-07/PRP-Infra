/**
 * Fade a block in when it first scrolls into view.
 *
 * One shared IntersectionObserver rather than one per element: the project
 * pages have dozens of reveal targets, and a page full of observers is a page
 * that janks while scrolling.
 */
const seen = new WeakSet()
let observer = null

function ensure() {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        e.target.classList.add('is-in')
        observer.unobserve(e.target)
      })
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
  )
  return observer
}

export default {
  mounted(el, binding) {
    if (seen.has(el)) return
    seen.add(el)
    el.classList.add('reveal')
    if (binding.value?.delay) {
      el.style.transitionDelay = `${binding.value.delay}ms`
    }
    // The hidden state lives in CSS, so a browser without IntersectionObserver
    // would keep the whole page at opacity 0 forever. Show it outright instead.
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-in')
      return
    }
    ensure().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}

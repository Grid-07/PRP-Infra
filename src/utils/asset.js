const BASE = import.meta.env.BASE_URL || '/'

/**
 * Resolve a path inside `public/` against the deployed base, so the same string
 * works at `/` in dev and under a sub-path later. Every asset path in the app
 * goes through here.
 */
export function asset(path) {
  return BASE + String(path).replace(/^\/+/, '')
}

/** A project's image, under public/projects/<slug>/images/. */
export function projectImage(slug, file) {
  return asset(`projects/${slug}/images/${file}.jpg`)
}

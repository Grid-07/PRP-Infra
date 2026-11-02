import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { projects } from '../src/data/projects.js'

/**
 * GitHub Pages has no server, so it answers an unknown path with 404.html.
 * Copying the built shell there keeps deep links alive -- but it answers them
 * with an HTTP 404, which is what a crawler records and what a chat client
 * reads before it builds a link preview. The page renders; the status says it
 * does not exist.
 *
 * So every project route also gets a real file: docs/<slug>/index.html, a copy
 * of the shell. Pages then serves 200 and the router takes over on load.
 *
 * The list is read from the data model rather than typed out here, so adding a
 * brochure cannot leave a route without an entry.
 */
const ROUTES = projects.map((p) => p.slug)

const root = process.cwd()
const docs = join(root, 'docs')
const index = join(docs, 'index.html')

mkdirSync(docs, { recursive: true })

if (!existsSync(index)) {
  console.warn('postbuild: docs/index.html missing — did the build run?')
  process.exit(0)
}

copyFileSync(index, join(docs, '404.html'))
console.log('postbuild: wrote docs/404.html')

let written = 0
for (const route of ROUTES) {
  const dir = join(docs, route)
  mkdirSync(dir, { recursive: true })
  copyFileSync(index, join(dir, 'index.html'))
  written += 1
}
console.log(`postbuild: wrote ${written} route entries`)

// A .nojekyll file stops GitHub Pages from running Jekyll over the output,
// which would otherwise drop files whose names begin with an underscore.
const nojekyll = join(docs, '.nojekyll')
if (!existsSync(nojekyll)) {
  writeFileSync(nojekyll, '')
  console.log('postbuild: wrote docs/.nojekyll')
}

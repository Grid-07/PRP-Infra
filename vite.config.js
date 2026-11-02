import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages serves a project repo from /<repo>/, not from the domain root,
// so every emitted asset URL has to carry that prefix. With `base: '/'` the
// shell asked for /assets/index-*.js, which 404s at the domain root and leaves
// the deployed site blank. Every path in the app goes through src/utils/asset.js,
// so this one value is the only place the prefix appears.
export default defineConfig({
  base: '/PRP-Infra/',
  plugins: [vue()],
  build: {
    outDir: 'docs',
    assetsInlineLimit: 0,
  },
})

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Served from the domain root for now. `base` is left configurable so the same
// build works from a sub-path later without touching a single asset path --
// every path in the app goes through src/utils/asset.js.
export default defineConfig({
  base: '/',
  plugins: [vue()],
  build: {
    outDir: 'docs',
    assetsInlineLimit: 0,
  },
})

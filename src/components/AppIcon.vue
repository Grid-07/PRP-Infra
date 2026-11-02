<template>
  <svg
    class="icon"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path v-for="(d, i) in paths" :key="i" :d="d" fill="currentColor" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 16 },
})

const ICONS = {
  phone:
    'M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z',
  mail:
    'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4.2 6.9v.3L12 13l7.8-5.8v-.3z',
  pin:
    'M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z',
  globe:
    'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-2.6a15.6 15.6 0 0 0-1.3-3.4A8 8 0 0 1 18.9 8zM12 4.2c.6.9 1.2 2.2 1.6 3.8h-3.2c.4-1.6 1-2.9 1.6-3.8zM4.3 14a8 8 0 0 1 0-4h3a19 19 0 0 0 0 4zm.8 2h2.6c.3 1.2.8 2.4 1.3 3.4A8 8 0 0 1 5.1 16zm2.6-8H5.1a8 8 0 0 1 3.9-3.4A15.6 15.6 0 0 0 7.7 8zM12 19.8c-.6-.9-1.2-2.2-1.6-3.8h3.2c-.4 1.6-1 2.9-1.6 3.8zM14 14h-4a17 17 0 0 1 0-4h4a17 17 0 0 1 0 4zm.9 5.4c.5-1 1-2.2 1.3-3.4h2.6a8 8 0 0 1-3.9 3.4zm2-5.4a19 19 0 0 0 0-4h3a8 8 0 0 1 0 4z',
  arrow:
    'M13.2 5.3 11.8 6.7l4.3 4.3H4v2h12.1l-4.3 4.3 1.4 1.4L20 12z',
  check: 'M9.6 16.2 5.4 12l-1.4 1.4 5.6 5.6L20.4 7.8 19 6.4z',
  lift:
    'M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm1.2 6.2L10.4 6 12.6 9.2zM13.4 15l-2.2 3.2L9 15z',
}

const paths = computed(() => {
  const d = ICONS[props.name]
  if (!d) return []
  // A single path per icon; the array shape keeps the template honest if a
  // multi-part glyph is added later.
  return [d]
})
</script>

<style scoped>
.icon {
  display: block;
  flex-shrink: 0;
}
</style>

<template>
  <footer class="foot">
    <div class="shell">
      <div class="foot__top">
        <div class="foot__brand">
          <img :src="asset('images/brand/mark-512.png')" alt="PRP Infra Project" width="512" height="512" loading="lazy" />
          <p class="foot__claim">{{ company.claim }}</p>
        </div>

        <nav class="foot__dir" aria-label="All projects">
          <p class="foot__dir-label">The projects</p>
          <ul>
            <li v-for="p in projects" :key="p.slug">
              <router-link :to="`/${p.slug}`">{{ p.name }}</router-link>
            </li>
          </ul>
        </nav>

        <div class="foot__reach">
          <p class="foot__dir-label">Reach us</p>
          <a :href="company.phoneHref">{{ company.phone }}</a>
          <a :href="`mailto:${company.email}`">{{ company.email }}</a>
          <p v-for="(line, i) in company.office" :key="i" class="foot__addr">{{ line }}</p>
        </div>
      </div>

      <div class="foot__bottom">
        <p>&copy; {{ year }} {{ company.name }}. All rights reserved.</p>
        <p class="foot__disc">
          All details on this site are for information and concept purposes only and do not form
          part of any agreement. Images are artistic impressions. Areas are as per the respective
          RERA registration.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { asset } from '../utils/asset'
import { company, projects } from '../data/projects'

const year = new Date().getFullYear()
</script>

<style scoped>
.foot {
  background: var(--navy-950);
  border-top: 1px solid rgba(242, 236, 224, 0.08);
  padding: clamp(3rem, 6vw, 4.5rem) 0 calc(1.5rem + env(safe-area-inset-bottom));
}

.foot__top {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: clamp(1.8rem, 4vw, 3.5rem);
  padding-bottom: clamp(2rem, 4vw, 3rem);
  border-bottom: 1px solid rgba(242, 236, 224, 0.1);
}

.foot__brand img {
  width: 92px;
  height: 92px;
}

.foot__claim {
  margin-top: 1rem;
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-style: italic;
  color: var(--copper-300);
}

.foot__dir-label {
  font-size: 0.56rem;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--copper-500);
  margin-bottom: 0.9rem;
}

.foot__dir ul {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.35rem 1.2rem;
}

.foot__dir a {
  font-size: 0.8rem;
  color: var(--on-dark-soft);
  transition: color 0.3s var(--ease);
}

.foot__dir a:hover {
  color: var(--copper-200);
}

.foot__reach a,
.foot__addr {
  display: block;
  font-size: 0.82rem;
  line-height: 1.7;
  color: var(--on-dark-soft);
  transition: color 0.3s var(--ease);
}

.foot__reach a:hover {
  color: var(--copper-200);
}

.foot__addr {
  color: var(--on-dark-faint);
}

.foot__reach a + a {
  margin-top: 0.2rem;
}

.foot__addr:first-of-type {
  margin-top: 0.8rem;
}

.foot__bottom {
  padding-top: 1.6rem;
  display: flex;
  justify-content: space-between;
  gap: 1.5rem 3rem;
  flex-wrap: wrap;
  font-size: 0.7rem;
  color: var(--on-dark-faint);
}

.foot__disc {
  max-width: 62ch;
  line-height: 1.7;
}

@media (max-width: 900px) {
  .foot__top {
    grid-template-columns: minmax(0, 1fr);
  }

  .foot__dir ul {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>

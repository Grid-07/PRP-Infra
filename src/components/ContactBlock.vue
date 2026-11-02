<template>
  <section id="contact" class="contact">
    <div class="shell">
      <div class="contact__inner">
        <div class="contact__lede" v-reveal>
          <span class="eyebrow">Visit</span>
          <h2 class="h2">Come and see<br />a floor plate.</h2>
          <p class="lead">
            Plans on a screen are one thing. The office is on Maikey Road, Upper
            Bazaar — call ahead and we will walk you through whichever project
            you are considering.
          </p>

          <div class="contact__cta">
            <a :href="company.phoneHref" class="btn btn--accent">
              <AppIcon name="phone" :size="15" />
              <span>{{ company.phone }}</span>
            </a>
            <a :href="`mailto:${company.email}`" class="btn btn--ghost">
              <AppIcon name="mail" :size="15" />
              <span>Email us</span>
            </a>
          </div>
        </div>

        <div class="contact__cards">
          <div class="contact__card" v-reveal="{ delay: 80 }">
            <AppIcon name="pin" :size="18" />
            <h3>Office</h3>
            <p v-for="(line, i) in company.office" :key="i">{{ line }}</p>
          </div>

          <div class="contact__card" v-reveal="{ delay: 140 }">
            <AppIcon name="phone" :size="18" />
            <h3>Phone</h3>
            <a :href="company.phoneHref">{{ company.phone }}</a>
          </div>

          <div class="contact__card" v-reveal="{ delay: 200 }">
            <AppIcon name="mail" :size="18" />
            <h3>Email</h3>
            <a :href="`mailto:${company.email}`">{{ company.email }}</a>
          </div>

          <div class="contact__card" v-reveal="{ delay: 260 }">
            <AppIcon name="globe" :size="18" />
            <h3>Web</h3>
            <p>{{ company.website }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import AppIcon from './AppIcon.vue'
import { company } from '../data/projects'
</script>

<style scoped>
.contact {
  padding: clamp(4rem, 8vw, 7rem) 0;
  background: var(--navy-950);
  border-top: 1px solid rgba(242, 236, 224, 0.08);
}

.contact__inner {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: start;
}

.contact .h2 {
  margin-top: 0.8rem;
  color: var(--cream);
}

.contact .lead {
  margin-top: 1.2rem;
  max-width: 40ch;
}

.contact__cta {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}

.contact__cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  background: rgba(242, 236, 224, 0.1);
  border: 1px solid rgba(242, 236, 224, 0.1);
}

.contact__card {
  background: var(--navy-950);
  padding: clamp(1.2rem, 2.4vw, 1.8rem);
  color: var(--copper-400);
}

.contact__card h3 {
  margin-top: 0.8rem;
  font-family: var(--font-sans);
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--on-dark-faint);
}

.contact__card p,
.contact__card a {
  margin-top: 0.5rem;
  font-size: 0.86rem;
  line-height: 1.65;
  color: var(--on-dark-soft);
  transition: color 0.3s var(--ease);
  word-break: break-word;
}

.contact__card a:hover {
  color: var(--copper-200);
}

@media (max-width: 900px) {
  .contact__inner {
    grid-template-columns: minmax(0, 1fr);
  }

  .contact__cards {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>

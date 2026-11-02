<template>
  <section id="intro" class="about">
    <div class="shell">
      <div class="about__top">
        <div class="about__mark" v-reveal>
          <img :src="asset('images/brand/mark-512.png')" alt="" width="512" height="512" />
        </div>

        <div class="about__lede" v-reveal="{ delay: 90 }">
          <span class="eyebrow">The company</span>
          <p class="about__statement">
            We build in Ranchi, for Ranchi — and we have been doing it long enough that
            the first blocks are now lived in, worn in, and still standing to the
            specification they were sold on.
          </p>
          <p class="about__para" v-for="(p, i) in company.about" :key="i">{{ p }}</p>
        </div>
      </div>

      <dl class="about__facts" v-reveal="{ delay: 140 }">
        <div>
          <dt class="num">08</dt>
          <dd>Live projects</dd>
        </div>
        <div>
          <dt class="num">15</dt>
          <dd>Years building</dd>
        </div>
        <div>
          <dt class="num">02</dt>
          <dd>Cities — Ranchi &amp; Biharsharif</dd>
        </div>
        <div>
          <dt>RERA</dt>
          <dd>Registered projects</dd>
        </div>
      </dl>

      <div class="about__prev" v-reveal>
        <div class="about__prev-head">
          <span class="eyebrow">Delivered</span>
          <p class="about__prev-note">
            Schemes that came before this portfolio — several of them now the
            reference addresses in their neighbourhoods.
          </p>
        </div>
        <ul class="about__prev-list">
          <li v-for="name in previousProjects" :key="name">{{ name }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { asset } from '../utils/asset'
import { company, previousProjects } from '../data/projects'
</script>

<style scoped>
.about {
  padding: clamp(4rem, 8vw, 7.5rem) 0;
  background: linear-gradient(180deg, var(--navy-950), var(--navy-900) 55%, var(--navy-950));
}

.about__top {
  display: grid;
  grid-template-columns: minmax(0, 0.42fr) minmax(0, 1fr);
  gap: clamp(1.8rem, 5vw, 4.5rem);
  align-items: start;
}

.about__mark img {
  width: clamp(120px, 15vw, 190px);
  height: auto;
  filter: drop-shadow(0 24px 40px rgba(0, 0, 0, 0.45));
}

.about__statement {
  margin-top: 1.1rem;
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.35rem);
  font-weight: 300;
  line-height: 1.24;
  letter-spacing: -0.01em;
  color: var(--cream);
  text-wrap: balance;
}

.about__para {
  margin-top: 1.3rem;
  max-width: 60ch;
  font-size: 0.96rem;
  line-height: 1.8;
  color: var(--on-dark-soft);
}

/* --- facts ------------------------------------------------------------- */

.about__facts {
  margin-top: clamp(3rem, 6vw, 5rem);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  background: rgba(242, 236, 224, 0.1);
  border-block: 1px solid rgba(242, 236, 224, 0.1);
}

.about__facts > div {
  background: var(--navy-950);
  padding: clamp(1.2rem, 2.4vw, 2rem) clamp(0.9rem, 1.6vw, 1.4rem);
}

.about__facts dt {
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 3.4vw, 2.8rem);
  font-weight: 300;
  line-height: 1;
  color: var(--copper-300);
}

.about__facts dd {
  margin-top: 0.6rem;
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--on-dark-faint);
  line-height: 1.5;
}

/* --- previous projects ------------------------------------------------- */

.about__prev {
  margin-top: clamp(3rem, 6vw, 5rem);
  display: grid;
  grid-template-columns: minmax(0, 0.42fr) minmax(0, 1fr);
  gap: clamp(1.5rem, 4vw, 3.5rem);
  align-items: start;
}

.about__prev-note {
  margin-top: 0.8rem;
  font-size: 0.9rem;
  line-height: 1.75;
  color: var(--on-dark-soft);
  max-width: 34ch;
}

.about__prev-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.about__prev-list li {
  padding: 0.55rem 1rem;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--on-dark-soft);
  border: 1px solid rgba(242, 236, 224, 0.14);
  border-radius: 2px;
  transition: border-color 0.4s var(--ease), color 0.4s var(--ease);
}

.about__prev-list li:hover {
  border-color: var(--copper-500);
  color: var(--copper-200);
}

@media (max-width: 900px) {
  .about__top,
  .about__prev {
    grid-template-columns: minmax(0, 1fr);
  }

  .about__facts {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>

<template>
  <Navigation :links="links" />
  <main>
    <Hero :projects="projects" />
    <ProjectGrid :projects="projects" />
    <About />
    <ContactBlock />
  </main>
  <SiteFooter />
</template>

<script setup>
import Navigation from '../components/Navigation.vue'
import Hero from '../components/Hero.vue'
import ProjectGrid from '../components/ProjectGrid.vue'
import About from '../components/About.vue'
import ContactBlock from '../components/ContactBlock.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { projects } from '../data/projects'

const links = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#intro' },
  { label: 'Contact', href: '#contact' },
]
</script>

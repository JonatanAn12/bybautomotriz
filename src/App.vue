<script setup lang="ts">
import { onMounted } from 'vue'
import TheNavbar from './components/TheNavbar.vue'
import HeroSection from './components/HeroSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import AboutSection from './components/AboutSection.vue'
import ContactSection from './components/ContactSection.vue'
import TheFooter from './components/TheFooter.vue'
import WhatsAppButton from './components/WhatsAppButton.vue'
import { useSEO, seoConfigs } from './composables/useSEO'

// Initialize SEO
useSEO(seoConfigs.home)

onMounted(() => {
  // Add structured data for images
  const images = document.querySelectorAll('img')
  images.forEach((img) => {
    if (!img.alt) {
      // Ensure all images have alt text for accessibility and SEO
      img.alt = 'B&B Automotriz - Servicios profesionales de mecánica automotriz'
    }
  })
})
</script>

<template>
  <div class="app" itemscope itemtype="https://schema.org/WebPage">
    <!-- Skip to main content for accessibility -->
    <a href="#main-content" class="skip-link">Saltar al contenido principal</a>

    <TheNavbar />

    <main id="main-content" role="main">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
    </main>

    <TheFooter />
    <WhatsAppButton />
  </div>
</template>

<style lang="scss">
@use './styles/global.scss';

.app {
  min-height: 100vh;
}

// Skip link for accessibility (hidden until focused)
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #0066cc;
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
  border-radius: 0 0 4px 0;

  &:focus {
    top: 0;
  }
}
</style>

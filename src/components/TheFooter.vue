<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-logo">
            <i class="pi pi-cog"></i>
            <span>B&B <span class="highlight">Automotriz</span></span>
          </div>
          <p class="footer-description">
            Más de 15 años brindando servicios profesionales de mecánica automotriz. Tu confianza es
            nuestro motor.
          </p>
          <div class="social-links">
            <Button
              icon="pi pi-facebook"
              rounded
              text
              severity="secondary"
              @click="openSocial('facebook')"
            />
            <Button
              icon="pi pi-instagram"
              rounded
              text
              severity="secondary"
              @click="openSocial('instagram')"
            />
            <Button
              icon="pi pi-twitter"
              rounded
              text
              severity="secondary"
              @click="openSocial('twitter')"
            />
            <Button
              icon="pi pi-youtube"
              rounded
              text
              severity="secondary"
              @click="openSocial('youtube')"
            />
          </div>
        </div>

        <div class="footer-section">
          <h3 class="footer-title">Servicios</h3>
          <ul class="footer-links">
            <li v-for="service in services" :key="service">
              <a @click="scrollToServices">
                <i class="pi pi-angle-right"></i>
                {{ service }}
              </a>
            </li>
          </ul>
        </div>

        <div class="footer-section">
          <h3 class="footer-title">Enlaces Rápidos</h3>
          <ul class="footer-links">
            <li v-for="link in links" :key="link.label">
              <a @click="scrollToSection(link.id)">
                <i class="pi pi-angle-right"></i>
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <div class="footer-section">
          <h3 class="footer-title">Horarios</h3>
          <ul class="footer-schedule">
            <li>
              <span class="day">Lunes - Viernes</span>
              <span class="time">8:00 - 18:00</span>
            </li>
            <li>
              <span class="day">Sábado</span>
              <span class="time">9:00 - 13:00</span>
            </li>
            <li>
              <span class="day">Domingo</span>
              <span class="time">Cerrado</span>
            </li>
          </ul>
          <Button
            label="Solicitar Turno"
            icon="pi pi-calendar"
            class="footer-cta"
            @click="openWhatsApp"
          />
        </div>
      </div>

      <Divider />

      <div class="footer-bottom">
        <p class="copyright">© {{ currentYear }} B&B Automotriz. Todos los derechos reservados.</p>
        <div class="footer-legal">
          <a href="#" @click.prevent>Términos y Condiciones</a>
          <span class="separator">|</span>
          <a href="#" @click.prevent>Política de Privacidad</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from 'primevue/button'
import Divider from 'primevue/divider'

const currentYear = computed(() => new Date().getFullYear())

const services = [
  'Mantenimiento Preventivo',
  'Mecánica General',
  'Diagnóstico Computarizado',
  'Frenos y Suspensión',
]

const links = [
  { label: 'Inicio', id: 'inicio' },
  { label: 'Servicios', id: 'servicios' },
  { label: 'Nosotros', id: 'nosotros' },
  { label: 'Contacto', id: 'contacto' },
]

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const navHeight = 80
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - navHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

const scrollToServices = () => {
  scrollToSection('servicios')
}

const openWhatsApp = () => {
  window.open('https://wa.me/573156936570?text=Hola,%20quiero%20solicitar%20un%20turno', '_blank')
}

const openSocial = (platform: string) => {
  // Todos los iconos sociales redirigen a WhatsApp
  window.open(
    'https://wa.me/573156936570?text=Hola,%20me%20gustaría%20información%20sobre%20sus%20servicios',
    '_blank',
  )
}
</script>

<style scoped lang="scss">
@use '@/styles/variables.scss' as *;

.footer {
  background: $black;
  color: $white;
  padding: $spacing-xxxl 0 $spacing-lg;

  @media (max-width: $breakpoint-md) {
    padding: $spacing-xxl 0 $spacing-md;
  }

  @media (max-width: $breakpoint-sm) {
    padding: $spacing-xl 0 $spacing-sm;
  }
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: $spacing-xxl;
  margin-bottom: $spacing-xl;

  @media (max-width: $breakpoint-lg) {
    grid-template-columns: 1fr 1fr;
    gap: $spacing-xl;
  }

  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
  }
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;

  @media (max-width: $breakpoint-sm) {
    text-align: center;
    gap: $spacing-sm;
  }
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  font-size: $font-size-2xl;
  font-weight: 800;
  margin-bottom: $spacing-sm;

  @media (max-width: $breakpoint-sm) {
    justify-content: center;
    font-size: $font-size-xl;
  }

  i {
    font-size: $font-size-3xl;
    color: $primary-blue;
    animation: spin 20s linear infinite;

    @media (max-width: $breakpoint-sm) {
      font-size: $font-size-2xl;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .highlight {
    color: $primary-blue;
  }
}

.footer-description {
  color: $gray;
  line-height: 1.7;
  font-size: $font-size-base;

  @media (max-width: $breakpoint-sm) {
    font-size: $font-size-sm;
    text-align: center;
  }
}

.social-links {
  display: flex;
  gap: $spacing-md;
  margin-top: $spacing-sm;
  justify-content: flex-start;
  flex-wrap: wrap;

  @media (max-width: $breakpoint-sm) {
    justify-content: center;
  }

  :deep(.p-button) {
    color: $gray !important;
    transition: $transition-base !important;
    width: 3.5rem !important;
    height: 3.5rem !important;
    min-width: 3.5rem !important;
    min-height: 3.5rem !important;
    max-width: 3.5rem !important;
    max-height: 3.5rem !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 0 !important;

    .p-button-icon {
      font-size: 1.5rem !important;
      margin: 0 !important;
    }

    &:hover {
      color: $primary-blue !important;
      background: rgba(0, 102, 204, 0.1) !important;
      transform: translateY(-3px) !important;
      width: 3.5rem !important;
      height: 3.5rem !important;
    }

    &:active {
      transform: scale(0.95) !important;
      width: 3.5rem !important;
      height: 3.5rem !important;
    }
  }
}

.footer-title {
  font-size: $font-size-lg;
  font-weight: 700;
  color: $white;
  margin-bottom: $spacing-sm;

  @media (max-width: $breakpoint-sm) {
    font-size: $font-size-base;
    margin-bottom: $spacing-xs;
  }
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;

  li {
    a {
      display: flex;
      align-items: center;
      gap: $spacing-sm;
      color: $gray;
      text-decoration: none;
      font-size: $font-size-base;
      cursor: pointer;
      transition: $transition-base;

      i {
        font-size: $font-size-sm;
        transition: $transition-base;
      }

      &:hover {
        color: $primary-blue;
        padding-left: $spacing-xs;

        i {
          transform: translateX(3px);
        }
      }
    }
  }
}

.footer-schedule {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: $spacing-md;

  li {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
    padding: $spacing-sm;
    background: rgba(255, 255, 255, 0.05);
    border-radius: $border-radius;
    border-left: 3px solid $primary-blue;

    .day {
      font-weight: 600;
      color: $white;
      font-size: $font-size-sm;
    }

    .time {
      color: $gray;
      font-size: $font-size-sm;
    }
  }
}

.footer-cta {
  margin-top: $spacing-md;
  width: 100%;
  display: flex;
  justify-content: center;

  :deep(.p-button) {
    width: 100% !important;
    font-weight: 700 !important;
    font-size: $font-size-lg !important;
    padding: $spacing-md $spacing-lg !important;
    background: $primary-blue !important;
    color: $white !important;
    border-radius: $border-radius-lg !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;

    &:hover {
      background: $dark-blue !important;
      transform: translateY(-2px) !important;
      box-shadow: $shadow-lg !important;
    }

    &:active {
      transform: scale(0.98) !important;
      box-shadow: none !important;
    }
  }
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: $spacing-lg;
  flex-wrap: wrap;
  gap: $spacing-md;

  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    text-align: center;
  }
}

.copyright {
  color: $gray;
  font-size: $font-size-sm;
  margin: 0;
}

.footer-legal {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  font-size: $font-size-sm;

  a {
    color: $gray;
    text-decoration: none;
    transition: $transition-base;

    &:hover {
      color: $primary-blue;
    }
  }

  .separator {
    color: $gray;
  }
}
</style>

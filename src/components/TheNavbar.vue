<template>
  <nav :class="['navbar', { 'navbar-scrolled': isScrolled }]">
    <div class="container">
      <div class="navbar-content">
        <!-- Logo -->
        <div class="navbar-logo" @click="scrollToSection('inicio')">
          <img :src="logoImage" alt="B&B Automotriz" class="logo-image" />
        </div>

        <!-- Desktop Menu -->
        <div class="navbar-menu">
          <a
            v-for="item in menuItems"
            :key="item.id"
            :class="['navbar-link', { active: activeSection === item.id }]"
            @click="scrollToSection(item.id)"
          >
            {{ item.label }}
          </a>
        </div>

        <!-- CTA Button -->
        <Button
          label="Contactar"
          icon="pi pi-whatsapp"
          class="navbar-cta"
          @click="scrollToSection('contacto')"
          severity="primary"
        />

        <!-- Mobile Menu Button -->
        <Button
          icon="pi pi-bars"
          class="navbar-mobile-toggle"
          @click="toggleMobileMenu"
          text
          rounded
        />
      </div>
    </div>

    <!-- Mobile Menu -->
    <Sidebar v-model:visible="mobileMenuVisible" position="right" class="mobile-sidebar">
      <div class="mobile-logo">
        <img :src="logoImage" alt="B&B Automotriz" class="logo-image-mobile" />
      </div>
      <div class="mobile-menu">
        <a
          v-for="item in menuItems"
          :key="item.id"
          :class="['mobile-link', { active: activeSection === item.id }]"
          @click="scrollToSection(item.id)"
        >
          <i :class="`pi ${item.icon}`"></i>
          {{ item.label }}
        </a>
        <Divider />
        <Button
          label="Contactar por WhatsApp"
          icon="pi pi-whatsapp"
          class="w-full"
          @click="openWhatsApp"
          severity="success"
        />
      </div>
    </Sidebar>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Button from 'primevue/button'
import Sidebar from 'primevue/sidebar'
import Divider from 'primevue/divider'
import logoImage from '@/img/B&B Automotriz_ Potencia y Precisión.png'

const isScrolled = ref(false)
const activeSection = ref('inicio')
const mobileMenuVisible = ref(false)

const menuItems = [
  { id: 'inicio', label: 'Inicio', icon: 'pi-home' },
  { id: 'servicios', label: 'Servicios', icon: 'pi-cog' },
  { id: 'nosotros', label: 'Nosotros', icon: 'pi-users' },
  { id: 'contacto', label: 'Contacto', icon: 'pi-envelope' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50

  // Detectar sección activa
  const sections = ['inicio', 'servicios', 'nosotros', 'contacto']
  for (const section of sections) {
    const element = document.getElementById(section)
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top <= 150 && rect.bottom >= 150) {
        activeSection.value = section
        break
      }
    }
  }
}

const scrollToSection = (sectionId: string) => {
  // Cerrar el menú móvil primero
  mobileMenuVisible.value = false

  // Pequeño delay para que la animación del sidebar se vea bien
  setTimeout(() => {
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
  }, 300)
}

const toggleMobileMenu = () => {
  mobileMenuVisible.value = !mobileMenuVisible.value
}

const openWhatsApp = () => {
  window.open(
    'https://wa.me/573156936570?text=Hola,%20necesito%20información%20sobre%20servicios%20de%20mecánica',
    '_blank',
  )
  mobileMenuVisible.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
@use '@/styles/variables.scss' as *;

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $z-index-fixed;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  box-shadow: $shadow-md;
  transition: $transition-base;
  padding: $spacing-sm 0;

  &-scrolled {
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    box-shadow: $shadow-md;
    padding: $spacing-sm 0;

    .navbar-logo,
    .navbar-link {
      color: $black;
    }

    .logo-icon {
      color: $primary-blue;
    }
  }

  &-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-logo {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: $transition-base;
    position: relative;
    z-index: 10;

    &:hover {
      transform: scale(1.05);
    }

    .logo-image {
      height: 60px;
      width: auto;
      max-width: 200px;
      object-fit: contain;
      transition: $transition-base;
      border-radius: $border-radius;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    }
  }

  &-scrolled &-logo {
    .logo-image {
      height: 55px;
    }
  }

  // Logo siempre con colores normales (sin filtro blanco)
  &-logo .logo-image {
    filter: none !important;
  }

  &-menu {
    display: flex;
    gap: $spacing-xl;
    align-items: center;

    @media (max-width: $breakpoint-lg) {
      display: none;
    }
  }

  &-link {
    color: $black;
    text-decoration: none;
    font-weight: 600;
    font-size: $font-size-base;
    cursor: pointer;
    position: relative;
    transition: $transition-base;
    padding: $spacing-xs 0;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: $primary-blue;
      transition: width 0.3s ease;
    }

    &:hover,
    &.active {
      color: $primary-blue;

      &::after {
        width: 100%;
      }
    }
  }

  &-cta {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;

    :deep(.p-button) {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }

    @media (max-width: $breakpoint-lg) {
      display: none;
    }
  }

  &-mobile-toggle {
    display: none;
    color: $black;

    @media (max-width: $breakpoint-lg) {
      display: flex;
    }
  }

  &-scrolled &-mobile-toggle {
    color: $black;
  }
}

.mobile-sidebar {
  :deep(.p-sidebar) {
    width: 320px;
    max-width: 90vw;
  }

  :deep(.p-sidebar-header) {
    padding: $spacing-lg;
    border-bottom: 1px solid $border-gray;
  }

  :deep(.p-sidebar-content) {
    padding: $spacing-lg;
  }
}

.mobile-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-md 0;
  background: $white;
  border-radius: $border-radius;
  margin-bottom: $spacing-md;

  .logo-image-mobile {
    height: 60px;
    width: auto;
    max-width: 180px;
    object-fit: contain;
  }
}

.mobile-menu {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  padding: $spacing-md 0;

  .w-full {
    width: 100% !important;

    :deep(.p-button) {
      width: 100% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
  }
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md;
  color: $black;
  text-decoration: none;
  font-weight: 600;
  border-radius: $border-radius;
  transition: $transition-base;
  cursor: pointer;

  i {
    font-size: $font-size-lg;
    color: $primary-blue;
  }

  &:hover,
  &.active {
    background: $light-blue;
    color: $primary-blue;
  }
}
</style>

<template>
  <Transition name="fade">
    <div v-if="show" class="whatsapp-float">
      <div class="whatsapp-button">
        <Button
          icon="pi pi-whatsapp"
          rounded
          size="large"
          severity="success"
          @click="openWhatsApp"
          aria-label="Contactar por WhatsApp"
        />
      </div>

      <!-- Tooltip -->
      <Transition name="tooltip">
        <div v-if="showTooltip" class="whatsapp-tooltip">
          ¿Necesitas ayuda?<br />
          <strong>¡Escríbenos!</strong>
        </div>
      </Transition>

      <!-- Pulsos decorativos -->
      <span class="pulse-ring"></span>
      <span class="pulse-ring-delayed"></span>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Button from 'primevue/button'

const show = ref(false)
const showTooltip = ref(false)

const openWhatsApp = () => {
  window.open(
    'https://wa.me/573156936570?text=Hola,%20necesito%20información%20sobre%20sus%20servicios',
    '_blank',
  )
  showTooltip.value = false
}

const handleScroll = () => {
  // Mostrar el botón después de hacer scroll 300px
  show.value = window.scrollY > 300
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  // Mostrar tooltip después de 3 segundos
  setTimeout(() => {
    showTooltip.value = true
    // Ocultar tooltip después de 5 segundos
    setTimeout(() => {
      showTooltip.value = false
    }, 5000)
  }, 3000)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
@use '@/styles/variables.scss' as *;

.whatsapp-float {
  position: fixed;
  bottom: $spacing-xl;
  right: $spacing-xl;
  z-index: $z-index-tooltip;

  @media (max-width: $breakpoint-sm) {
    bottom: $spacing-lg;
    right: $spacing-lg;
  }
}

.whatsapp-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;

  :deep(.p-button) {
    width: 70px !important;
    height: 70px !important;
    min-width: 70px !important;
    min-height: 70px !important;
    max-width: 70px !important;
    max-height: 70px !important;
    background: #25d366 !important;
    display: flex !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 0 !important;
    border-radius: 50% !important;
    box-shadow: 0 4px 20px rgba(37, 211, 102, 0.5) !important;
    transition: all 0.3s ease !important;
  }

  :deep(.p-button-icon) {
    font-size: 2.5rem !important;
    margin: 0 !important;
    line-height: 1 !important;
  }

  :deep(.p-button-label) {
    display: none !important;
  }

  &:hover {
    :deep(.p-button) {
      transform: scale(1.1) !important;
      box-shadow: 0 8px 30px rgba(37, 211, 102, 0.7) !important;
      width: 70px !important;
      height: 70px !important;
    }
  }

  &:active {
    :deep(.p-button) {
      transform: scale(0.95) !important;
      box-shadow: 0 2px 10px rgba(37, 211, 102, 0.5) !important;
      width: 70px !important;
      height: 70px !important;
    }
  }
}

.whatsapp-tooltip {
  position: absolute;
  bottom: 70px;
  right: 0;
  background: $white;
  color: $black;
  padding: $spacing-md $spacing-lg;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-lg;
  white-space: nowrap;
  font-size: $font-size-sm;
  line-height: 1.5;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid $white;
  }

  strong {
    color: #25d366;
  }

  @media (max-width: $breakpoint-sm) {
    right: auto;
    left: 50%;
    transform: translateX(-50%);
    bottom: 75px;

    &::after {
      left: 50%;
      right: auto;
      transform: translateX(-50%);
    }
  }
}

.pulse-ring,
.pulse-ring-delayed {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  border: 3px solid #25d366;
  border-radius: 50%;
  animation: pulse-ring 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
  pointer-events: none;
}

.pulse-ring-delayed {
  animation-delay: 1.25s;
}

@keyframes pulse-ring {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.6);
    opacity: 0;
  }
}

// Transiciones
.fade-enter-active,
.fade-leave-active {
  transition: $transition-base;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.tooltip-enter-active,
.tooltip-leave-active {
  transition: $transition-base;
}

.tooltip-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.tooltip-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

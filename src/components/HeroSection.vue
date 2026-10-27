<template>
  <section id="inicio" class="hero">
    <div class="hero-background">
      <div class="hero-image"></div>
      <div class="hero-overlay"></div>
      <div class="hero-pattern"></div>
    </div>

    <div class="container">
      <div class="hero-content">
        <div class="hero-badge fade-in">
          <i class="pi pi-shield"></i>
          <span>Más de 15 años de experiencia</span>
        </div>

        <h1 class="hero-title fade-in delay-1">
          Excelencia en
          <span class="highlight">Mecánica Automotriz</span>
        </h1>

        <p class="hero-subtitle fade-in delay-2">
          Servicios profesionales de diagnóstico, mantenimiento y reparación automotriz. Tu vehículo
          en las mejores manos, con tecnología de última generación.
        </p>

        <div class="hero-buttons fade-in delay-3">
          <Button
            label="Solicitar Cotización"
            icon="pi pi-send"
            size="large"
            @click="scrollToContact"
          />
          <Button
            label="Ver Servicios"
            icon="pi pi-arrow-down"
            size="large"
            outlined
            @click="scrollToServices"
          />
        </div>

        <div class="hero-features fade-in delay-4">
          <div class="feature-item">
            <i class="pi pi-verified"></i>
            <span>Garantía de Calidad</span>
          </div>
          <div class="feature-item">
            <i class="pi pi-clock"></i>
            <span>Servicio Rápido</span>
          </div>
          <div class="feature-item">
            <i class="pi pi-dollar"></i>
            <span>Precios Justos</span>
          </div>
        </div>
      </div>
    </div>

    <div class="scroll-indicator" @click="scrollToServices">
      <span>Desliza para más</span>
      <i class="pi pi-chevron-down"></i>
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from 'primevue/button'

const scrollToContact = () => {
  const element = document.getElementById('contacto')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToServices = () => {
  const element = document.getElementById('servicios')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped lang="scss">
@use '@/styles/variables.scss' as *;

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: calc($spacing-xxxl + 70px) 0 $spacing-xxxl;

  @media (max-width: $breakpoint-md) {
    min-height: 85vh;
    padding: calc($spacing-xxl + 70px) 0 $spacing-xl;
  }

  @media (max-width: $breakpoint-sm) {
    min-height: 80vh;
    padding: calc($spacing-xxl + 60px) 0 $spacing-lg;
  }

  &-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }

  &-image {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('@/img/WhatsApp Image 2026-10-24 at 12.11.50 PM (3).jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  &-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 64, 128, 0.92) 0%, rgba(0, 102, 204, 0.88) 100%);
    z-index: 1;
  }

  &-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 35px,
      rgba(255, 255, 255, 0.03) 35px,
      rgba(255, 255, 255, 0.03) 70px
    );
    z-index: 2;
  }

  &-content {
    position: relative;
    z-index: 10;
    text-align: center;
    max-width: 900px;
    margin: 0 auto;
  }

  &-badge {
    display: inline-flex;
    align-items: center;
    gap: $spacing-sm;
    background: rgba(0, 102, 204, 0.15);
    backdrop-filter: blur(10px);
    color: $white;
    padding: $spacing-sm $spacing-lg;
    border-radius: 50px;
    font-weight: 600;
    font-size: $font-size-sm;
    margin-bottom: $spacing-lg;
    border: 1px solid rgba(255, 255, 255, 0.3);

    i {
      font-size: $font-size-lg;
      color: #ffd700;
    }

    @media (max-width: $breakpoint-sm) {
      padding: $spacing-xs $spacing-md;
      font-size: 0.75rem;
      gap: $spacing-xs;
      margin-bottom: $spacing-md;

      i {
        font-size: $font-size-base;
      }
    }
  }

  &-title {
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 800;
    color: $white;
    line-height: 1.2;
    margin-bottom: $spacing-lg;

    .highlight {
      color: $white;
      position: relative;
      display: inline-block;

      &::after {
        content: '';
        position: absolute;
        bottom: 0.1em;
        left: 0;
        right: 0;
        height: 0.15em;
        background: rgba(255, 255, 255, 0.3);
        border-radius: $border-radius;
        z-index: -1;
      }
    }
  }

  &-subtitle {
    font-size: clamp(1rem, 2vw, 1.25rem);
    color: rgba(255, 255, 255, 0.95);
    line-height: 1.8;
    margin-bottom: $spacing-xl;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: $breakpoint-sm) {
      line-height: 1.6;
      margin-bottom: $spacing-lg;
    }
  }

  &-buttons {
    display: flex;
    gap: $spacing-md;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: $spacing-xxl;

    @media (max-width: $breakpoint-sm) {
      gap: $spacing-sm;
      margin-bottom: $spacing-xl;
      flex-direction: column;
      width: 100%;
      max-width: 320px;
      margin-left: auto;
      margin-right: auto;
    }

    :deep(.p-button) {
      font-weight: 600 !important;
      padding: $spacing-md $spacing-xl !important;
      border-radius: $border-radius-lg !important;
      transition: $transition-base !important;
      min-width: auto !important;
      width: auto !important;

      @media (max-width: $breakpoint-sm) {
        width: 100% !important;
        padding: $spacing-sm $spacing-lg !important;
        font-size: $font-size-sm !important;
      }

      &:hover {
        transform: translateY(-3px) !important;
        box-shadow: $shadow-xl !important;
      }

      &:active {
        transform: scale(0.98) !important;
        box-shadow: none !important;
        min-width: auto !important;
        width: auto !important;

        @media (max-width: $breakpoint-sm) {
          width: 100% !important;
        }
      }

      &.p-button-outlined {
        background: transparent !important;
        border: 2px solid $white !important;
        color: $white !important;
        border-radius: $border-radius-lg !important;

        &:hover {
          background: $white !important;
          color: $primary-blue !important;
        }

        &:active {
          transform: scale(0.98) !important;
          min-width: auto !important;
          width: auto !important;

          @media (max-width: $breakpoint-sm) {
            width: 100% !important;
          }
        }
      }
    }
  }

  &-features {
    display: flex;
    gap: $spacing-xl;
    justify-content: center;
    flex-wrap: wrap;

    @media (max-width: $breakpoint-sm) {
      gap: $spacing-md;
    }
  }
}

.feature-item {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  color: $white;
  font-weight: 600;
  font-size: $font-size-base;

  i {
    font-size: $font-size-xl;
    color: #ffd700;
  }

  @media (max-width: $breakpoint-sm) {
    font-size: $font-size-sm;
    gap: $spacing-xs;

    i {
      font-size: $font-size-lg;
    }
  }
}

.scroll-indicator {
  position: absolute;
  bottom: $spacing-xl;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-sm;
  color: $white;
  font-size: $font-size-sm;
  font-weight: 600;
  animation: bounce 2s infinite;
  cursor: pointer;
  transition: $transition-base;
  z-index: 10;

  &:hover {
    transform: translateX(-50%) scale(1.1);
    color: rgba(255, 255, 255, 1);
  }

  i {
    font-size: $font-size-lg;
  }

  @media (max-width: $breakpoint-md) {
    display: none;
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}
</style>

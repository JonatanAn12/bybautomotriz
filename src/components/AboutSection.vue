<template>
  <section id="nosotros" class="about">
    <div class="container">
      <div class="about-grid">
        <div class="about-content">
          <span class="section-badge">Sobre Nosotros</span>
          <h2 class="section-title">Profesionales Comprometidos con la Excelencia</h2>

          <p class="about-text">
            En <strong>B&B Automotriz</strong>, somos más que un taller mecánico. Somos un equipo de
            profesionales apasionados por la industria automotriz, con más de 15 años de experiencia
            brindando servicios de calidad superior.
          </p>

          <p class="about-text">
            Nos especializamos en diagnóstico de precisión, mantenimiento preventivo y correctivo de
            vehículos de todas las marcas. Contamos con tecnología de última generación y un equipo
            técnico certificado que garantiza resultados excepcionales.
          </p>

          <div class="about-features">
            <div v-for="(feature, index) in features" :key="index" class="feature-item">
              <div class="feature-icon">
                <i :class="`pi ${feature.icon}`"></i>
              </div>
              <div class="feature-content">
                <h4>{{ feature.title }}</h4>
                <p>{{ feature.description }}</p>
              </div>
            </div>
          </div>

          <Button
            label="Conocer más sobre nosotros"
            icon="pi pi-arrow-right"
            size="large"
            class="about-button"
            @click="scrollToContact"
          />
        </div>

        <div class="about-stats">
          <div class="stats-grid">
            <Card
              v-for="(stat, index) in stats"
              :key="index"
              class="stat-card fade-in-up"
              :style="{ animationDelay: `${index * 0.15}s` }"
            >
              <template #content>
                <div class="stat-icon">
                  <i :class="`pi ${stat.icon}`"></i>
                </div>
                <div class="stat-number">{{ stat.number }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </template>
            </Card>
          </div>

          <Card class="image-placeholder">
            <template #content>
              <img
                src="@/img/WhatsApp Image 2026-10-24 at 12.11.49 PM.jpeg"
                alt="Taller B&B Automotriz"
                class="about-image-photo"
              />
            </template>
          </Card>
        </div>
      </div>

      <!-- Valores -->
      <div class="values-section">
        <div class="section-header">
          <h3 class="values-title">Nuestros Valores</h3>
        </div>
        <div class="values-grid">
          <Card v-for="(value, index) in values" :key="index" class="value-card">
            <template #header>
              <div class="value-icon-wrapper">
                <i :class="`pi ${value.icon}`"></i>
              </div>
            </template>
            <template #title>
              {{ value.title }}
            </template>
            <template #content>
              <p>{{ value.description }}</p>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'

const features = [
  {
    icon: 'pi-shield',
    title: 'Garantía Total',
    description: 'Todos nuestros servicios cuentan con garantía escrita',
  },
  {
    icon: 'pi-users',
    title: 'Equipo Certificado',
    description: 'Técnicos con certificaciones internacionales',
  },
  {
    icon: 'pi-chart-line',
    title: 'Tecnología Avanzada',
    description: 'Equipamiento de diagnóstico de última generación',
  },
]

const stats = [
  {
    icon: 'pi-calendar',
    number: '15+',
    label: 'Años de Experiencia',
  },
  {
    icon: 'pi-users',
    number: '5000+',
    label: 'Clientes Satisfechos',
  },
  {
    icon: 'pi-car',
    number: '10000+',
    label: 'Vehículos Atendidos',
  },
  {
    icon: 'pi-star-fill',
    number: '4.9/5',
    label: 'Calificación Promedio',
  },
]

const values = [
  {
    icon: 'pi-check-circle',
    title: 'Honestidad',
    description: 'Transparencia en cada servicio y presupuesto claro desde el inicio',
  },
  {
    icon: 'pi-bolt',
    title: 'Eficiencia',
    description: 'Soluciones rápidas sin comprometer la calidad del trabajo',
  },
  {
    icon: 'pi-heart',
    title: 'Compromiso',
    description: 'Dedicados a superar las expectativas de cada cliente',
  },
  {
    icon: 'pi-trophy',
    title: 'Excelencia',
    description: 'Estándares de calidad superiores en cada intervención',
  },
]

const scrollToContact = () => {
  const element = document.getElementById('contacto')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped lang="scss">
@use '@/styles/variables.scss' as *;

.about {
  padding: $spacing-xxxl 0;
  background: $white;
  position: relative;

  @media (max-width: $breakpoint-md) {
    padding: $spacing-xxl 0;
  }

  @media (max-width: $breakpoint-sm) {
    padding: $spacing-xl 0;
  }
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-xxl;
  align-items: start;
  margin-bottom: $spacing-xxxl;

  @media (max-width: $breakpoint-lg) {
    grid-template-columns: 1fr;
    gap: $spacing-xl;
  }
}

.about-content {
  position: sticky;
  top: 100px;

  @media (max-width: $breakpoint-lg) {
    position: static;
  }
}

.section-badge {
  display: inline-block;
  background: $light-blue;
  color: $primary-blue;
  padding: $spacing-xs $spacing-lg;
  border-radius: 50px;
  font-size: $font-size-sm;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: $spacing-md;
}

.section-title {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 800;
  color: $black;
  margin-bottom: $spacing-lg;
  line-height: 1.3;
}

.about-text {
  font-size: $font-size-lg;
  color: $gray;
  line-height: 1.8;
  margin-bottom: $spacing-lg;

  strong {
    color: $primary-blue;
    font-weight: 700;
  }
}

.about-features {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
  margin: $spacing-xl 0;

  @media (max-width: $breakpoint-sm) {
    gap: $spacing-md;
    margin: $spacing-lg 0;
  }
}

.feature-item {
  display: flex;
  gap: $spacing-md;
  align-items: flex-start;

  @media (max-width: $breakpoint-sm) {
    gap: $spacing-sm;
  }
}

.feature-icon {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  background: $light-blue;
  border-radius: $border-radius-lg;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: $breakpoint-sm) {
    width: 45px;
    height: 45px;
  }

  i {
    font-size: $font-size-xl;
    color: $primary-blue;

    @media (max-width: $breakpoint-sm) {
      font-size: $font-size-lg;
    }
  }
}

.feature-content {
  flex: 1;

  h4 {
    font-size: $font-size-lg;
    font-weight: 700;
    color: $black;
    margin-bottom: $spacing-xs;

    @media (max-width: $breakpoint-sm) {
      font-size: $font-size-base;
    }
  }

  p {
    color: $gray;
    line-height: 1.6;

    @media (max-width: $breakpoint-sm) {
      font-size: $font-size-sm;
    }
  }
}

.about-button {
  margin-top: $spacing-lg;
  width: 100%;
  display: flex;
  justify-content: flex-start;

  @media (max-width: $breakpoint-lg) {
    justify-content: center;
  }

  :deep(.p-button) {
    font-weight: 600;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;

    @media (max-width: $breakpoint-lg) {
      width: 100%;
    }
  }
}

.about-stats {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-md;

  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
    gap: $spacing-sm;
  }
}

.stat-card {
  text-align: center;
  background: linear-gradient(135deg, $light-blue 0%, $white 100%);
  border: 1px solid $border-gray;
  transition: $transition-base;
  animation: fadeInUp 0.8s ease-out;
  animation-fill-mode: both;

  @media (max-width: $breakpoint-sm) {
    &:hover {
      transform: translateY(-3px);
    }
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: $shadow-lg;
    border-color: $primary-blue;

    .stat-icon i {
      transform: scale(1.2);
    }
  }

  :deep(.p-card-body) {
    padding: $spacing-lg;

    @media (max-width: $breakpoint-sm) {
      padding: $spacing-md;
    }
  }

  :deep(.p-card-content) {
    padding: 0;
  }
}

.stat-icon {
  margin-bottom: $spacing-sm;

  i {
    font-size: 2rem;
    color: $primary-blue;
    transition: $transition-base;

    @media (max-width: $breakpoint-sm) {
      font-size: 1.75rem;
    }
  }
}

.stat-number {
  font-size: $font-size-4xl;
  font-weight: 800;
  color: $dark-blue;
  margin-bottom: $spacing-xs;
  line-height: 1;

  @media (max-width: $breakpoint-sm) {
    font-size: $font-size-3xl;
  }
}

.stat-label {
  font-size: $font-size-sm;
  color: $gray;
  font-weight: 600;
  line-height: 1.4;

  @media (max-width: $breakpoint-sm) {
    font-size: 0.75rem;
  }
}

.image-placeholder {
  min-height: 450px;
  border: none;
  overflow: hidden;
  border-radius: $border-radius-lg;

  :deep(.p-card-body) {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    overflow: hidden;
  }

  :deep(.p-card-content) {
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  @media (max-width: $breakpoint-md) {
    min-height: 350px;
  }
}

.about-image-photo {
  width: 100%;
  height: 100%;
  min-height: 450px;
  object-fit: cover;
  object-position: center 20%;
  border-radius: $border-radius-lg;
  transform: scale(1.15);

  @media (max-width: $breakpoint-md) {
    min-height: 350px;
    object-position: center 25%;
    transform: scale(1.1);
  }
}

.placeholder-content {
  text-align: center;
  color: $gray;

  i {
    font-size: 4rem;
    color: $border-gray;
    margin-bottom: $spacing-md;
  }

  p {
    font-size: $font-size-lg;
    font-weight: 600;
    margin-bottom: $spacing-xs;
  }

  span {
    font-size: $font-size-sm;
  }
}

.values-section {
  margin-top: $spacing-xxxl;
  padding-top: $spacing-xxxl;
  border-top: 1px solid $border-gray;

  @media (max-width: $breakpoint-md) {
    margin-top: $spacing-xxl;
    padding-top: $spacing-xxl;
  }

  @media (max-width: $breakpoint-sm) {
    margin-top: $spacing-xl;
    padding-top: $spacing-xl;
  }
}

.section-header {
  text-align: center;
  margin-bottom: $spacing-xxl;

  @media (max-width: $breakpoint-sm) {
    margin-bottom: $spacing-lg;
  }
}

.values-title {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 800;
  color: $black;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: $spacing-lg;
}

.value-card {
  text-align: center;
  border: 1px solid $border-gray;
  transition: $transition-base;

  &:hover {
    transform: translateY(-5px);
    box-shadow: $shadow-lg;
    border-color: $primary-blue;

    .value-icon-wrapper {
      background: $primary-blue;

      i {
        color: $white;
        transform: scale(1.1);
      }
    }
  }

  :deep(.p-card-header) {
    padding: $spacing-xl $spacing-lg 0;
  }

  :deep(.p-card-body) {
    padding: $spacing-lg;
  }

  :deep(.p-card-title) {
    font-size: $font-size-xl;
    font-weight: 700;
    color: $black;
    margin-bottom: $spacing-sm;
  }

  :deep(.p-card-content) {
    padding: 0;
    color: $gray;
    line-height: 1.7;
  }
}

.value-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  background: $light-blue;
  border-radius: 50%;
  transition: $transition-base;
  margin-bottom: $spacing-md;

  i {
    font-size: 2rem;
    color: $primary-blue;
    transition: $transition-base;
  }
}

@media (max-width: $breakpoint-sm) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .values-grid {
    grid-template-columns: 1fr;
  }
}
</style>

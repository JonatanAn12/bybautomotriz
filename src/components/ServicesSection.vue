<template>
  <section id="servicios" class="services">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Nuestros Servicios</span>
        <h2 class="section-title">Soluciones Integrales para tu Vehículo</h2>
        <p class="section-subtitle">
          Ofrecemos una amplia gama de servicios especializados con tecnología de punta y personal
          altamente capacitado
        </p>
      </div>

      <div class="services-grid">
        <Card
          v-for="(service, index) in services"
          :key="index"
          class="service-card fade-in-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <template #header>
            <div class="service-icon-wrapper">
              <i :class="`pi ${service.icon}`" class="service-icon"></i>
            </div>
          </template>
          <template #title>
            {{ service.title }}
          </template>
          <template #content>
            <p class="service-description">{{ service.description }}</p>
            <Divider />
            <div class="service-features">
              <div v-for="(feature, i) in service.features" :key="i" class="feature-tag">
                <i class="pi pi-check-circle"></i>
                <span>{{ feature }}</span>
              </div>
            </div>
          </template>
          <template #footer>
            <Button
              label="Más información"
              icon="pi pi-arrow-right"
              text
              class="service-button"
              @click="openServiceDialog(service)"
            />
          </template>
        </Card>
      </div>

      <div class="services-cta">
        <Card class="cta-card">
          <template #content>
            <div class="cta-content">
              <div class="cta-icon">
                <i class="pi pi-phone"></i>
              </div>
              <div class="cta-text">
                <h3>¿No encuentras lo que buscas?</h3>
                <p>Contáctanos y te ayudaremos con cualquier servicio que necesites</p>
              </div>
              <Button
                label="Contactar Ahora"
                icon="pi pi-whatsapp"
                size="large"
                severity="success"
                @click="openWhatsApp('Consulta general')"
              />
            </div>
          </template>
        </Card>
      </div>
    </div>

    <!-- Service Detail Dialog -->
    <Dialog
      v-model:visible="showServiceDialog"
      :header="selectedService?.title"
      :modal="true"
      :dismissableMask="true"
      :style="{ width: '90vw', maxWidth: '1000px' }"
      class="service-dialog"
    >
      <div v-if="selectedService" class="service-detail">
        <div class="service-detail-header">
          <div class="service-detail-icon">
            <i :class="`pi ${selectedService.icon}`"></i>
          </div>
          <p class="service-detail-description">{{ selectedService.fullDescription }}</p>
        </div>

        <Divider />

        <div class="service-detail-content">
          <div class="service-detail-section">
            <h3><i class="pi pi-check-square"></i> ¿Qué incluye?</h3>
            <ul class="feature-list">
              <li v-for="(feature, i) in selectedService.features" :key="i">
                <i class="pi pi-check-circle"></i>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>

          <div class="service-detail-section">
            <h3><i class="pi pi-star"></i> Beneficios</h3>
            <ul class="benefit-list">
              <li v-for="(benefit, i) in selectedService.benefits" :key="i">
                <i class="pi pi-star-fill"></i>
                <span>{{ benefit }}</span>
              </li>
            </ul>
          </div>

          <div v-if="selectedService.images" class="service-gallery">
            <h3><i class="pi pi-images"></i> Galería de Trabajos</h3>
            <div class="gallery-grid">
              <div
                v-for="(image, i) in selectedService.images"
                :key="i"
                class="gallery-item"
                @click="openImagePreview(image)"
              >
                <img :src="image.src" :alt="image.alt" />
                <div class="gallery-overlay">
                  <i class="pi pi-search-plus"></i>
                  <p>{{ image.caption }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <Button
          label="Solicitar este servicio"
          icon="pi pi-whatsapp"
          severity="success"
          size="large"
          @click="requestService"
        />
        <Button label="Cerrar" severity="secondary" text @click="showServiceDialog = false" />
      </template>
    </Dialog>

    <!-- Image Preview Dialog -->
    <Dialog
      v-model:visible="showImagePreview"
      :modal="true"
      :dismissableMask="true"
      :style="{ width: '90vw', maxWidth: '800px' }"
      class="image-preview-dialog"
    >
      <template #header>
        <span>{{ previewImage?.alt }}</span>
      </template>
      <div v-if="previewImage" class="image-preview">
        <img :src="previewImage.src" :alt="previewImage.alt" />
        <p class="image-caption">{{ previewImage.caption }}</p>
      </div>
    </Dialog>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import Dialog from 'primevue/dialog'

// Import images
import img1 from '@/img/WhatsApp Image 2026-10-24 at 12.11.49 PM (1).jpeg'
import img2 from '@/img/WhatsApp Image 2026-10-24 at 12.11.49 PM (2).jpeg'
import img3 from '@/img/WhatsApp Image 2026-10-24 at 12.11.50 PM (1).jpeg'
import img4 from '@/img/WhatsApp Image 2026-10-24 at 12.11.50 PM (2).jpeg'
import img5 from '@/img/WhatsApp Image 2026-10-24 at 12.11.50 PM (4).jpeg'
import img6 from '@/img/WhatsApp Image 2026-10-24 at 12.11.50 PM (5).jpeg'
import img7 from '@/img/WhatsApp Image 2026-10-24 at 12.11.50 PM (6).jpeg'
import img8 from '@/img/WhatsApp Image 2026-10-24 at 12.11.51 PM (1).jpeg'
import img9 from '@/img/WhatsApp Image 2026-10-24 at 12.11.51 PM (2).jpeg'
import img10 from '@/img/WhatsApp Image 2026-10-24 at 12.11.51 PM.jpeg'

interface GalleryImage {
  src: string
  alt: string
  caption: string
}

interface Service {
  icon: string
  title: string
  description: string
  fullDescription: string
  features: string[]
  benefits: string[]
  images?: GalleryImage[]
}

const showServiceDialog = ref(false)
const selectedService = ref<Service | null>(null)
const showImagePreview = ref(false)
const previewImage = ref<GalleryImage | null>(null)

const services: Service[] = [
  {
    icon: 'pi-wrench',
    title: 'Mantenimiento Preventivo',
    description:
      'Servicios programados para mantener tu vehículo en óptimas condiciones y prevenir averías costosas.',
    fullDescription:
      'Nuestro servicio de mantenimiento preventivo está diseñado para mantener tu vehículo funcionando de manera óptima y prevenir problemas costosos antes de que ocurran. Realizamos una revisión exhaustiva de 15 puntos críticos, incluyendo cambio de aceite con filtros de alta calidad, inspección de frenos, suspensión, sistema eléctrico, y más.',
    features: [
      'Cambio de aceite con filtro de alta calidad',
      'Revisión completa de 15 puntos críticos',
      'Diagnóstico computarizado completo',
      'Rotación y balanceo de neumáticos',
      'Inspección de frenos y pastillas',
      'Verificación de niveles de fluidos',
    ],
    benefits: [
      'Prolonga la vida útil de tu vehículo',
      'Previene averías costosas',
      'Mejora el rendimiento del combustible',
      'Mantiene la garantía del fabricante',
      'Mayor seguridad en carretera',
    ],
    images: [
      { src: img1, alt: 'Mantenimiento de motor', caption: 'Cambio de aceite profesional' },
      {
        src: img2,
        alt: 'Inspección vehicular',
        caption: 'Revisión exhaustiva de componentes',
      },
      { src: img3, alt: 'Sistema de frenos', caption: 'Inspección de sistema de frenado' },
    ],
  },
  {
    icon: 'pi-cog',
    title: 'Mecánica General',
    description:
      'Reparación y diagnóstico de sistemas mecánicos con experiencia en todas las marcas y modelos.',
    fullDescription:
      'Contamos con mecánicos expertos capacitados para trabajar en todas las marcas y modelos de vehículos. Desde reparaciones menores hasta trabajos complejos de motor y transmisión, utilizamos repuestos de calidad y herramientas especializadas para garantizar un servicio excepcional.',
    features: [
      'Reparación y reconstrucción de motores',
      'Sistema de transmisión manual y automática',
      'Reparación de clutch y embrague',
      'Sistema de refrigeración',
      'Correas de distribución',
      'Reparación de fugas',
    ],
    benefits: [
      'Técnicos certificados con +15 años de experiencia',
      'Repuestos de calidad garantizados',
      'Diagnóstico preciso con tecnología avanzada',
      'Garantía en todos nuestros trabajos',
      'Servicio rápido y eficiente',
    ],
    images: [
      { src: img4, alt: 'Reparación de motor', caption: 'Trabajo especializado en motores' },
      {
        src: img5,
        alt: 'Sistema de transmisión',
        caption: 'Reparación de transmisión automática',
      },
      { src: img6, alt: 'Taller mecánico', caption: 'Instalaciones equipadas' },
    ],
  },
  {
    icon: 'pi-desktop',
    title: 'Diagnóstico Computarizado',
    description:
      'Análisis electrónico avanzado mediante equipos de última generación para detectar problemas con precisión.',
    fullDescription:
      'Utilizamos scanners profesionales de última generación para realizar diagnósticos precisos de todos los sistemas electrónicos de tu vehículo. Podemos leer y borrar códigos de error, analizar datos en tiempo real, realizar pruebas de actuadores y sensores, y programar módulos según sea necesario.',
    features: [
      'Scanner profesional multimarca',
      'Lectura y borrado de códigos OBD2',
      'Análisis en tiempo real de sensores',
      'Prueba de actuadores',
      'Programación de módulos',
      'Reporte detallado por escrito',
    ],
    benefits: [
      'Diagnóstico preciso y rápido',
      'Ahorro de tiempo y dinero',
      'Identificación de problemas ocultos',
      'Compatible con todas las marcas',
      'Tecnología de punta',
    ],
    images: [
      {
        src: img7,
        alt: 'Diagnóstico computarizado',
        caption: 'Scanner profesional avanzado',
      },
      { src: img8, alt: 'Análisis electrónico', caption: 'Revisión de sistemas electrónicos' },
    ],
  },
  {
    icon: 'pi-circle',
    title: 'Frenos y Suspensión',
    description:
      'Servicio especializado en sistemas de frenado y suspensión para garantizar tu seguridad en la carretera.',
    fullDescription:
      'La seguridad de tu vehículo depende en gran medida del buen funcionamiento del sistema de frenos y suspensión. Ofrecemos servicios completos de inspección, mantenimiento y reparación de estos sistemas críticos, utilizando repuestos de la más alta calidad.',
    features: [
      'Cambio de discos y pastillas de freno',
      'Revisión y recarga de sistema hidráulico',
      'Cambio de amortiguadores y resortes',
      'Reparación de bomba de frenos',
      'Cambio de terminales y rótulas',
      'Alineación y balanceo',
    ],
    benefits: [
      'Mejora la seguridad al conducir',
      'Reduce el desgaste de neumáticos',
      'Mejor control del vehículo',
      'Frenado más efectivo',
      'Mayor confort de conducción',
    ],
    images: [
      { src: img9, alt: 'Sistema de frenos', caption: 'Reparación de frenos profesional' },
      { src: img10, alt: 'Suspensión vehicular', caption: 'Servicio de suspensión completo' },
    ],
  },
  {
    icon: 'pi-sun',
    title: 'Aire Acondicionado',
    description:
      'Mantenimiento y reparación de sistemas de climatización para tu máximo confort durante todo el año.',
    fullDescription:
      'Mantén tu vehículo fresco y confortable con nuestro servicio especializado de aire acondicionado. Realizamos diagnóstico, reparación, recarga de gas refrigerante, limpieza de circuito y reparación de componentes para garantizar el máximo rendimiento de tu sistema de climatización.',
    features: [
      'Carga y recarga de gas refrigerante',
      'Limpieza profunda del circuito',
      'Reparación y cambio de compresor',
      'Cambio de filtro de habitáculo',
      'Reparación de fugas',
      'Diagnóstico electrónico del sistema',
    ],
    benefits: [
      'Mayor confort en tu viaje',
      'Aire más limpio y saludable',
      'Menor consumo de combustible',
      'Previene malos olores',
      'Funcionamiento óptimo todo el año',
    ],
  },
  {
    icon: 'pi-bolt',
    title: 'Sistema Eléctrico',
    description:
      'Diagnóstico y reparación de todos los componentes eléctricos y electrónicos de tu vehículo.',
    fullDescription:
      'Los sistemas eléctricos modernos son complejos y requieren conocimiento especializado. Nuestros técnicos están capacitados para diagnosticar y reparar cualquier problema eléctrico, desde la batería hasta sistemas de iluminación, sensores, y módulos electrónicos.',
    features: [
      'Prueba y cambio de batería',
      'Reparación de alternador',
      'Reparación de motor de arranque',
      'Sistema de iluminación completo',
      'Reparación de cableado',
      'Instalación de accesorios eléctricos',
    ],
    benefits: [
      'Diagnóstico preciso con equipos especializados',
      'Técnicos certificados en sistemas eléctricos',
      'Repuestos de calidad garantizada',
      'Prevención de daños mayores',
      'Instalaciones seguras y profesionales',
    ],
  },
]

const openServiceDialog = (service: Service) => {
  selectedService.value = service
  showServiceDialog.value = true
}

const openWhatsApp = (service: string) => {
  const message = encodeURIComponent(`Hola, necesito información sobre: ${service}`)
  window.open(`https://wa.me/573156936570?text=${message}`, '_blank')
}

const requestService = () => {
  if (selectedService.value) {
    openWhatsApp(selectedService.value.title)
    showServiceDialog.value = false
  }
}

const openImagePreview = (image: GalleryImage) => {
  previewImage.value = image
  showImagePreview.value = true
}
</script>

<style scoped lang="scss">
@use '@/styles/variables.scss' as *;

.services {
  padding: $spacing-xxxl 0;
  background: $light-gray;
  position: relative;

  @media (max-width: $breakpoint-md) {
    padding: $spacing-xxl 0;
  }

  @media (max-width: $breakpoint-sm) {
    padding: $spacing-xl 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, $border-gray, transparent);
  }
}

.section-header {
  text-align: center;
  margin-bottom: $spacing-xxl;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.section-badge {
  display: inline-block;
  background: $primary-blue;
  color: $white;
  padding: $spacing-xs $spacing-lg;
  border-radius: 50px;
  font-size: $font-size-sm;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: $spacing-md;
}

.section-title {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 800;
  color: $black;
  margin-bottom: $spacing-md;
  line-height: 1.3;
}

.section-subtitle {
  font-size: $font-size-lg;
  color: $gray;
  line-height: 1.7;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: $spacing-lg;
  margin-bottom: $spacing-xxl;

  @media (max-width: $breakpoint-md) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: $spacing-md;
    margin-bottom: $spacing-xl;
  }

  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
    gap: $spacing-md;
    margin-bottom: $spacing-lg;
  }
}

.service-card {
  height: 100%;
  transition: $transition-base;
  border: 1px solid $border-gray;
  animation: fadeInUp 0.8s ease-out;
  animation-fill-mode: both;

  @media (max-width: $breakpoint-sm) {
    &:hover {
      transform: translateY(-5px);
    }
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: $shadow-lg;
    border-color: $primary-blue;

    .service-icon {
      transform: scale(1.1) rotate(5deg);
      color: $primary-blue;
    }
  }

  :deep(.p-card-header) {
    padding: $spacing-xl $spacing-lg 0;

    @media (max-width: $breakpoint-sm) {
      padding: $spacing-lg $spacing-md 0;
    }
  }

  :deep(.p-card-body) {
    padding: $spacing-lg;

    @media (max-width: $breakpoint-sm) {
      padding: $spacing-md;
    }
  }

  :deep(.p-card-title) {
    font-size: $font-size-xl;
    font-weight: 700;
    color: $black;
    margin-bottom: $spacing-md;

    @media (max-width: $breakpoint-sm) {
      font-size: $font-size-lg;
      margin-bottom: $spacing-sm;
    }
  }

  :deep(.p-card-content) {
    padding: 0;
  }

  :deep(.p-card-footer) {
    padding: 0 $spacing-lg $spacing-lg;

    @media (max-width: $breakpoint-sm) {
      padding: 0 $spacing-md $spacing-md;
    }
  }
}

.service-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, $light-blue 0%, $white 100%);
  border-radius: $border-radius-xl;
  margin: 0 auto;

  @media (max-width: $breakpoint-sm) {
    width: 65px;
    height: 65px;
  }
}

.service-icon {
  font-size: 2.5rem;
  color: $dark-blue;
  transition: $transition-base;

  @media (max-width: $breakpoint-sm) {
    font-size: 2rem;
  }
}

.service-description {
  color: $gray;
  line-height: 1.7;
  margin-bottom: $spacing-md;
  font-size: $font-size-base;
}

.service-features {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.feature-tag {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  color: $medium-gray;
  font-size: $font-size-sm;
  font-weight: 500;

  i {
    color: $primary-blue;
    font-size: $font-size-base;
  }
}

.service-button {
  width: 100%;
  justify-content: center;
  font-weight: 600;
  display: flex !important;
  align-items: center !important;

  :deep(.p-button) {
    width: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  :deep(.p-button-label) {
    flex: 1;
  }

  &:hover {
    background: $light-blue;
  }
}

.services-cta {
  margin-top: $spacing-xl;
}

.cta-card {
  background: linear-gradient(135deg, $dark-blue 0%, $primary-blue 100%);
  border: none;
  box-shadow: $shadow-lg;

  :deep(.p-card-body) {
    padding: $spacing-xxl;

    @media (max-width: $breakpoint-md) {
      padding: $spacing-lg;
    }
  }

  :deep(.p-card-content) {
    padding: 0;
  }
}

.cta-content {
  display: flex;
  align-items: center;
  gap: $spacing-xl;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: $breakpoint-md) {
    flex-direction: column;
    text-align: center;
    gap: $spacing-lg;
  }

  @media (max-width: $breakpoint-sm) {
    gap: $spacing-md;
  }

  // Centrar el botón
  .p-button {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
}

.cta-icon {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: $breakpoint-sm) {
    width: 65px;
    height: 65px;
  }

  i {
    font-size: 2.5rem;
    color: $white;
    animation: pulse 2s ease-in-out infinite;

    @media (max-width: $breakpoint-sm) {
      font-size: 2rem;
    }
  }
}

.cta-text {
  flex: 1;
  color: $white;

  h3 {
    font-size: $font-size-2xl;
    font-weight: 700;
    margin-bottom: $spacing-sm;

    @media (max-width: $breakpoint-sm) {
      font-size: $font-size-xl;
      margin-bottom: $spacing-xs;
    }
  }

  p {
    font-size: $font-size-lg;
    opacity: 0.95;

    @media (max-width: $breakpoint-sm) {
      font-size: $font-size-base;
    }
  }
}

@media (max-width: $breakpoint-sm) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}

// Service Dialog Styles
.service-dialog {
  :deep(.p-dialog-content) {
    padding: 0 !important;
  }
}

.service-detail {
  &-header {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;
    padding: $spacing-xl;
    background: $light-blue;

    @media (max-width: $breakpoint-sm) {
      padding: $spacing-md;
      gap: $spacing-md;
    }
  }

  &-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, $primary-blue, $dark-blue);
    border-radius: $border-radius-xl;
    margin: 0 auto;

    @media (max-width: $breakpoint-sm) {
      width: 65px;
      height: 65px;
    }

    i {
      font-size: 2.5rem;
      color: $white;

      @media (max-width: $breakpoint-sm) {
        font-size: 2rem;
      }
    }
  }

  &-description {
    font-size: $font-size-lg;
    color: $gray;
    line-height: 1.8;
    text-align: center;

    @media (max-width: $breakpoint-sm) {
      font-size: $font-size-base;
      line-height: 1.6;
    }
  }

  &-content {
    padding: $spacing-xl;

    @media (max-width: $breakpoint-sm) {
      padding: $spacing-md;
    }
  }

  &-section {
    margin-bottom: $spacing-xxl;

    @media (max-width: $breakpoint-sm) {
      margin-bottom: $spacing-lg;
    }

    &:last-child {
      margin-bottom: 0;
    }

    h3 {
      font-size: $font-size-xl;
      font-weight: 700;
      color: $black;
      margin-bottom: $spacing-lg;
      display: flex;
      align-items: center;
      gap: $spacing-sm;

      @media (max-width: $breakpoint-sm) {
        font-size: $font-size-lg;
        margin-bottom: $spacing-md;
      }

      i {
        color: $primary-blue;
        font-size: $font-size-xl;

        @media (max-width: $breakpoint-sm) {
          font-size: $font-size-lg;
        }
      }
    }
  }
}

.feature-list,
.benefit-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: $spacing-md;

  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
    gap: $spacing-sm;
  }

  li {
    display: flex;
    align-items: flex-start;
    gap: $spacing-sm;
    padding: $spacing-md;
    background: $light-gray;
    border-radius: $border-radius;
    border-left: 3px solid $primary-blue;
    transition: $transition-base;

    @media (max-width: $breakpoint-sm) {
      padding: $spacing-sm;
    }

    &:hover {
      background: $light-blue;
      transform: translateX(5px);

      @media (max-width: $breakpoint-sm) {
        transform: translateX(3px);
      }
    }

    i {
      color: $primary-blue;
      font-size: $font-size-base;
      margin-top: 2px;
      flex-shrink: 0;

      @media (max-width: $breakpoint-sm) {
        font-size: $font-size-sm;
      }
    }

    span {
      color: $medium-gray;
      font-size: $font-size-base;
      line-height: 1.6;

      @media (max-width: $breakpoint-sm) {
        font-size: $font-size-sm;
        line-height: 1.5;
      }
    }
  }
}

.service-gallery {
  margin-top: $spacing-xxl;

  h3 {
    font-size: $font-size-xl;
    font-weight: 700;
    color: $black;
    margin-bottom: $spacing-lg;
    display: flex;
    align-items: center;
    gap: $spacing-sm;

    i {
      color: $primary-blue;
      font-size: $font-size-xl;
    }
  }
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: $spacing-md;

  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
    gap: $spacing-sm;
  }
}

.gallery-item {
  position: relative;
  border-radius: $border-radius-lg;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 4/3;
  transition: $transition-base;

  &:hover {
    transform: translateY(-5px);
    box-shadow: $shadow-lg;

    .gallery-overlay {
      opacity: 1;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.gallery-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 102, 204, 0.9), rgba(0, 61, 122, 0.9));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  opacity: 0;
  transition: $transition-base;
  padding: $spacing-md;

  i {
    font-size: 2rem;
    color: $white;
  }

  p {
    color: $white;
    font-size: $font-size-sm;
    font-weight: 600;
    text-align: center;
    margin: 0;
  }
}

// Image Preview Dialog
.image-preview-dialog {
  :deep(.p-dialog) {
    max-width: 90vw !important;
    max-height: 90vh !important;
  }

  :deep(.p-dialog-content) {
    padding: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background: $black !important;
  }

  :deep(.p-dialog-header) {
    background: $black !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;

    .p-dialog-title {
      color: $white !important;
    }

    .p-dialog-header-icon,
    .p-dialog-header-close {
      color: $white !important;

      &:hover {
        background: rgba(255, 255, 255, 0.1) !important;
      }
    }
  }
}

.image-preview {
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  max-height: 80vh;
  background: $black;

  img {
    width: 100%;
    height: auto;
    max-height: 70vh;
    object-fit: contain;
    display: block;
  }

  &-caption {
    font-size: $font-size-lg;
    color: $white;
    text-align: center;
    padding: $spacing-lg;
    margin: 0;
    background: rgba(0, 0, 0, 0.8);

    @media (max-width: $breakpoint-sm) {
      font-size: $font-size-base;
      padding: $spacing-md;
    }
  }
}
</style>

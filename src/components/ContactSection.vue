<template>
  <section id="contacto" class="contact">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Contacto</span>
        <h2 class="section-title">Estamos Listos para Atenderte</h2>
        <p class="section-subtitle">
          Comunícate con nosotros y agenda tu cita. Responderemos a la brevedad.
        </p>
      </div>

      <div class="contact-grid">
        <!-- Información de contacto -->
        <div class="contact-info">
          <Card v-for="(info, index) in contactInfo" :key="index" class="info-card">
            <template #content>
              <div class="info-icon">
                <i :class="`pi ${info.icon}`"></i>
              </div>
              <h3 class="info-title">{{ info.title }}</h3>
              <p class="info-text" v-html="info.content"></p>
              <Button
                v-if="info.action"
                :label="info.actionLabel"
                :icon="info.actionIcon"
                text
                class="info-action"
                @click="info.action"
              />
            </template>
          </Card>
        </div>

        <!-- Formulario -->
        <Card class="contact-form-card">
          <template #title>
            <div class="form-header">
              <i class="pi pi-send"></i>
              <span>Envíanos un mensaje</span>
            </div>
          </template>
          <template #content>
            <form @submit.prevent="handleSubmit" class="contact-form">
              <div class="form-row">
                <div class="form-field">
                  <label for="name">Nombre completo *</label>
                  <InputText
                    id="name"
                    v-model="formData.name"
                    placeholder="Juan Pérez"
                    :class="{ 'p-invalid': submitted && !formData.name }"
                  />
                  <small v-if="submitted && !formData.name" class="p-error">
                    El nombre es requerido
                  </small>
                </div>

                <div class="form-field">
                  <label for="phone">Teléfono *</label>
                  <InputText
                    id="phone"
                    v-model="formData.phone"
                    placeholder="+54 9 11 1234-5678"
                    :class="{ 'p-invalid': submitted && !formData.phone }"
                  />
                  <small v-if="submitted && !formData.phone" class="p-error">
                    El teléfono es requerido
                  </small>
                </div>
              </div>

              <div class="form-field">
                <label for="email">Email *</label>
                <InputText
                  id="email"
                  v-model="formData.email"
                  type="email"
                  placeholder="juan@ejemplo.com"
                  :class="{ 'p-invalid': submitted && !formData.email }"
                />
                <small v-if="submitted && !formData.email" class="p-error">
                  El email es requerido
                </small>
              </div>

              <div class="form-field">
                <label for="service">Servicio de interés</label>
                <select id="service" v-model="formData.service" class="p-inputtext">
                  <option value="">Selecciona un servicio</option>
                  <option v-for="service in services" :key="service" :value="service">
                    {{ service }}
                  </option>
                </select>
              </div>

              <div class="form-field">
                <label for="message">Mensaje *</label>
                <Textarea
                  id="message"
                  v-model="formData.message"
                  rows="5"
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  :class="{ 'p-invalid': submitted && !formData.message }"
                />
                <small v-if="submitted && !formData.message" class="p-error">
                  El mensaje es requerido
                </small>
              </div>

              <div class="form-field-checkbox">
                <input
                  type="checkbox"
                  id="acceptPrivacy"
                  v-model="formData.acceptPrivacy"
                  class="privacy-checkbox"
                  :class="{ 'checkbox-invalid': submitted && !formData.acceptPrivacy }"
                />
                <label for="acceptPrivacy" class="privacy-label">
                  He leído y acepto la
                  <a href="#" @click.prevent="openPrivacyPolicy" class="privacy-link">
                    Política de Privacidad y Tratamiento de Datos Personales
                  </a>
                  *
                </label>
              </div>
              <small v-if="submitted && !formData.acceptPrivacy" class="p-error checkbox-error">
                Debes aceptar la política de privacidad para continuar
              </small>

              <Button
                type="submit"
                label="Enviar Mensaje"
                icon="pi pi-send"
                size="large"
                class="submit-button"
                :loading="loading"
              />

              <div class="form-footer">
                <i class="pi pi-info-circle"></i>
                <span>Tus datos están protegidos y no serán compartidos</span>
              </div>
            </form>
          </template>
        </Card>
      </div>

      <!-- Mapa placeholder -->
      <Card class="map-card">
        <template #content>
          <div class="map-container">
            <iframe
              src="https://www.google.com/maps?q=4.435093,-75.228863&hl=es&z=18&output=embed"
              width="100%"
              height="400"
              style="border: 0; border-radius: 12px"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            <div class="map-overlay">
              <p>
                <i class="pi pi-map-marker"></i> Calle 26 número 2-58, San Pedro Alejandrino, Ibagué
              </p>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- Privacy Policy Dialog -->
    <PrivacyPolicy v-model="showPrivacyDialog" @accept="handlePrivacyAccept" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import PrivacyPolicy from './PrivacyPolicy.vue'

const formData = ref({
  name: '',
  phone: '',
  email: '',
  service: '',
  message: '',
  acceptPrivacy: false,
})

const submitted = ref(false)
const loading = ref(false)
const showPrivacyDialog = ref(false)

const services = [
  'Mantenimiento Preventivo',
  'Mecánica General',
  'Diagnóstico Computarizado',
  'Frenos y Suspensión',
  'Aire Acondicionado',
  'Sistema Eléctrico',
  'Otro',
]

const contactInfo = [
  {
    icon: 'pi-map-marker',
    title: 'Ubicación',
    content: 'Calle 26 número 2-58<br>San Pedro Alejandrino<br>Ibagué, Colombia',
    actionLabel: 'Ver en mapa',
    actionIcon: 'pi pi-external-link',
    action: () => {
      window.open(
        'https://www.google.com/maps/place/4%C2%B026%2706.3%22N+75%C2%B013%2743.9%22W/@4.4350929,-75.2288633,19z/data=!3m1!4b1!4m4!3m3!8m2!3d4.4350929!4d-75.2288633?hl=es&entry=ttu',
        '_blank',
      )
    },
  },
  {
    icon: 'pi-phone',
    title: 'Teléfono',
    content: '+57 315 693 6570<br>Lun - Vie: 8:00 - 18:00<br>Sáb: 9:00 - 13:00',
    actionLabel: 'Llamar ahora',
    actionIcon: 'pi pi-phone',
    action: () => {
      window.location.href = 'tel:+573156936570'
    },
  },
  {
    icon: 'pi-whatsapp',
    title: 'WhatsApp',
    content: '+57 315 693 6570<br>Respuesta rápida<br>7 días a la semana',
    actionLabel: 'Chatear',
    actionIcon: 'pi pi-whatsapp',
    action: () => {
      window.open('https://wa.me/573156936570?text=Hola,%20necesito%20información', '_blank')
    },
  },
  {
    icon: 'pi-user',
    title: 'Propietario',
    content: 'Alejandro Botero<br>Mecánico profesional<br>Más de 15 años de experiencia',
    actionLabel: 'Contactar',
    actionIcon: 'pi pi-whatsapp',
    action: () => {
      window.open(
        'https://wa.me/573156936570?text=Hola%20Alejandro,%20necesito%20información',
        '_blank',
      )
    },
  },
]

const handleSubmit = () => {
  submitted.value = true

  if (
    !formData.value.name ||
    !formData.value.phone ||
    !formData.value.email ||
    !formData.value.message ||
    !formData.value.acceptPrivacy
  ) {
    return
  }

  loading.value = true

  // Enviar por WhatsApp
  setTimeout(() => {
    const message = encodeURIComponent(
      `Nuevo contacto:\n\nNombre: ${formData.value.name}\nTeléfono: ${formData.value.phone}\nEmail: ${formData.value.email}\nServicio: ${formData.value.service || 'No especificado'}\n\nMensaje:\n${formData.value.message}`,
    )
    window.open(`https://wa.me/573156936570?text=${message}`, '_blank')

    // Reset form
    formData.value = {
      name: '',
      phone: '',
      email: '',
      service: '',
      message: '',
      acceptPrivacy: false,
    }
    submitted.value = false
    loading.value = false
  }, 1000)
}

const openPrivacyPolicy = () => {
  showPrivacyDialog.value = true
}

const handlePrivacyAccept = () => {
  formData.value.acceptPrivacy = true
}
</script>

<style scoped lang="scss">
@use '@/styles/variables.scss' as *;

.contact {
  padding: $spacing-xxxl 0;
  background: $light-gray;

  @media (max-width: $breakpoint-md) {
    padding: $spacing-xxl 0;
  }

  @media (max-width: $breakpoint-sm) {
    padding: $spacing-xl 0;
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

.contact-grid {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: $spacing-xl;
  margin-bottom: $spacing-xl;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: $breakpoint-lg) {
    grid-template-columns: 1fr;
    gap: $spacing-lg;
  }

  @media (max-width: $breakpoint-sm) {
    gap: $spacing-md;
  }
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;

  @media (max-width: $breakpoint-sm) {
    gap: $spacing-sm;
  }
}

.info-card {
  text-align: center;
  transition: $transition-base;
  border: 1px solid $border-gray;

  @media (max-width: $breakpoint-sm) {
    &:hover {
      transform: translateY(-2px);
    }
  }

  &:hover {
    box-shadow: $shadow-md;
    border-color: $primary-blue;

    .info-icon {
      background: $primary-blue;

      i {
        color: $white;
        transform: scale(1.1);
      }
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

.info-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: $light-blue;
  border-radius: 50%;
  margin-bottom: $spacing-md;
  transition: $transition-base;

  @media (max-width: $breakpoint-sm) {
    width: 55px;
    height: 55px;
    margin-bottom: $spacing-sm;
  }

  i {
    font-size: $font-size-2xl;
    color: $primary-blue;
    transition: $transition-base;

    @media (max-width: $breakpoint-sm) {
      font-size: $font-size-xl;
    }
  }
}

.info-title {
  font-size: $font-size-xl;
  font-weight: 700;
  color: $black;
  margin-bottom: $spacing-sm;

  @media (max-width: $breakpoint-sm) {
    font-size: $font-size-lg;
  }
}

.info-text {
  color: $gray;
  line-height: 1.7;
  margin-bottom: $spacing-md;

  @media (max-width: $breakpoint-sm) {
    font-size: $font-size-sm;
    line-height: 1.6;
    margin-bottom: $spacing-sm;
  }
}

.info-action {
  font-weight: 800;
  transition:
    background-color 0.3s ease,
    color 0.3s ease !important;
  padding: 0.75rem 1.5rem !important;
  box-sizing: border-box !important;

  &.p-button {
    width: 100% !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 0.5rem !important;
    transform: none !important;
    padding: 0.75rem 1.5rem !important;
    box-sizing: border-box !important;
  }

  // Mantener el icono y texto como unidad sin permitir que se separen
  :deep(.p-button-icon) {
    margin: 0 !important;
    flex-shrink: 0 !important;
    width: 1rem !important;
  }

  :deep(.p-button-label) {
    flex-shrink: 0 !important;
    white-space: nowrap !important;
  }

  &:hover {
    background: $light-blue !important;
    color: $primary-blue !important;
    transform: none !important;
    padding: 0.75rem 1.5rem !important;
    width: 100% !important;
  }

  &:active {
    background: $primary-blue !important;
    color: $white !important;
    transform: scale(0.98) !important;
  }

  &:focus {
    transform: none !important;
  }
}

.contact-form-card {
  border: 1px solid $border-gray;
  max-width: 650px;
  align-self: flex-start;

  @media (max-width: $breakpoint-lg) {
    max-width: 100%;
  }

  :deep(.p-card-title) {
    padding: $spacing-lg $spacing-xl $spacing-sm;
    font-size: $font-size-xl;

    @media (max-width: $breakpoint-sm) {
      padding: $spacing-md $spacing-md $spacing-sm;
      font-size: $font-size-lg;
    }
  }

  :deep(.p-card-body) {
    padding: 0;
  }

  :deep(.p-card-content) {
    padding: 0 $spacing-xl $spacing-lg;

    @media (max-width: $breakpoint-sm) {
      padding: 0 $spacing-md $spacing-md;
    }
  }
}

.form-header {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  color: $black;

  i {
    font-size: $font-size-xl;
    color: $primary-blue;

    @media (max-width: $breakpoint-sm) {
      font-size: $font-size-lg;
    }
  }

  span {
    font-weight: 700;
    font-size: $font-size-xl;

    @media (max-width: $breakpoint-sm) {
      font-size: $font-size-lg;
    }
  }
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;

  @media (max-width: $breakpoint-sm) {
    gap: $spacing-sm;
  }
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-md;

  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
  }
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;

  label {
    font-weight: 600;
    color: $black;
    font-size: $font-size-base;

    @media (max-width: $breakpoint-sm) {
      font-size: $font-size-sm;
    }
  }

  small.p-error {
    color: #ef4444;
    font-size: $font-size-sm;

    @media (max-width: $breakpoint-sm) {
      font-size: 0.75rem;
    }
  }
}

.form-field-checkbox {
  display: flex;
  align-items: flex-start;
  gap: $spacing-sm;
  margin: $spacing-sm 0;
}

.privacy-checkbox {
  margin-top: 4px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: $primary-blue;
  flex-shrink: 0;

  &.checkbox-invalid {
    outline: 2px solid #ef4444;
    outline-offset: 2px;
  }
}

.privacy-label {
  font-size: $font-size-sm;
  color: $gray;
  line-height: 1.5;
  cursor: pointer;
  user-select: none;
}

.privacy-link {
  color: $primary-blue;
  text-decoration: underline;
  font-weight: 600;

  &:hover {
    color: $dark-blue;
  }
}

.checkbox-error {
  display: block;
  margin-top: -$spacing-xs;
  margin-bottom: $spacing-sm;
}

.w-full {
  width: 100%;
}

.submit-button {
  width: 100%;
  padding: $spacing-md;
  font-weight: 700;
  font-size: $font-size-lg;

  @media (max-width: $breakpoint-sm) {
    padding: $spacing-sm;
    font-size: $font-size-base;
  }
}

.form-footer {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  color: $gray;
  font-size: $font-size-sm;
  padding: $spacing-md;
  background: $light-gray;
  border-radius: $border-radius;

  i {
    color: $primary-blue;
  }
}

.map-card {
  margin-top: $spacing-xl;
  border: 1px solid $border-gray;

  :deep(.p-card-body) {
    padding: 0;
  }

  :deep(.p-card-content) {
    padding: 0;
  }
}

.map-container {
  position: relative;
  width: 100%;
}

.map-overlay {
  position: absolute;
  bottom: $spacing-lg;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: $spacing-md $spacing-xl;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-lg;

  p {
    margin: 0;
    font-weight: 600;
    color: $black;
    display: flex;
    align-items: center;
    gap: $spacing-sm;

    i {
      color: $primary-blue;
      font-size: $font-size-lg;
    }
  }

  @media (max-width: $breakpoint-sm) {
    width: 90%;
    font-size: $font-size-sm;
  }
}

.map-placeholder {
  text-align: center;
  color: $gray;

  i {
    font-size: 5rem;
    color: $border-gray;
    margin-bottom: $spacing-lg;
  }

  p {
    font-size: $font-size-2xl;
    font-weight: 700;
    margin-bottom: $spacing-sm;
  }

  span {
    font-size: $font-size-lg;
  }
}
</style>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Política de Privacidad y Tratamiento de Datos Personales"
    :style="{ width: '90vw', maxWidth: '800px' }"
    :breakpoints="{ '960px': '90vw', '640px': '95vw' }"
    :dismissableMask="true"
    :closable="true"
  >
    <div class="privacy-content">
      <p class="intro">
        En <strong>B&B Automotriz</strong>, respetamos tu privacidad y estamos comprometidos con la
        protección de tus datos personales de acuerdo con la legislación colombiana vigente.
      </p>

      <h3>Marco Legal</h3>
      <p>
        Esta política se rige por la <strong>Ley 1581 de 2012</strong> (Ley de Protección de Datos
        Personales) y el <strong>Decreto 1377 de 2013</strong>, que regulan el tratamiento de datos
        personales en Colombia.
      </p>

      <h3>Responsable del Tratamiento</h3>
      <p>
        <strong>B&B Automotriz</strong><br />
        Propietario: Alejandro Botero<br />
        Dirección: Calle 26 número 2-58, San Pedro Alejandrino, Ibagué<br />
        Teléfono: +57 315 693 6570
      </p>

      <h3>Datos Recopilados</h3>
      <p>Recopilamos los siguientes datos personales:</p>
      <ul>
        <li>Nombre completo</li>
        <li>Número de teléfono</li>
        <li>Correo electrónico</li>
        <li>Información del servicio solicitado</li>
        <li>Mensajes y comunicaciones</li>
      </ul>

      <h3>Finalidad del Tratamiento</h3>
      <p>Los datos serán utilizados para:</p>
      <ul>
        <li>Responder a solicitudes de información y cotizaciones</li>
        <li>Prestar servicios de mecánica automotriz</li>
        <li>Realizar seguimiento de servicios contratados</li>
        <li>Enviar información sobre promociones y servicios (con tu consentimiento)</li>
        <li>Cumplir obligaciones legales y contractuales</li>
      </ul>

      <h3>Derechos del Titular</h3>
      <p>Conforme a la Ley 1581 de 2012, tienes derecho a:</p>
      <ul>
        <li><strong>Conocer, actualizar y rectificar</strong> tus datos personales</li>
        <li><strong>Solicitar prueba</strong> de la autorización otorgada</li>
        <li><strong>Ser informado</strong> sobre el uso que se ha dado a tus datos personales</li>
        <li><strong>Presentar quejas</strong> ante la Superintendencia de Industria y Comercio</li>
        <li><strong>Revocar la autorización</strong> y solicitar la supresión de datos</li>
        <li>
          <strong>Acceder de forma gratuita</strong> a tus datos que hayan sido objeto de
          tratamiento
        </li>
      </ul>

      <h3>Seguridad de los Datos</h3>
      <p>
        Implementamos medidas técnicas, humanas y administrativas necesarias para otorgar seguridad
        a los datos personales y evitar su adulteración, pérdida, consulta, uso o acceso no
        autorizado o fraudulento.
      </p>

      <h3>Vigencia</h3>
      <p>
        Los datos personales serán almacenados durante el tiempo necesario para cumplir con las
        finalidades descritas o hasta que el titular solicite su eliminación, siempre que no exista
        una obligación legal de conservarlos.
      </p>

      <h3>Contacto</h3>
      <p>
        Para ejercer tus derechos o presentar consultas sobre esta política, puedes contactarnos:
      </p>
      <ul>
        <li>WhatsApp: +57 315 693 6570</li>
        <li>Dirección: Calle 26 número 2-58, San Pedro Alejandrino, Ibagué</li>
      </ul>

      <p class="footer-note"><strong>Última actualización:</strong> Octubre 2024</p>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <Button label="Cerrar" @click="closeDialog" severity="secondary" />
        <Button
          label="Acepto y Entiendo"
          @click="acceptAndClose"
          icon="pi pi-check"
          severity="primary"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  accept: []
}>()

const visible = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    visible.value = newValue
  },
)

watch(visible, (newValue) => {
  emit('update:modelValue', newValue)
})

const closeDialog = () => {
  visible.value = false
}

const acceptAndClose = () => {
  emit('accept')
  visible.value = false
}
</script>

<style scoped lang="scss">
@use '@/styles/variables.scss' as *;

:deep(.p-dialog) {
  .p-dialog-content {
    background: $white;
  }
}

.privacy-content {
  font-size: $font-size-base;
  line-height: 1.8;
  color: $medium-gray;
  background: $white;

  .intro {
    font-size: $font-size-lg;
    margin-bottom: $spacing-xl;
    padding: $spacing-lg;
    background: $light-blue;
    border-left: 4px solid $primary-blue;
    border-radius: $border-radius;
    color: $black;
    font-weight: 500;
  }

  h3 {
    color: $primary-blue;
    font-size: $font-size-2xl;
    font-weight: 700;
    margin-top: $spacing-xl;
    margin-bottom: $spacing-md;
    padding-bottom: $spacing-sm;
    border-bottom: 2px solid $light-blue;

    &:first-of-type {
      margin-top: 0;
    }
  }

  p {
    margin-bottom: $spacing-md;
    color: $gray;
  }

  ul {
    margin-bottom: $spacing-lg;
    padding-left: $spacing-xl;

    li {
      margin-bottom: $spacing-sm;
      color: $gray;
      position: relative;
      padding-left: $spacing-sm;

      &::before {
        content: '•';
        position: absolute;
        left: -$spacing-md;
        color: $primary-blue;
        font-weight: bold;
        font-size: $font-size-xl;
      }
    }
  }

  strong {
    color: $black;
    font-weight: 700;
  }

  .footer-note {
    margin-top: $spacing-xxl;
    padding: $spacing-lg;
    background: $light-gray;
    border-radius: $border-radius;
    font-size: $font-size-sm;
    color: $medium-gray;
    text-align: center;
    border: 1px solid $border-gray;
  }
}

.dialog-footer {
  display: flex;
  gap: $spacing-md;
  justify-content: flex-end;

  :deep(.p-button) {
    min-width: 120px;
    width: auto !important;
    flex-shrink: 0;
  }

  @media (max-width: 640px) {
    flex-direction: column;

    :deep(.p-button) {
      width: 100% !important;
      min-width: auto;
    }
  }
}
</style>

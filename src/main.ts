import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'

// PrimeIcons
import 'primeicons/primeicons.css'
// Estilos globales
import './styles/global.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  ripple: false, // Desactivar ripple effect completamente
})

app.mount('#app')

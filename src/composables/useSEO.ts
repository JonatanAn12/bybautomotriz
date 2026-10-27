import { onMounted, watch } from 'vue'
import type { Ref } from 'vue'

interface SEOConfig {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  ogType?: string
  canonical?: string
}

export function useSEO(config: SEOConfig | Ref<SEOConfig>) {
  const updateMeta = (seoConfig: SEOConfig) => {
    // Update title
    document.title = seoConfig.title

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name'
      let element = document.querySelector(`meta[${attribute}="${name}"]`)

      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }

      element.setAttribute('content', content)
    }

    // Primary meta tags
    updateMetaTag('description', seoConfig.description)
    updateMetaTag('title', seoConfig.title)

    if (seoConfig.keywords) {
      updateMetaTag('keywords', seoConfig.keywords)
    }

    // Open Graph tags
    updateMetaTag('og:title', seoConfig.title, true)
    updateMetaTag('og:description', seoConfig.description, true)
    updateMetaTag('og:type', seoConfig.ogType || 'website', true)

    if (seoConfig.ogImage) {
      updateMetaTag('og:image', seoConfig.ogImage, true)
    }

    // Twitter tags
    updateMetaTag('twitter:title', seoConfig.title, true)
    updateMetaTag('twitter:description', seoConfig.description, true)

    if (seoConfig.ogImage) {
      updateMetaTag('twitter:image', seoConfig.ogImage, true)
    }

    // Canonical URL
    if (seoConfig.canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement

      if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
      }

      link.href = seoConfig.canonical
    }
  }

  onMounted(() => {
    const seoConfig = 'value' in config ? config.value : config
    updateMeta(seoConfig)
  })

  // Watch for changes if config is a ref
  if ('value' in config) {
    watch(
      () => config.value,
      (newConfig) => {
        updateMeta(newConfig)
      },
      { deep: true },
    )
  }

  return {
    updateSEO: updateMeta,
  }
}

// Predefined SEO configurations
export const seoConfigs = {
  home: {
    title: 'B&B Automotriz - Taller Mecánico Profesional en Ibagué | Mantenimiento y Reparación',
    description:
      'Taller mecánico profesional en Ibagué con más de 15 años de experiencia. Especialistas en diagnóstico computarizado, mantenimiento preventivo, frenos, suspensión y aire acondicionado.',
    keywords:
      'taller mecánico Ibagué, mecánica automotriz Ibagué, reparación de autos, mantenimiento vehicular, diagnóstico automotriz, B&B Automotriz',
    ogType: 'website',
    canonical: 'https://bybautomotriz.com/',
  },
  servicios: {
    title: 'Servicios Automotrices Profesionales | B&B Automotriz Ibagué',
    description:
      'Ofrecemos mantenimiento preventivo, diagnóstico computarizado, reparación de frenos, suspensión, aire acondicionado y sistema eléctrico. Más de 15 años de experiencia.',
    keywords:
      'servicios automotrices Ibagué, mantenimiento preventivo, diagnóstico computarizado, reparación de frenos, aire acondicionado automotriz',
    canonical: 'https://bybautomotriz.com/#servicios',
  },
  contacto: {
    title: 'Contacto - B&B Automotriz | Agenda tu Cita en Ibagué',
    description:
      'Contáctanos para agendar tu cita. Ubicados en San Pedro Alejandrino, Ibagué. Teléfono: +57 315 693 6570. Horario: Lun-Vie 8:00-18:00, Sáb 9:00-13:00.',
    keywords: 'contacto taller mecánico Ibagué, agendar cita mecánico, San Pedro Alejandrino',
    canonical: 'https://bybautomotriz.com/#contacto',
  },
  nosotros: {
    title: 'Sobre Nosotros - B&B Automotriz | Experiencia y Confianza',
    description:
      'Conoce a B&B Automotriz, tu taller de confianza en Ibagué. Más de 15 años de experiencia, tecnología de punta y atención personalizada por Alejandro Botero.',
    keywords: 'taller mecánico confiable Ibagué, Alejandro Botero mecánico, experiencia automotriz',
    canonical: 'https://bybautomotriz.com/#nosotros',
  },
}

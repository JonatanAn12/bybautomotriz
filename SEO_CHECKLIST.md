# 📊 SEO Checklist - B&B Automotriz

## ✅ Implementaciones Completadas

### 1. Meta Tags y HTML Semántico

- ✅ Title tag optimizado (< 60 caracteres)
- ✅ Meta description optimizada (< 160 caracteres)
- ✅ Meta keywords relevantes para búsquedas locales
- ✅ Open Graph tags para redes sociales (Facebook, WhatsApp)
- ✅ Twitter Cards para compartir en Twitter
- ✅ Canonical URLs para evitar contenido duplicado
- ✅ Idioma configurado (es-CO)
- ✅ HTML5 semántico (main, nav, section, article, footer)

### 2. Schema.org / Structured Data

- ✅ AutomotiveBusiness schema
- ✅ LocalBusiness schema
- ✅ Service schema con catálogo de servicios
- ✅ BreadcrumbList schema
- ✅ OpeningHours schema
- ✅ GeoCoordinates y dirección completa
- ✅ AggregateRating schema
- ✅ ContactPoint schema

### 3. SEO Local

- ✅ Geo tags (región, ubicación, coordenadas)
- ✅ Dirección completa en múltiples formatos
- ✅ Teléfono en formato internacional (+57)
- ✅ Horarios de atención
- ✅ Mapa de Google integrado
- ✅ Keywords locales: "Ibagué", "Tolima", "San Pedro Alejandrino"

### 4. Archivos de Configuración

- ✅ robots.txt creado
- ✅ sitemap.xml creado
- ✅ manifest.json para PWA
- ✅ .htaccess con optimizaciones

### 5. Performance y Optimización

- ✅ Preconnect para recursos externos
- ✅ DNS prefetch para Google y WhatsApp
- ✅ Compresión GZIP (en .htaccess)
- ✅ Browser caching configurado
- ✅ Lazy loading de imágenes (nativo HTML)

### 6. Accesibilidad y UX

- ✅ Skip link para accesibilidad
- ✅ Alt text en imágenes
- ✅ Roles ARIA (main, navigation, etc.)
- ✅ Contraste de colores adecuado
- ✅ Responsive design

---

## 🚀 Pasos a Seguir DESPUÉS del Deployment

### 1. Actualizar URLs en index.html

Reemplazar `https://bybautomotriz.com/` con tu dominio real en:

- Meta tags (og:url, twitter:url)
- Schema.org (url, @id)
- Canonical link
- Sitemap.xml

### 2. Crear Imagen Open Graph

Crear una imagen `og-image.jpg` de **1200x630px** con:

- Logo de B&B Automotriz
- Texto: "Taller Mecánico Profesional"
- Ubicación: "Ibagué, Tolima"
- Teléfono: +57 315 693 6570

Subir en: `/public/og-image.jpg`

### 3. Google Search Console

1. Ir a https://search.google.com/search-console
2. Agregar tu dominio
3. Verificar propiedad (método HTML tag o DNS)
4. Enviar sitemap: `https://tudominio.com/sitemap.xml`
5. Solicitar indexación de la página principal

### 4. Google My Business

1. Crear perfil en https://business.google.com
2. Información:
   - Nombre: B&B Automotriz
   - Categoría: Taller de reparación de automóviles
   - Dirección: Calle 26 número 2-58, San Pedro Alejandrino, Ibagué, Tolima
   - Teléfono: +57 315 693 6570
   - Coordenadas: 4.435093, -75.228863
3. Agregar fotos del taller
4. Horarios: Lun-Vie 8:00-18:00, Sáb 9:00-13:00
5. Verificar negocio (por correo o teléfono)

### 5. Bing Webmaster Tools

1. Ir a https://www.bing.com/webmasters
2. Agregar y verificar sitio
3. Enviar sitemap

### 6. SSL/HTTPS

- **OBLIGATORIO**: Configurar certificado SSL
- Descomentar las líneas de forzar HTTPS en `.htaccess`
- Verificar que todas las URLs usen https://

### 7. Optimizar Imágenes

Antes de producción:

```bash
# Comprimir todas las imágenes
npm install -g sharp-cli
sharp -i "src/img/*.jpeg" -o "src/img/optimized/" -f webp
```

### 8. Velocidad de Carga

Testear en:

- Google PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/
- Objetivo: Score > 90/100

### 9. Analytics (Opcional pero Recomendado)

```html
<!-- Agregar en index.html antes de </head> -->
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || []
  function gtag() {
    dataLayer.push(arguments)
  }
  gtag('js', new Date())
  gtag('config', 'G-XXXXXXXXXX')
</script>
```

### 10. Redes Sociales

- Crear página de Facebook Business
- Crear perfil de Instagram
- Agregar links en `sameAs` del schema (index.html, línea ~120)

---

## 🔍 Keywords Principales

### Keywords de Alta Prioridad:

1. taller mecánico Ibagué
2. mecánica automotriz Ibagué
3. reparación de autos Ibagué
4. mantenimiento vehicular Ibagué
5. diagnóstico automotriz Ibagué

### Keywords de Servicio:

- frenos y suspensión Ibagué
- aire acondicionado automotriz Ibagué
- sistema eléctrico automotriz
- mecánico San Pedro Alejandrino
- taller mecánico cerca de mí

### Keywords Long-Tail:

- mejor taller mecánico en Ibagué
- taller mecánico confiable Ibagué
- mecánico profesional Tolima
- dónde reparar mi carro en Ibagué

---

## 📱 Pruebas de Validación

### Antes de Publicar:

- [ ] Validar HTML: https://validator.w3.org/
- [ ] Validar Schema: https://validator.schema.org/
- [ ] Probar robots.txt: https://support.google.com/webmasters/answer/6062598
- [ ] Probar Open Graph: https://www.opengraph.xyz/
- [ ] Probar Twitter Cards: https://cards-dev.twitter.com/validator
- [ ] Probar responsive: https://responsivedesignchecker.com/
- [ ] Probar velocidad: https://pagespeed.web.dev/

---

## 📈 Monitoreo Continuo

### Mensual:

- Revisar posición en Google Search Console
- Verificar errores de indexación
- Analizar keywords con mejor rendimiento
- Actualizar contenido si es necesario

### Trimestral:

- Solicitar reviews en Google My Business
- Actualizar fotos del taller
- Agregar posts en Google My Business
- Revisar y actualizar keywords

---

## 🎯 Objetivos SEO

### Corto Plazo (1-3 meses):

- Aparecer en Google Maps para "taller mecánico Ibagué"
- Indexación completa en Google
- Aparecer en primeras 3 páginas para keywords principales

### Mediano Plazo (3-6 meses):

- Top 10 en Google para "taller mecánico Ibagué"
- 10+ reviews en Google My Business
- 100+ visitantes orgánicos mensuales

### Largo Plazo (6-12 meses):

- Top 3 en Google para keywords principales
- 30+ reviews con rating 4.5+
- 300+ visitantes orgánicos mensuales
- Aparecer en panel de conocimiento de Google

---

## 📞 Contacto de Soporte SEO

Si necesitas ayuda con el SEO después del deployment:

- Revisa Google Search Console para errores
- Verifica que todas las URLs sean correctas
- Asegúrate de que el sitio esté indexado: `site:tudominio.com` en Google

**¡Mucho éxito con B&B Automotriz!** 🚗💪

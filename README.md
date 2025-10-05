# 🎂 Cumpleaños de Santiago Saud - 10 Años

Sitio web para el cumpleaños número 10 de Santiago Saud, con información sobre el evento en Escapology (Escape Room) y formulario de confirmación de asistencia.

## ✨ Características

- 🎨 Diseño responsivo con TailwindCSS 4
- 🎬 Animaciones CSS personalizadas
- 🔐 Temática de Escape Room
- 📝 Formulario de confirmación con Supabase
- 🌐 SEO optimizado para compartir en WhatsApp
- 📱 100% responsive (móvil, tablet, desktop)

## 🚀 Estructura del Proyecto

```text
/
├── public/
│   ├── favicon.svg          # Favicon personalizado
│   ├── og-image.jpg         # Imagen para compartir (crear según instrucciones)
│   └── images/              # Imágenes del sitio
├── src/
│   ├── layouts/
│   │   └── Layout.astro     # Layout base con SEO
│   ├── pages/
│   │   ├── index.astro      # Página de bienvenida
│   │   ├── actividades.astro # Programa del día
│   │   ├── confirmar.astro  # Formulario de confirmación
│   │   └── api/
│   │       └── confirmar.ts # API endpoint para Supabase
│   ├── lib/
│   │   └── supabase.ts      # Cliente de Supabase
│   └── styles/
│       └── globals.css      # Estilos globales
├── .env.example             # Ejemplo de variables de entorno
├── SETUP.md                 # Instrucciones de configuración detalladas
└── package.json
```

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando           | Acción                                              |
| :---------------- | :-------------------------------------------------- |
| `npm install`     | Instala las dependencias                            |
| `npm run dev`     | Inicia servidor de desarrollo en `localhost:4321`   |
| `npm run build`   | Construye el sitio para producción en `./dist/`     |
| `npm run preview` | Previsualiza el build de producción localmente      |

## ⚙️ Configuración Inicial

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Supabase

Lee las instrucciones detalladas en [SETUP.md](./SETUP.md) para:
- Crear tu proyecto en Supabase
- Configurar la base de datos
- Obtener las credenciales
- Configurar las variables de entorno

### 3. Variables de entorno

```bash
# Copia el archivo de ejemplo
cp .env.example .env

# Edita .env con tus credenciales de Supabase
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

Visita `http://localhost:4321` para ver el sitio.

## 📋 Pendientes antes del despliegue

- [ ] Configurar Supabase (ver SETUP.md)
- [ ] Crear imagen OG `public/og-image.jpg` (ver public/OG-IMAGE-INSTRUCTIONS.md)
- [ ] Configurar `site` URL en `astro.config.mjs`
- [ ] Probar el formulario de confirmación
- [ ] Verificar preview en WhatsApp

## 🚀 Despliegue

El sitio puede desplegarse en:

- **Vercel** (recomendado) - [vercel.com](https://vercel.com)
- **Netlify** - [netlify.com](https://netlify.com)
- **Cloudflare Pages** - [pages.cloudflare.com](https://pages.cloudflare.com)

No olvides configurar las variables de entorno en la plataforma de despliegue.

## 📄 Páginas

- `/` - Página de bienvenida con información del cumpleaños
- `/actividades` - Programa detallado del día
- `/confirmar` - Formulario de confirmación de asistencia

## 🎨 Tecnologías

- [Astro](https://astro.build) - Framework web
- [Tailwind CSS 4](https://tailwindcss.com) - Estilos
- [Supabase](https://supabase.com) - Base de datos para confirmaciones
- CSS Animations - Animaciones personalizadas

## 📞 Información del Evento

- **Fecha**: 19 de Octubre, 2025
- **Hora**: 16:00 - 19:00
- **Lugar**: Escapology, Parque Araucano
- **Dirección**: Presidente Riesco 5330, Las Condes
- **Actividades**:
  - Escape Rooms (Los Mineros + Bajo Presión)
  - Picnic con pizzas en el parque

## 📝 Licencia

Este es un proyecto personal para el cumpleaños de Santiago Saud.

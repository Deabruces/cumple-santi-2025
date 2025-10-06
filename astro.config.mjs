import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Configura tu URL de producción aquí para que los metadatos OG funcionen correctamente
  // Ejemplo: site: 'https://cumple-santiago.vercel.app'
  // site: 'https://tu-sitio.com',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
});
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // Configura tu URL de producción aquí para que los metadatos OG funcionen correctamente
  // Ejemplo: site: 'https://cumple-santiago.vercel.app'
  // site: 'https://tu-sitio.com',
  site: 'https://cumple-santi-2025.deannybruces.com',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
  adapter: vercel({
    edgeMiddleware: true,
  }),
});

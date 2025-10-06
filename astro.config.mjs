import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
	// Configura tu URL de producción aquí para que los metadatos OG funcionen correctamente
	// Ejemplo: site: 'https://cumple-santiago.vercel.app'
	// site: 'https://tu-sitio.com',
	site: "https://cumple-santi-2025.scyphora.com",
	output: "server",
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [react()],
	adapter: vercel({
		edgeMiddleware: true,
	}),
	env: {
		// Asegúrate de definir esta variable de entorno en tu entorno de producción
		schema: {
			DATABASE_URL: envField.string({
				context: "server",
				access: "secret",
			}),
			PUBLIC_SUPABASE_URL: envField.string({
				context: "server",
				access: "secret",
			}),
			PUBLIC_SUPABASE_ANON_KEY: envField.string({
				context: "server",
				access: "secret",
			}),
		},
	},
});

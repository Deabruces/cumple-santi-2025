# Contexto de Sesión - Cumpleaños Santiago Saud

## Estado Actual del Proyecto

**Fecha última actualización**: 5 de Octubre 2025
**Versión del Proyecto**: 1.0
**Framework**: Astro 5.14.1
**ORM**: Drizzle ORM con PostgreSQL (Supabase)

---

## Resumen del Proyecto

Sitio web interactivo tipo gaming/pixel para el cumpleaños número 10 de Santiago Saud, con:

- Mini-juego de RSVP con validación por código único
- Sistema de confirmación de asistencia con base de datos
- Selección de salas de Escape Room (Los Mineros / Bajo Presión)
- Diseño pixel art con colores verde neón (#00ff41)
- Fuentes: Press Start 2P (UI) y Pixelify Sans (headings)

---

## Datos del Evento

- **Fecha**: Domingo 19 de Octubre 2025
- **Hora**: 16:00 - 19:00
- **Lugar**: Escapology - Centro Parque, Parque Araucano
- **Dirección**: Presidente Riesco 5330, Las Condes, Santiago
- **Actividades**: 2 Escape Rooms + Picnic con pizzas
- **Invitados**: 12 niños (edad 8-12 años)
- **Salas**: 6 por sala (Los Mineros / Bajo Presión)

---

## Lista de Invitados y Códigos

| Invitado          | Código | Estado |
| ----------------- | ------ | ------ |
| Santiago Saud     | SAUD10 | -      |
| Mateo Yanez       | YANE10 | -      |
| Leon Peña         | PENA10 | -      |
| Leon Sarnaki      | SARN10 | -      |
| Facundo Hidalgo   | HIDA10 | -      |
| Maximo Reyes      | REYE10 | -      |
| Mariano Castro    | CAST10 | -      |
| Tomas Nieto       | NIET10 | -      |
| Valentin Gummusio | GUMM10 | -      |
| Dominga Vergara   | VERG10 | -      |
| Emma Vidal        | VIDA10 | -      |
| Renata Quesada    | QUES10 | -      |

---

## Estructura del Proyecto

```
cumple-santi-2025/
├── public/
│   ├── favicon.svg              # Favicon gaming con velas y candado
│   └── images/
│       ├── mineros.jpg          # Imagen oficial escape room
│       └── submarino.png        # Imagen oficial escape room
├── src/
│   ├── db/
│   │   ├── index.ts            # Cliente Drizzle ORM
│   │   └── schema.ts           # Esquema tabla asistencias
│   ├── layouts/
│   │   └── Layout.astro        # Layout base con SEO y grid background
│   ├── pages/
│   │   ├── index.astro         # Home con mini-juego RSVP
│   │   ├── actividades.astro   # Timeline de actividades del día
│   │   ├── confirmar.astro     # Formulario tradicional (backup)
│   │   └── api/
│   │       ├── confirmar.ts    # POST: Guardar confirmación (Drizzle)
│   │       └── verificar.ts    # GET: Verificar si usuario ya confirmó
│   ├── components/
│   │   └── EscapeGame.astro    # Mini-juego interactivo de RSVP (6 etapas)
│   ├── lib/
│   │   └── supabase.ts         # Cliente Supabase (legacy)
│   └── styles/
│       └── globals.css         # Estilos gaming (pixel, glow, scanlines)
├── drizzle.config.ts           # Config Drizzle Kit
├── SETUP.md                    # Instrucciones de configuración completas
├── CODIGOS_INVITACION.md       # Lista de códigos para imprimir
├── SESSION_CONTEXT.md          # Este archivo
└── .env.example                # Template variables de entorno
```

---

## Flujo del Mini-Juego RSVP (EscapeGame.astro)

### Primera Visita (Usuario Nuevo)

**ETAPA 1: Invitación** (🎫)

- Usuario selecciona su nombre del dropdown
- Ingresa código único que Santiago le dio físicamente
- Sistema verifica en BD si ya confirmó
- Si NO existe → continúa a ETAPA 2
- Si YA existe → salta directo a PERFIL

**ETAPA 2: Bienvenida** (⚽️)

- Mensaje personalizado: "Bienvenido [NOMBRE]"
- Botón COMENZAR

**ETAPA 3: Quiz** (🔐)

- 3 preguntas sobre Santiago:
  - ¿Cuántos años cumple? → 10 / diez
  - ¿En qué mes es el cumpleaños? → octubre
  - ¿Qué día es el cumpleaños? → domingo
- Sistema de HP (3 corazones)
- Pierde corazón por respuesta incorrecta
- Si pierde todos → redirect a /confirmar

**ETAPA 4: Info del Evento** (📅)

- Muestra fecha, hora, lugar, actividades
- Botón CONTINUAR

**ETAPA 5: Selección de Sala** (🔐)

- Opciones:
  - ⛏️ Los Mineros (barra de disponibilidad 6/6)
  - 🚢 Bajo Presión (barra de disponibilidad 6/6)
- Al seleccionar → guarda en userData.sala_preferida

**ETAPA 6: Formulario de Datos** (📝)

- Campos:
  - Nombre Jugador: YA COMPLETADO (desde ETAPA 1)
  - Nombre Adulto: input text (requerido)
  - Teléfono: input tel (requerido)
  - Email: input email (opcional)
  - Comentarios: textarea (alergias, etc.)
- Al enviar → POST /api/confirmar → guarda en Supabase

**FINAL: Confirmación** (🎉)

- Mensaje éxito con nombre y sala
- Auto-cierre del overlay después de 3 segundos
- sessionStorage: rsvpCompleted = true

### Visita Posterior (Usuario Ya Confirmado)

**ETAPA 1: Invitación** (🎫)

- Usuario ingresa nombre + código
- Sistema detecta que ya existe en BD
- Carga datos: nombre, padre, teléfono, email, sala, comentarios

**PERFIL** (✅)

- Vista directa con:
  - ✅ ¡YA ESTAS CONFIRMADO!
  - Nombre del jugador
  - Sala asignada (con icono)
  - Fecha: Domingo 19 Octubre 2025
  - Hora: 16:00 - 19:00
  - Lugar: Escapology - Parque Araucano
  - Botones:
    - VER PROGRAMA → /actividades
    - VER MAPA → Google Maps
- Auto-cierre después de 5 segundos

---

## Esquema de Base de Datos

### Tabla: `asistencias`

```sql
CREATE TABLE asistencias (
  id SERIAL PRIMARY KEY,
  nombre_nino TEXT NOT NULL,        -- Nombre del invitado
  nombre_padre TEXT NOT NULL,       -- Nombre del adulto responsable
  telefono TEXT,                    -- Teléfono de contacto
  email TEXT,                       -- Email (opcional)
  sala_preferida TEXT,              -- "Los Mineros" | "Bajo Presión"
  comentarios TEXT,                 -- Alergias, restricciones, etc.
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Políticas RLS (Row Level Security)

```sql
-- Permitir inserciones públicas
CREATE POLICY "Allow public insert" ON asistencias
  FOR INSERT TO anon WITH CHECK (true);

-- Permitir lecturas públicas
CREATE POLICY "Allow read confirmations" ON asistencias
  FOR SELECT TO anon USING (true);
```

---

## Tecnologías Utilizadas

### Frontend

- **Astro 5.14.1**: Framework SSG/SSR
- **TailwindCSS 4**: Estilos utility-first
- **TypeScript**: Para scripts del cliente

### Backend

- **Drizzle ORM 0.44.6**: ORM type-safe para PostgreSQL
- **postgres 3.4.7**: Driver PostgreSQL
- **Supabase**: Base de datos PostgreSQL en la nube

### Fuentes

- **Press Start 2P**:Headings grandes, Textos pequeños, botones, badges (retro gaming)

### Efectos Visuales

- Gaming glow (box-shadow verde neón)
- Scanlines (efecto CRT)
- Pixel borders (corners decorativos)
- Grid background (cuadrícula verde)
- Animaciones: fade-in, slide-up, shake, bounce

---

## Variables de Entorno Requeridas

```env
# .env (NO SUBIR A GIT)
DATABASE_URL=postgresql://postgres:[PASSWORD]@[PROJECT].supabase.co:6543/postgres

# Legacy (opcional, mantenido por compatibilidad)
PUBLIC_SUPABASE_URL=https://[PROJECT].supabase.co
PUBLIC_SUPABASE_ANON_KEY=[ANON_KEY]
```

---

## Comandos Útiles

```bash
# Desarrollo
npm run dev              # Inicia servidor en http://localhost:4321

# Build
npm run build            # Construye para producción
npm run preview          # Preview del build

# Drizzle ORM
npm run db:generate      # Genera migraciones desde schema
npm run db:push          # Aplica schema a BD (sin migraciones)
npm run db:studio        # Abre GUI para explorar BD
```

---

## Páginas del Sitio

### `/` - Home

- Mini-juego de entrada con sistema de códigos
- Cards de las 2 salas escape
- Botones: VER ACTIVIDADES, CONFIRMAR
- Info de ubicación con link a escapology.cl

### `/actividades` - Programa del Día

- Timeline estilo gaming con 4 stages:
  - STAGE 1 (16:00): Llegada
  - STAGE 2 (16:15): Escape Rooms (con imágenes)
  - STAGE 3 (17:45): Picnic en el parque
  - FINAL (19:00): Despedida
- Ubicación con botones: WEB, MAPA
- CTA: CONFIRMAR ASISTENCIA

### `/confirmar` - Formulario Tradicional

- Formulario backup sin juego
- Mismo sistema de validación
- Campos: nombre (select), padre, teléfono, email, comentarios
- Mensajes de éxito/error

---

## APIs Endpoints

### POST `/api/confirmar`

**Guarda confirmación de asistencia**

Request:

```json
{
  "nombre_nino": "Leon Peña",
  "nombre_padre": "María Peña",
  "telefono": "+56912345678",
  "email": "maria@ejemplo.com",
  "sala_preferida": "Los Mineros",
  "comentarios": "Alérgico al maní"
}
```

Response Success:

```json
{
  "success": true,
  "data": [{ "id": 1, "nombre_nino": "Leon Peña", ... }]
}
```

Response Error:

```json
{
  "error": "Error procesando la solicitud"
}
```

### GET `/api/verificar?nombre_nino=Leon%20Pe%C3%B1a`

**Verifica si un invitado ya confirmó**

Response (Existe):

```json
{
  "existe": true,
  "data": {
    "id": 1,
    "nombre_nino": "Leon Peña",
    "nombre_padre": "María Peña",
    "telefono": "+56912345678",
    "email": "maria@ejemplo.com",
    "sala_preferida": "Los Mineros",
    "comentarios": "Alérgico al maní",
    "created_at": "2025-10-05T14:30:00Z"
  }
}
```

Response (No Existe):

```json
{
  "existe": false
}
```

---

## Configuración de Drizzle ORM

### drizzle.config.ts

```typescript
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
```

### src/db/schema.ts

```typescript
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const asistencias = pgTable('asistencias', {
  id: serial('id').primaryKey(),
  nombre_nino: text('nombre_nino').notNull(),
  nombre_padre: text('nombre_padre').notNull(),
  telefono: text('telefono'),
  email: text('email'),
  sala_preferida: text('sala_preferida'),
  comentarios: text('comentarios'),
  created_at: timestamp('created_at').defaultNow(),
});

export type Asistencia = typeof asistencias.$inferSelect;
export type NewAsistencia = typeof asistencias.$inferInsert;
```

### src/db/index.ts

```typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = import.meta.env.DATABASE_URL || '';
export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });
```

---

## Estilos Gaming Principales

### Colores

- **Verde Principal**: `#00ff41` (gaming green)
- **Verde Hover**: `#39ff14` (neon green)
- **Fondo**: `#000000` (black)

### Clases Utility

```css
/* Fuentes */
.pixel-text         /* Press Start 2P, pequeño, UI */
/* Press Start 2P, pequeño, UI */
.pixel-heading      /* Pixelify Sans, grande, headings */

/* Efectos */
.gaming-glow        /* Sombra verde suave */
.gaming-glow-strong /* Sombra verde intensa */
.scanlines          /* Efecto CRT con líneas horizontales */

/* Botones */
.pixel-btn; /* Botón pixel estilo retro con borde negro */
```

---

## Próximos Pasos Potenciales

### Funcionalidades Opcionales

- [ ] Panel de administración para ver confirmaciones
- [ ] Sistema de autenticación para padres
- [ ] Envío de emails de confirmación automáticos
- [ ] Sistema de recordatorios vía WhatsApp/Email
- [ ] Tracking de disponibilidad real de salas (contador dinámico)
- [ ] QR codes para las invitaciones físicas
- [ ] Galería de fotos post-evento
- [ ] Sistema de votación para actividades adicionales

### Mejoras Técnicas

- [ ] Tests automatizados (Vitest)
- [ ] CI/CD con GitHub Actions
- [ ] Optimización de imágenes (Astro Image)
- [ ] PWA para instalación en móviles
- [ ] Analytics (Google Analytics / Plausible)
- [ ] Modo offline con Service Workers
- [ ] Internacionalización (i18n) si hay invitados de otros idiomas

### Deploy

- [ ] Configurar dominio personalizado
- [ ] Deploy a Vercel/Netlify/Cloudflare Pages
- [ ] Configurar variables de entorno en plataforma
- [ ] Setup de CDN para imágenes
- [ ] Monitoring y logs (Sentry)

---

## Problemas Conocidos

### Warnings de CSS

```
@import must precede all other statements (besides @charset or empty @layer)
```

**Causa**: Google Fonts import en globals.css después de @tailwindcss
**Impacto**: Solo warning, no afecta funcionalidad
**Solución**: Mover @import antes de @tailwindcss en globals.css

### Puertos Ocupados

Si los puertos 4321-4322 están ocupados, Astro automáticamente busca el siguiente disponible (4323, 4324, etc.)

---

## Decisiones de Diseño Importantes

### ¿Por qué Drizzle en lugar de Supabase Client?

- **Type-safety**: Inferencia de tipos automática
- **Mejor DX**: Sintaxis más limpia y familiar (similar a SQL)
- **Menos vendor lock-in**: Más fácil migrar a otra BD PostgreSQL
- **Migrations**: Control de esquema versionado

### ¿Por qué códigos únicos y no solo nombres?

- **Seguridad**: Previene confirmaciones falsas
- **Control**: Solo invitados reales pueden confirmar
- **Experiencia**: Añade elemento gaming (código secreto)

### ¿Por qué 2 fuentes (Press Start 2P + Pixelify Sans)?

- **Press Start 2P**: Auténtica pero ilegible en tamaños grandes
- **Pixelify Sans**: Moderna, legible, mantiene estética pixel
- **Combinación**: Lo mejor de ambos mundos (autenticidad + legibilidad)

### ¿Por qué SessionStorage y no LocalStorage?

- **Seguridad**: Datos se limpian al cerrar pestaña
- **UX**: Permite re-confirmar abriendo nueva pestaña si es necesario
- **Simplicidad**: Evita problemas de persistencia indefinida

---

## Contactos y Links Importantes

- **Sitio Escape Room**: https://escapology.cl
- **Sala Los Mineros**: https://escapology.cl/rooms/4
- **Sala Bajo Presión**: https://escapology.cl/rooms/3
- **Ubicación Google Maps**: Presidente Riesco 5330, Las Condes
- **Parque Araucano**: Centro Parque

---

## Notas de la Sesión

### Cambios Principales Realizados

1. **Sistema de códigos de invitación**: Cada invitado tiene código único
2. **Validación inteligente**: Detecta si usuario ya confirmó
3. **Vista de perfil**: Muestra info al usuario que ya confirmó
4. **Migración a Drizzle ORM**: Reemplazo de Supabase client
5. **Nuevo endpoint**: GET /api/verificar para chequear confirmaciones
6. **6 etapas del juego**: Ahora comienza con selección de nombre + código

### Flujo Completo Implementado

✅ Usuario ingresa nombre + código
✅ Sistema verifica si ya confirmó
✅ Si nuevo → juego completo (6 etapas)
✅ Si existente → perfil directo
✅ Datos guardados en Supabase vía Drizzle
✅ Códigos únicos por invitado
✅ Archivo CODIGOS_INVITACION.md para imprimir

---

## Logs de Cambios por Sesión

### Sesión 1 - Setup Inicial

- Creación proyecto Astro
- Setup TailwindCSS 4
- Diseño inicial páginas (index, actividades, confirmar)
- Setup Supabase
- Primer mini-juego con 1 pregunta

### Sesión 2 - Expansión del Juego

- Ampliación a 6 preguntas del quiz
- Sistema de HP (3 corazones)
- Diseño gaming (verde neón)
- Integración imágenes oficiales

### Sesión 3 - RSVP Completo

- Flujo completo de 5 etapas
- Selección de salas con contadores
- Formulario integrado
- Integración con Supabase API

### Sesión 4 - Drizzle ORM (Esta sesión)

- Migración a Drizzle ORM
- Sistema de códigos únicos
- Endpoint de verificación
- Vista de perfil para usuarios confirmados
- Documentación completa

---

## Para Retomar en el Futuro

### Al abrir el proyecto nuevamente:

1. **Verificar dependencias**:

   ```bash
   npm install
   ```

2. **Configurar .env** (si es nueva máquina):

   ```bash
   cp .env.example .env
   # Editar .env con credenciales de Supabase
   ```

3. **Sincronizar BD** (si hay cambios en schema):

   ```bash
   npm run db:push
   ```

4. **Iniciar servidor**:

   ```bash
   npm run dev
   ```

5. **Leer este archivo** para recordar contexto completo

### Checklist Pre-Deploy

- [ ] Verificar todos los códigos en CODIGOS_INVITACION.md
- [ ] Imprimir tarjetas con códigos para entregar
- [ ] Configurar DATABASE_URL en plataforma de deploy
- [ ] Testear flujo completo: código nuevo + código existente
- [ ] Verificar imágenes carguen correctamente
- [ ] Testear en móvil y desktop
- [ ] Compartir URL con Santiago para validación
- [ ] Monitorear confirmaciones en Drizzle Studio

---

## Créditos

**Desarrollado para**: Santiago Saud (cumpleaños #10)
**Desarrollado por**: Claude Code + Dean
**Framework**: Astro
**ORM**: Drizzle
**Base de Datos**: Supabase PostgreSQL
**Hosting**: (Pendiente)

---

_Última actualización: 5 de Octubre 2025_
_Versión del documento: 1.0_

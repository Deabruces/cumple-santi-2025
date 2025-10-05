# Configuración del Proyecto - Cumpleaños Santiago Saud

## Configuración de Supabase con Drizzle ORM

Para que el formulario de confirmación de asistencia funcione, necesitas configurar Supabase:

### 1. Crear un proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Espera a que el proyecto se inicialice

### 2. Obtener la cadena de conexión a la base de datos

1. En tu proyecto de Supabase, ve a `Settings > Database`
2. Busca la sección **Connection String**
3. Selecciona el modo **Transaction Pooling** (puerto 6543)
4. Copia la cadena de conexión que tiene este formato:
   ```
   postgresql://postgres:[PASSWORD]@[PROJECT_REF].supabase.co:6543/postgres
   ```
5. Reemplaza `[PASSWORD]` con la contraseña de tu base de datos

### 3. Configurar las variables de entorno

1. Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edita el archivo `.env` y agrega tu cadena de conexión:
   ```env
   DATABASE_URL=postgresql://postgres:tu-password@tu-proyecto.supabase.co:6543/postgres
   ```

3. **IMPORTANTE**: El archivo `.env` no debe subirse a git. Ya está incluido en `.gitignore`.

### 4. Crear las tablas en la base de datos

Opción A - Usando Drizzle Kit (recomendado):
```bash
# Genera las migraciones desde el esquema
npm run db:generate

# Aplica las migraciones a la base de datos
npm run db:push
```

Opción B - Usando SQL directamente en Supabase:

Ejecuta este SQL en el SQL Editor de Supabase:

```sql
-- Crear tabla de asistencias
CREATE TABLE asistencias (
  id SERIAL PRIMARY KEY,
  nombre_nino TEXT NOT NULL,
  nombre_padre TEXT NOT NULL,
  telefono TEXT,
  email TEXT,
  sala_preferida TEXT,
  comentarios TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE asistencias ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir inserciones públicas
CREATE POLICY "Allow public insert" ON asistencias
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Crear política para ver todas las confirmaciones (solo para admins)
CREATE POLICY "Allow read confirmations" ON asistencias
  FOR SELECT
  TO anon
  USING (true);
```

## Ejecutar el proyecto

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## Comandos de Drizzle

```bash
# Generar migraciones desde el esquema
npm run db:generate

# Aplicar esquema directamente a la base de datos (sin migraciones)
npm run db:push

# Abrir Drizzle Studio para explorar la base de datos
npm run db:studio
```

## Estructura del Proyecto

```
/
├── public/
│   ├── favicon.svg       # Favicon del sitio
│   ├── og-image.jpg      # Imagen para compartir en redes sociales
│   └── images/           # Imágenes del sitio
├── src/
│   ├── db/
│   │   ├── index.ts      # Cliente de Drizzle
│   │   └── schema.ts     # Esquema de la base de datos
│   ├── layouts/
│   │   └── Layout.astro  # Layout base con SEO
│   ├── pages/
│   │   ├── index.astro   # Página de bienvenida
│   │   ├── actividades.astro  # Página de actividades
│   │   ├── confirmar.astro    # Formulario de confirmación
│   │   └── api/
│   │       └── confirmar.ts   # API endpoint con Drizzle
│   ├── components/
│   │   └── EscapeGame.astro   # Mini-juego de RSVP
│   └── lib/
│       └── supabase.ts   # Cliente de Supabase (legacy)
├── drizzle.config.ts     # Configuración de Drizzle Kit
└── .env                  # Variables de entorno (no subir a git)
```

## Despliegue

### Opciones de hosting gratuito:

1. **Vercel** (recomendado para Astro)
   - Conecta tu repositorio de GitHub
   - Configura las variables de entorno en el dashboard
   - Deploy automático en cada push

2. **Netlify**
   - Similar a Vercel
   - Excelente para sitios estáticos

3. **Cloudflare Pages**
   - Gratis e ilimitado
   - Muy rápido

**Recuerda**: En cualquier plataforma de despliegue, debes configurar la variable de entorno `DATABASE_URL` en el dashboard de configuración con la cadena de conexión de tu base de datos Supabase.

## Consultar confirmaciones

Para ver las confirmaciones recibidas, puedes:

1. **Drizzle Studio** (recomendado):
   ```bash
   npm run db:studio
   ```
   Abre tu navegador en `https://local.drizzle.studio` para explorar y editar los datos.

2. **Supabase Dashboard**:
   Ve a tu proyecto en Supabase > Table Editor > asistencias

3. **Crear una página admin protegida** (opcional)

## Soporte

Si tienes problemas con la configuración, revisa:
- [Documentación de Astro](https://docs.astro.build)
- [Documentación de Supabase](https://supabase.com/docs)
- [Documentación de Drizzle ORM](https://orm.drizzle.team/docs/overview)

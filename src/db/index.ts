import { DATABASE_URL } from "astro:env/server";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schemas/index";

// Configuración de Supabase Postgres
const connectionString = DATABASE_URL;

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false });
export const db: ReturnType<typeof drizzle<typeof schema>> = drizzle(client, {
	schema,
});

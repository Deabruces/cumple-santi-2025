import { createClient } from "@supabase/supabase-js";

// Estas variables deben configurarse en un archivo .env
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Asistencia {
	id?: number;
	nombre_nino: string;
	nombre_padre: string;
	telefono?: string;
	email?: string;
	sala_preferida?: string;
	comentarios?: string;
	created_at?: string;
}

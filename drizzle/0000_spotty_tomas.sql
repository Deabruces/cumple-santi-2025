CREATE TABLE "asistencias" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre_nino" text NOT NULL,
	"nombre_padre" text NOT NULL,
	"telefono" text,
	"email" text,
	"sala_preferida" text,
	"comentarios" text,
	"created_at" timestamp DEFAULT now()
);

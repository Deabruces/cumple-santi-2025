ALTER TABLE "asistencias" RENAME TO "invitados";--> statement-breakpoint
ALTER TABLE "invitados" RENAME COLUMN "nombre_nino" TO "nombre";--> statement-breakpoint
ALTER TABLE "invitados" ADD COLUMN "clave" text NOT NULL;--> statement-breakpoint
ALTER TABLE "invitados" ADD COLUMN "sala_asignada" text;--> statement-breakpoint
ALTER TABLE "invitados" DROP COLUMN "nombre_padre";--> statement-breakpoint
ALTER TABLE "invitados" DROP COLUMN "telefono";--> statement-breakpoint
ALTER TABLE "invitados" DROP COLUMN "email";--> statement-breakpoint
ALTER TABLE "invitados" DROP COLUMN "sala_preferida";--> statement-breakpoint
ALTER TABLE "invitados" DROP COLUMN "comentarios";
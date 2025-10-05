import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const asistencias = pgTable('asistencias', {
  id: serial('id').primaryKey(),
  nombre_nino: text('nombre_nino').notNull(),
  sala_preferida: text('sala_preferida'),
  created_at: timestamp('created_at').defaultNow(),
});

export type Asistencia = typeof asistencias.$inferSelect;
export type NewAsistencia = typeof asistencias.$inferInsert;

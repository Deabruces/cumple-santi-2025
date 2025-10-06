import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const guests = pgTable("guests", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	code: text("code").notNull(),
	room_assigned: text("room_assigned"),
	created_at: timestamp("created_at").defaultNow(),
});

export type Guest = typeof guests.$inferSelect;
export type NewGuest = typeof guests.$inferInsert;

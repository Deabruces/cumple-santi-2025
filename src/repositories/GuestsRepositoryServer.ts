import { and, eq, isNotNull, sql } from "drizzle-orm";
import * as drizzleSchema from "../db/schemas/index";
import { db } from "./clients/DrizzleClient";
export const prerender = false;
const client = db;
const schema = drizzleSchema.guests;
export const GuestsRepositoryServer = {
	async getAllGuests() {
		return (
			client
				.select({
					id: schema.id,
					name: schema.name,
					room_assigned: schema.room_assigned,
				})
				.from(schema) || []
		);
	},
	async getGuestsWithRooms() {
		return client
			.select({
				id: schema.id,
				name: schema.name,
				room_assigned: schema.room_assigned,
			})
			.from(schema)
			.where(isNotNull(schema.room_assigned));
	},
	async getGuestByRoom(room: string) {
		return client.select().from(schema).where(eq(schema.room_assigned, room));
	},
	async verifyUser({
		userId,
		code,
	}: {
		userId: number;
		code: string;
	}): Promise<boolean> {
		console.log("Verifying user:", { userId, code });
		const result = await client
			.select()
			.from(schema)
			.where(
				and(
					eq(schema.id, userId),
					eq(sql`lower(${schema.code})`, sql`lower(${code})`),
				),
			);
		console.log("Verification result:", result);
		return !!result.length;
	},
	async assignRoom({ userId, room }: { userId: number; room: string }) {
		const result = await client
			.update(schema)
			.set({ room_assigned: room })
			.where(eq(schema.id, userId))
			.returning();
		return result[0];
	},
	async validateCode({ userId, code }: { userId: number; code: string }) {
		const result = await db
			.select()
			.from(schema)
			.where(and(eq(schema.id, userId), eq(schema.code, code)))
			.limit(1);
		const guest = result[0];
		return guest;
	},
};

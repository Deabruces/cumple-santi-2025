import { db } from './clients/DrizzleClient';
import * as drizzleSchema from '../../../db/schemas/index';
import { eq, and, sql } from 'drizzle-orm';
export class GuestsRepository {
  static client = db;
  static schema = drizzleSchema.guests;
  static async getAllGuests() {
    return GuestsRepository.client
      .select({
        id: GuestsRepository.schema.id,
        name: GuestsRepository.schema.name,
      })
      .from(GuestsRepository.schema);
  }
  static async verifyUser({
    userId,
    code,
  }: {
    userId: number;
    code: string;
  }): Promise<boolean> {
    console.log('Verifying user:', { userId, code });
    const result = await GuestsRepository.client
      .select()
      .from(GuestsRepository.schema)
      .where(
        and(
          eq(GuestsRepository.schema.id, userId),
          eq(sql`lower(${GuestsRepository.schema.code})`, sql`lower(${code})`)
        )
      );
    console.log('Verification result:', result);
    return !!result.length;
  }
}

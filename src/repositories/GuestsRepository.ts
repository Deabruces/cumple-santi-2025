import { FetchClient } from './clients/fetchClient';
import * as drizzleSchema from '../db/schemas/index';

export class GuestsRepository {
  static client = new FetchClient('/api/guests');
  schema = drizzleSchema.guests;
  static async getAllGuests() {
    return GuestsRepository.client.get('/list');
  }
  static async verifyUser({
    userId,
    code,
  }: {
    userId: number;
    code: string;
  }): Promise<{ isValid: boolean; hasCompletedGame: boolean; roomAssigned: string | null }> {
    return GuestsRepository.client.post(`/verify`, { userId, code });
  }
  static async assignRoom({
    userId,
    room,
  }: {
    userId: number;
    room: string;
  }): Promise<{ success: boolean }> {
    return GuestsRepository.client.post(`/assign-room`, { userId, room });
  }
  static async getRoomsStatus(): Promise<{
    mineros: { count: number; guests: { id: number; name: string }[] };
    'bajo-presion': { count: number; guests: { id: number; name: string }[] };
  }> {
    return GuestsRepository.client.get('/rooms-status');
  }
}

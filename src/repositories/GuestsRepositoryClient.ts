import { FetchClient } from "./clients/fetchClient";

const client = new FetchClient("/api/guests");
export const GuestsRepositoryClient = {
	async getAllGuests() {
		return client.get("/list");
	},
	async verifyUser({
		userId,
		code,
	}: {
		userId: number;
		code: string;
	}): Promise<{
		isValid: boolean;
		hasCompletedGame: boolean;
		roomAssigned: string | null;
	}> {
		return client.post(`/verify`, { userId, code });
	},
	async assignRoom({
		userId,
		room,
	}: {
		userId: number;
		room: string;
	}): Promise<{ success: boolean }> {
		return client.post(`/assign-room`, { userId, room });
	},
	async getRoomsStatus(): Promise<{
		mineros: { count: number; guests: { id: number; name: string }[] };
		"bajo-presion": { count: number; guests: { id: number; name: string }[] };
	}> {
		return client.get("/rooms-status");
	},
	async resignInvitation({ userId }: { userId: number }): Promise<{ success: boolean }> {
		return client.post(`/resign-invitation`, { userId });
	},
	async resignInvitationWithGuestName({ guestName }: { guestName: string }): Promise<{ success: boolean }> {
		return client.post(`/resign-invitation-with-guestname`, { guestName });
	}
};

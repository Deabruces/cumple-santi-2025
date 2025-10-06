import { get } from "@repositories/RepositoryComposite";
import type { APIRoute } from "astro";

const GuestsRepository = await get("guestsServer");

export const prerender = false;

export const GET: APIRoute = async () => {
	try {
		const assignedGuests = await GuestsRepository.getAllGuests();
		const groupedGuests = Object.groupBy(
			assignedGuests,
			(guest) => guest.room_assigned || "unassigned",
		);

		const mineros = groupedGuests.mineros || [];
		const bajoPresion = groupedGuests["bajo-presion"] || [];

		return new Response(
			JSON.stringify({
				mineros: {
					count: mineros.length,
					guests: mineros.map((g) => ({ id: g.id, name: g.name })),
				},
				"bajo-presion": {
					count: bajoPresion.length,
					guests: bajoPresion.map((g) => ({ id: g.id, name: g.name })),
				},
			}),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	} catch (error) {
		console.error("Error getting rooms status:", error);
		return new Response(JSON.stringify({ error: "Internal server error" }), {
			status: 500,
		});
	}
};

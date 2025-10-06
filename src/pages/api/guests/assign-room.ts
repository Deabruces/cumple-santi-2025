import { get } from "@repositories/RepositoryComposite";
import type { APIRoute } from "astro";

const GuestsRepository = await get("guestsServer");
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	try {
		const body = await request.json();
		const { userId, room } = body;

		if (!userId || !room) {
			return new Response(
				JSON.stringify({ error: "Missing required fields" }),
				{ status: 400 },
			);
		}

		const result = await GuestsRepository.assignRoom({
			userId: Number(userId),
			room,
		});

		return new Response(JSON.stringify({ success: true, guest: result }), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error assigning room:", error);
		return new Response(JSON.stringify({ error: "Internal server error" }), {
			status: 500,
		});
	}
};

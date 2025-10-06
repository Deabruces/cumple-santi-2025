import { get } from "@repositories/RepositoryComposite";
import type { APIRoute } from "astro";

const GuestsRepository = await get("guestsServer");

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	try {
		const { userId, code } = await request.json();
		if (!userId || !code) {
			return new Response(JSON.stringify({ isValid: false }), { status: 400 });
		}
		const guest =
			(await GuestsRepository.validateCode({
				userId,
				code,
			})) || null;

		return new Response(
			JSON.stringify({
				isValid: !!guest,
				hasCompletedGame: !!guest?.room_assigned,
				roomAssigned: guest?.room_assigned || null,
			}),
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error en API:", error);
		return new Response(
			JSON.stringify({ error: "Error procesando la solicitud" }),
			{ status: 500 },
		);
	}
};

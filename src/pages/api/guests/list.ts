import { get } from "@repositories/RepositoryCompositeServer";
import type { APIRoute } from "astro";

const GuestsRepository = await get("guestsServer");

export const prerender = false;

export const GET: APIRoute = async () => {
	try {
		const invitados = await GuestsRepository.getAllGuests();
		return new Response(JSON.stringify(invitados), {
			status: 200,
		});
	} catch (error) {
		console.error("Error en API:", error);
		return new Response(
			JSON.stringify({ error: "Error procesando la solicitud" }),
			{ status: 500 },
		);
	}
};

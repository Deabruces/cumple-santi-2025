import { get } from "@repositories/RepositoryCompositeServer";
import type { APIRoute } from "astro";

const GuestsRepository = await get("guestsServer");

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { guestName } = body;

        if (!guestName) {
            return new Response(
                JSON.stringify({ error: "Missing required fields" }),
                { status: 400 },
            );
        }

        const result = await GuestsRepository.resignInvitationWithGuestName({
            guestName,
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

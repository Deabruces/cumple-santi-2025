import type { APIRoute } from 'astro';
import { db } from '../../../db';
import { guests } from '../../../db/schemas';
import { eq, and } from 'drizzle-orm';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { userId, code } = await request.json();

    if (!userId || !code) {
      return new Response(
        JSON.stringify({ isValid: false }),
        { status: 400 }
      );
    }

    const result = await db
      .select()
      .from(guests)
      .where(and(eq(guests.id, userId), eq(guests.code, code)))
      .limit(1);

    const guest = result[0];

    return new Response(
      JSON.stringify({
        isValid: !!guest,
        hasCompletedGame: !!guest?.room_assigned,
        roomAssigned: guest?.room_assigned || null,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en API:', error);
    return new Response(
      JSON.stringify({ error: 'Error procesando la solicitud' }),
      { status: 500 }
    );
  }
};
export const prerender = false;

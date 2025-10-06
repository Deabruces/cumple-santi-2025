import type { APIRoute } from 'astro';
import { db } from '../../../db';
import { guests } from '../../../db/schemas';
import { eq, isNotNull } from 'drizzle-orm';

export const GET: APIRoute = async () => {
  try {
    const assignedGuests = await db
      .select({
        id: guests.id,
        name: guests.name,
        room_assigned: guests.room_assigned,
      })
      .from(guests)
      .where(isNotNull(guests.room_assigned));

    const mineros = assignedGuests.filter((g) => g.room_assigned === 'mineros');
    const bajoPresion = assignedGuests.filter((g) => g.room_assigned === 'bajo-presion');

    return new Response(
      JSON.stringify({
        mineros: {
          count: mineros.length,
          guests: mineros.map((g) => ({ id: g.id, name: g.name })),
        },
        'bajo-presion': {
          count: bajoPresion.length,
          guests: bajoPresion.map((g) => ({ id: g.id, name: g.name })),
        },
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error getting rooms status:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
};

export const prerender = false;

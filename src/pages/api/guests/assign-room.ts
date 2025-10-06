import type { APIRoute } from 'astro';
import { db } from '../../../db';
import { guests } from '../../../db/schemas';
import { eq } from 'drizzle-orm';
export const prerender = false;
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { userId, room } = body;

    if (!userId || !room) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400 }
      );
    }

    const result = await db
      .update(guests)
      .set({ room_assigned: room })
      .where(eq(guests.id, userId))
      .returning();

    return new Response(JSON.stringify({ success: true, guest: result[0] }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error assigning room:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
};

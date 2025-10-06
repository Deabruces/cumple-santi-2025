import type { APIRoute } from 'astro';
import { GuestsRepository } from '../repositories/GuestsRepository';
export const GET: APIRoute = async ({ url }) => {
  try {
    const invitados = await GuestsRepository.getAllGuests();
    return new Response(JSON.stringify(invitados), {
      status: 200,
    });
  } catch (error) {
    console.error('Error en API:', error);
    return new Response(
      JSON.stringify({ error: 'Error procesando la solicitud' }),
      { status: 500 }
    );
  }
};
export const prerender = false;

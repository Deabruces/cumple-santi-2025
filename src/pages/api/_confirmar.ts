import type { APIRoute } from 'astro';
import { db } from '../../db';
import { asistencias } from '../../db/schemas';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const result = await db
      .insert(asistencias)
      .values({
        nombre_nino: data.nombre_nino,
        nombre_padre: data.nombre_padre,
        telefono: data.telefono,
        email: data.email,
        sala_preferida: data.sala_preferida,
        comentarios: data.comentarios,
      })
      .returning();

    return new Response(JSON.stringify({ success: true, data: result }), {
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

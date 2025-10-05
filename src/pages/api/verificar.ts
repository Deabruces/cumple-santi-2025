import type { APIRoute } from 'astro';
import { db } from '../../db';
import { asistencias } from '../../db/schema';
import { eq } from 'drizzle-orm';

export const GET: APIRoute = async ({ url }) => {
  try {
    const nombreNino = url.searchParams.get('nombre_nino');

    if (!nombreNino) {
      return new Response(
        JSON.stringify({ error: 'Nombre requerido' }),
        { status: 400 }
      );
    }

    const result = await db
      .select()
      .from(asistencias)
      .where(eq(asistencias.nombre_nino, nombreNino))
      .limit(1);

    if (result.length > 0) {
      return new Response(
        JSON.stringify({
          existe: true,
          data: result[0]
        }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ existe: false }),
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Error en API verificar:', error);
    return new Response(
      JSON.stringify({ error: 'Error procesando la solicitud' }),
      { status: 500 }
    );
  }
};

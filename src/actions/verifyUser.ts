import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
const inputDefine = z.object({
  nombre_nino: z.string().min(1, 'El nombre del niño es requerido.').max(100),
  clave: z.string().min(1, 'La clave es requerida.').max(100),
});
export const verifyUser = defineAction({
  input: inputDefine,
  handler: async (input: z.infer<typeof inputDefine>) => {
    const { nombre_nino, clave } = input;
    // Aquí puedes agregar la lógica para verificar el usuario en la base de datos
    // Por ejemplo, hacer una solicitud a tu API o consultar directamente la base de datos

    try {
      const response = await fetch(
        `${
          import.meta.env.SITE_URL || 'http://localhost:3000'
        }/api/verificar?nombre_nino=${encodeURIComponent(nombre_nino)}`
      );

      if (!response.ok) {
        throw new Error('Error en la verificación del usuario.');
      }

      const data = await response.json();

      if (data.existe) {
        // Aquí puedes verificar la clave si es necesario
        if (data.data.clave === clave) {
          return { success: true, exists: true, userData: data.data };
        } else {
          return { success: false, message: 'Clave incorrecta.' };
        }
      } else {
        return { success: false, message: 'Usuario no encontrado.' };
      }
    } catch (error) {
      console.error('Error al verificar el usuario:', error);
      return { success: false, message: 'Error al verificar el usuario.' };
    }
  },
});

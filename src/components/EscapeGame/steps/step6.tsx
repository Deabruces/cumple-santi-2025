import { useEffect } from 'react';

interface Step6Props {
  guests: { id: number; name: string }[];
  selectedGuest: number | null;
  selectedRoom: string | null;
  goNextStep: () => void;
  setSelectedGuest: (id: number | null) => void;
}

const ROOM_NAMES: Record<string, string> = {
  'mineros': 'Los Mineros ⛏️',
  'bajo-presion': 'Bajo Presión 🚢',
};

export const Step6 = ({
  guests,
  selectedGuest,
  selectedRoom,
}: Step6Props) => {
  const guestName = guests.find((g) => g.id === selectedGuest)?.name || 'Invitado';
  const roomName = selectedRoom ? ROOM_NAMES[selectedRoom] || selectedRoom : 'No seleccionada';

  useEffect(() => {
    // Save guest info to sessionStorage
    sessionStorage.setItem('rsvpCompleted', 'true');
    sessionStorage.setItem('guestName', guestName);
    sessionStorage.setItem('guestRoom', selectedRoom || '');

    // Auto-close overlay after 3 seconds
    const timer = setTimeout(() => {
      window.location.href = '/actividades';
    }, 3000);

    return () => clearTimeout(timer);
  }, [guestName, selectedRoom]);

  return (
    <div id='content-area' className='text-center'>
      <div className='mb-6 gaming-glow'>
        <div className='text-6xl mb-4 animate-bounce'>🎉</div>
      </div>

      <h2 className='text-2xl md:text-3xl font-bold text-center mb-4 text-green-400 pixel-heading gaming-glow leading-tight'>
        ¡CONFIRMACIÓN EXITOSA!
      </h2>

      <div className='bg-black border-2 border-green-500 p-6 mb-6 relative'>
        <div className='absolute -top-1 -left-1 w-3 h-3 bg-green-500'></div>
        <div className='absolute -top-1 -right-1 w-3 h-3 bg-green-500'></div>
        <div className='absolute -bottom-1 -left-1 w-3 h-3 bg-green-500'></div>
        <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-500'></div>

        <p className='text-green-400 text-sm pixel-text mb-3'>
          ✅ {guestName} está confirmado para:
        </p>
        <p className='text-green-300 text-lg font-bold pixel-text mb-2'>
          {roomName}
        </p>
        <p className='text-green-300 text-xs pixel-text'>
          📅 Domingo, 19 de Octubre • 16:00 hrs
        </p>
      </div>

      <p className='text-green-400 text-xs pixel-text animate-pulse'>
        Redirigiendo a actividades...
      </p>
    </div>
  );
};

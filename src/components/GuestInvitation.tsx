import { useEffect, useState } from 'react';

const ROOM_NAMES: Record<string, string> = {
  'mineros': 'Los Mineros ⛏️',
  'bajo-presion': 'Bajo Presión 🚢',
};

export const GuestInvitation = () => {
  const [guestInfo, setGuestInfo] = useState<{
    name: string;
    room: string;
  } | null>(null);

  useEffect(() => {
    const name = sessionStorage.getItem('guestName');
    const room = sessionStorage.getItem('guestRoom');

    if (name && room) {
      setGuestInfo({ name, room });
    }
  }, []);

  if (!guestInfo) return null;

  const roomName = ROOM_NAMES[guestInfo.room] || guestInfo.room;

  return (
    <div className='mb-8 animate-fade-in'>
      <div className='bg-black border-4 border-green-500 p-6 gaming-glow-strong relative'>
        <div className='absolute -top-2 -left-2 w-4 h-4 bg-green-500'></div>
        <div className='absolute -top-2 -right-2 w-4 h-4 bg-green-500'></div>
        <div className='absolute -bottom-2 -left-2 w-4 h-4 bg-green-500'></div>
        <div className='absolute -bottom-2 -right-2 w-4 h-4 bg-green-500'></div>

        <div className='text-center'>
          <div className='text-4xl mb-3'>🎫</div>
          <h2 className='text-2xl md:text-3xl font-bold text-green-400 pixel-heading mb-3'>
            TU INVITACIÓN
          </h2>
          <div className='bg-green-900 bg-opacity-30 border-2 border-green-700 p-4 mb-3'>
            <p className='text-green-300 pixel-text text-sm mb-2'>
              <span className='text-green-400 font-bold'>Jugador:</span> {guestInfo.name}
            </p>
            <p className='text-green-300 pixel-text text-sm'>
              <span className='text-green-400 font-bold'>Sala asignada:</span> {roomName}
            </p>
          </div>
          <p className='text-green-400 pixel-text text-xs'>
            ✅ Ya estás confirmado para esta aventura
          </p>
        </div>
      </div>
    </div>
  );
};

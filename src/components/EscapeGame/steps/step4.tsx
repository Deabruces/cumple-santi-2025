interface Step4Props {
  guests: { id: number; name: string }[];
  selectedGuest: number | null;
  goNextStep: () => void;
  setSelectedGuest: (id: number | null) => void;
}

export const Step4 = ({ goNextStep }: Step4Props) => {
  return (
    <div id='content-area'>
      <div className='text-center mb-4 gaming-glow'>
        <div className='text-6xl mb-2'>📅</div>
      </div>

      <h2 className='text-2xl md:text-3xl font-bold text-center mb-4 text-green-400 pixel-heading gaming-glow leading-tight'>
        DETALLES DE LA MISIÓN
      </h2>

      <div className='space-y-4 mb-6'>
        {/* Date & Time */}
        <div className='bg-black border-2 border-green-500 p-4 relative'>
          <div className='absolute -top-1 -left-1 w-3 h-3 bg-green-500'></div>
          <div className='absolute -top-1 -right-1 w-3 h-3 bg-green-500'></div>
          <div className='absolute -bottom-1 -left-1 w-3 h-3 bg-green-500'></div>
          <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-500'></div>

          <p className='text-green-400 text-xs font-bold pixel-text mb-2'>📆 FECHA Y HORA</p>
          <p className='text-green-300 text-sm pixel-text'>Domingo, 19 de Octubre 2025</p>
          <p className='text-green-300 text-sm pixel-text'>16:00 hrs</p>
        </div>

        {/* Location */}
        <div className='bg-black border-2 border-green-500 p-4 relative'>
          <div className='absolute -top-1 -left-1 w-3 h-3 bg-green-500'></div>
          <div className='absolute -top-1 -right-1 w-3 h-3 bg-green-500'></div>
          <div className='absolute -bottom-1 -left-1 w-3 h-3 bg-green-500'></div>
          <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-500'></div>

          <p className='text-green-400 text-xs font-bold pixel-text mb-2'>📍 LUGAR</p>
          <p className='text-green-300 text-sm pixel-text'>Escapology - Parque Araucano</p>
          <p className='text-green-300 text-xs pixel-text mt-1'>
            Presidente Riesco 5330, Las Condes
          </p>
        </div>

        {/* Activities */}
        <div className='bg-black border-2 border-green-500 p-4 relative'>
          <div className='absolute -top-1 -left-1 w-3 h-3 bg-green-500'></div>
          <div className='absolute -top-1 -right-1 w-3 h-3 bg-green-500'></div>
          <div className='absolute -bottom-1 -left-1 w-3 h-3 bg-green-500'></div>
          <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-500'></div>

          <p className='text-green-400 text-xs font-bold pixel-text mb-2'>🎮 ACTIVIDADES</p>
          <ul className='text-green-300 text-sm pixel-text space-y-1'>
            <li>• Escape Room (2 salas increíbles)</li>
            <li>• Picnic con pizzas en el parque</li>
            <li>• Sorpresas y diversión</li>
          </ul>
        </div>
      </div>

      <button
        onClick={goNextStep}
        className='w-full px-6 py-4 bg-green-500 hover:bg-green-400 text-black font-bold text-sm transition-all pixel-text gaming-glow-strong border-4 border-green-600 active:translate-y-1'
      >
        ▶ CONTINUAR
      </button>
    </div>
  );
};

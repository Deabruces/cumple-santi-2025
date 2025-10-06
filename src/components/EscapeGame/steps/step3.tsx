import { useState } from 'react';

interface Step3Props {
  guests: { id: number; name: string }[];
  selectedGuest: number | null;
  goNextStep: () => void;
  setSelectedGuest: (id: number | null) => void;
  health: number;
  setHealth: (health: number) => void;
  goPreviousStep: () => void;
}

const QUESTIONS = [
  {
    question: '¿Cuántos años cumple Santiago?',
    answers: ['10', 'diez'],
  },
  {
    question: 'Si x + 7 = 15, ¿cuánto vale x?',
    answers: ['8', 'ocho'],
  },
  {
    question: '¿En qué mes es su cumpleaños?',
    answers: ['octubre', '10', 'diez'],
  },
  {
    question: '¿Cuánto es 12 × 3?',
    answers: ['36', 'treinta y seis'],
  },
  {
    question:
      '¿Si santi cumple el 19 de octubre, qué día de la semana es su cumpleaños?',
    answers: ['domingo'],
  },
];

export const Step3 = ({
  goNextStep,
  health,
  setHealth,
  goPreviousStep,
}: Step3Props) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedAnswer = answer.toLowerCase().trim();
    const isCorrect =
      QUESTIONS[currentQuestion].answers.includes(normalizedAnswer);

    if (isCorrect) {
      setAnswer('');
      setError(false);

      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        goNextStep();
      }
    } else {
      const newHealth = health - 1;
      setHealth(newHealth);
      setError(true);
      setShake(true);

      setTimeout(() => {
        setShake(false);
        setError(false);
      }, 2000);

      // Game over is handled by the component rendering the game over screen
    }
  };

  if (health <= 0) {
    return (
      <div id='content-area' className='text-center'>
        <div className='mb-6 gaming-glow'>
          <div className='text-6xl mb-4'>💀</div>
        </div>

        <h2 className='text-3xl md:text-4xl font-bold text-center mb-4 text-red-500 pixel-heading gaming-glow leading-tight animate-pulse'>
          GAME OVER
        </h2>

        <div className='bg-red-900 bg-opacity-30 border-2 border-red-600 p-6 mb-6'>
          <p className='text-red-400 pixel-text text-sm mb-2'>
            ❌ Perdiste todos tus HP
          </p>
          <p className='text-red-300 pixel-text text-xs'>
            Intenta nuevamente desde el paso anterior
          </p>
        </div>

        <button
          onClick={goPreviousStep}
          className='w-full px-6 py-4 bg-red-500 hover:bg-red-400 text-white font-bold text-sm transition-all pixel-text gaming-glow-strong border-4 border-red-600 active:translate-y-1'
        >
          🔄 VOLVER AL PASO ANTERIOR
        </button>
      </div>
    );
  }

  return (
    <form
      id='content-area'
      onSubmit={handleSubmit}
      className={shake ? 'animate-shake' : ''}
    >
      <div className='text-center mb-4 gaming-glow'>
        <div className='text-6xl mb-2'>🔐</div>
      </div>

      <h2 className='text-2xl md:text-3xl font-bold text-center mb-2 text-green-400 pixel-heading gaming-glow leading-tight'>
        VERIFICACIÓN DE SEGURIDAD
      </h2>

      <p className='text-center text-green-300 mb-4 text-xs pixel-text py-2'>
        Pregunta {currentQuestion + 1} de {QUESTIONS.length}
      </p>

      <div className='bg-black border-2 border-green-500 p-6 mb-4 relative'>
        <div className='absolute -top-1 -left-1 w-3 h-3 bg-green-500'></div>
        <div className='absolute -top-1 -right-1 w-3 h-3 bg-green-500'></div>
        <div className='absolute -bottom-1 -left-1 w-3 h-3 bg-green-500'></div>
        <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-500'></div>

        <p className='text-green-400 text-center text-sm pixel-text mb-4'>
          {QUESTIONS[currentQuestion].question}
        </p>

        <input
          type='text'
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
          autoFocus
          className='w-full px-4 py-3 text-center bg-black border-2 border-green-500 text-green-400 focus:border-green-300 focus:outline-none transition-all gaming-glow pixel-text'
          placeholder='Tu respuesta'
        />
      </div>

      {error && (
        <div className='text-center mb-4'>
          <p className='text-red-500 text-xs pixel-text'>
            ❌ RESPUESTA INCORRECTA - PERDISTE 1 HP
          </p>
        </div>
      )}

      <button
        type='submit'
        disabled={!answer.trim()}
        className='w-full px-6 py-4 bg-green-500 hover:bg-green-400 text-black font-bold text-sm transition-all pixel-text gaming-glow-strong border-4 border-green-600 active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        ▶ VERIFICAR
      </button>
    </form>
  );
};

import { useId } from "react";

interface Step2Props {
	guests: { id: number; name: string }[];
	selectedGuest: number | null;
	goNextStep: () => void;
	setSelectedGuest: (id: number | null) => void;
}

export const Step2 = ({ guests, selectedGuest, goNextStep }: Step2Props) => {
	const step2Id = useId();
	const guestName =
		guests.find((g) => g.id === selectedGuest)?.name || "Invitado";

	return (
		<div id={`content-area-${step2Id}`}>
			<div className="text-center mb-6 gaming-glow">
				<div className="text-6xl mb-4">🎮</div>
			</div>

			<h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-green-400 pixel-heading gaming-glow leading-tight">
				¡BIENVENID@ {guestName.toUpperCase()}!
			</h2>

			<p className="text-center text-green-300 mb-6 text-sm pixel-text px-4">
				Estás a punto de iniciar una aventura épica para el cumpleaños #10 de
				Santiago. ¿Estás listo?
			</p>

			<div className="bg-black border-2 border-green-500 p-6 mb-6 relative">
				<div className="absolute -top-1 -left-1 w-3 h-3 bg-green-500"></div>
				<div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500"></div>
				<div className="absolute -bottom-1 -left-1 w-3 h-3 bg-green-500"></div>
				<div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500"></div>

				<p className="text-green-400 text-center text-xs pixel-text">
					📍 Prepárate para descubrir los detalles de esta misión especial
				</p>
			</div>

			<button
				onClick={goNextStep}
				type="submit"
				className="w-full px-6 py-4 bg-green-500 hover:bg-green-400 text-black font-bold text-sm transition-all pixel-text gaming-glow-strong border-4 border-green-600 active:translate-y-1"
			>
				▶ COMENZAR
			</button>
		</div>
	);
};

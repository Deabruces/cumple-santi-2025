import { Countdown } from "@components/Countdown";
import { get } from "@repositories/RepositoryComposite";
import { useId, useState } from "react";

const GuestsRepository = await get("guestsClient");

interface Step1Props {
	guests: { id: number; name: string }[];
	selectedGuest: number | null;
	goNextStep: () => void;
	setSelectedGuest: (id: number | null) => void;
	health: number;
	setHealth: (health: number) => void;
}

export const Step1 = ({
	guests,
	setSelectedGuest,
	selectedGuest,
	goNextStep,
	health,
	setHealth,
}: Step1Props) => {
	const step1Id = useId();

	const [codigo, setCodigo] = useState("");
	const [invalidCount, setInvalidCount] = useState(0);
	const [hasError, setHasError] = useState(false);

	const handleGuestSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (setSelectedGuest) {
			setSelectedGuest(Number(e.target.value));
		}
	};

	const handleCodigoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCodigo(e.target.value.toLowerCase());
	};

	const validateCodigo = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!selectedGuest) {
			setHasError(true);
			return;
		}
		const { isValid, hasCompletedGame, roomAssigned } =
			await GuestsRepository.verifyUser({
				code: codigo,
				userId: selectedGuest,
			});
		if (!isValid) {
			const newCount = invalidCount + 1;
			const newHealth = health - 1;

			setInvalidCount(newCount);
			setHealth(newHealth);
			setHasError(true);

			if (newHealth > 0) {
				setTimeout(() => setHasError(false), 3000);
			}
		} else {
			setHasError(false);
			// If user already completed, redirect to activities with their info
			if (hasCompletedGame && roomAssigned) {
				const guestName =
					guests.find((g) => g.id === selectedGuest)?.name || "Invitado";
				sessionStorage.setItem("rsvpCompleted", "true");
				sessionStorage.setItem("guestName", guestName);
				sessionStorage.setItem("guestRoom", roomAssigned);
				window.location.href = "/actividades";
			} else {
				goNextStep();
			}
		}
	};

	const handleRestart = () => {
		// Reset step 1 state
		setCodigo("");
		setInvalidCount(0);
		setHasError(false);
		setSelectedGuest(null);
		setHealth(3);
	};

	if (health <= 0) {
		return (
			<div id={`content-area-${step1Id}`} className="text-center">
				<div className="mb-6 gaming-glow">
					<div className="text-6xl mb-4">💀</div>
				</div>

				<h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-red-500 pixel-heading gaming-glow leading-tight animate-pulse">
					GAME OVER
				</h2>

				<div className="bg-red-900 bg-opacity-30 border-2 border-red-600 p-6 mb-6">
					<p className="text-red-400 pixel-text text-sm mb-2">
						❌ Perdiste todos tus HP
					</p>
					<p className="text-red-300 pixel-text text-xs">
						Verifica tu código con Santiago e intenta nuevamente
					</p>
				</div>

				<button
					onClick={handleRestart}
					type="reset"
					className="w-full px-6 py-4 bg-red-500 hover:bg-red-400 text-white font-bold text-sm transition-all pixel-text gaming-glow-strong border-4 border-red-600 active:translate-y-1"
				>
					🔄 REINICIAR
				</button>
			</div>
		);
	}

	return (
		<form id={`content-area-${step1Id}`} onSubmit={validateCodigo}>
			<div className="text-center mb-4 gaming-glow ">
				<div className="text-6xl mb-2">🎫</div>
			</div>

			<h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-green-400 pixel-heading gaming-glow leading-tight py-2">
				INVITACIÓN ENCRIPTADA
			</h2>

			<p className="text-center text-green-300 mb-4 text-xs pixel-text py-4">
				Solo puedo decir que es el 19 de octubre a las 15:45 pm
			</p>
		
			<div className="space-y-4 mb-4">
				<div className="bg-black border-2 border-green-500 p-4 relative">
					<div className="absolute -top-1 -left-1 w-3 h-3 bg-green-500"></div>
					<div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500"></div>
					<div className="absolute -bottom-1 -left-1 w-3 h-3 bg-green-500"></div>
					<div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500"></div>

					<label
						htmlFor={`nombre-select-${step1Id}`}
						className="block text-xs font-bold text-green-400 mb-2 pixel-text"
					>
						TU NOMBRE *
					</label>
					<select
						id={`nombre-select-${step1Id}`}
						defaultValue=""
						required
						className="w-full px-4 py-3 bg-black border-2 border-green-500 text-green-400 pixel-text focus:outline-none focus:border-green-300 transition-all gaming-glow text-sm"
						onChange={handleGuestSelect}
					>
						<option value="" disabled className="bg-black text-green-400 py-3">
							Selecciona tu nombre
						</option>
						{guests.length > 0 &&
							guests
								.sort((a, b) => a.name.localeCompare(b.name))
								.map((guest) => (
									<option
										key={guest.id}
										value={guest.id}
										className="bg-black text-green-400 py-3"
									>
										{guest.name}
									</option>
								))}
					</select>
				</div>

				<div className="bg-black border-2 border-green-500 p-4 relative">
					<div className="absolute -top-1 -left-1 w-3 h-3 bg-green-500"></div>
					<div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500"></div>
					<div className="absolute -bottom-1 -left-1 w-3 h-3 bg-green-500"></div>
					<div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500"></div>

					<label
						htmlFor={`codigo-input-${step1Id}`}
						className="block text-xs font-bold text-green-400 mb-2 pixel-text"
					>
						CÓDIGO *
					</label>
					<input
						type="text"
						id={`codigo-input-${step1Id}`}
						maxLength={10}
						required
						className="w-full px-4 py-3 text-center text-lg font-bold bg-black border-2 border-green-500 text-green-400 focus:border-green-300 focus:outline-none transition-all gaming-glow pixel-text uppercase"
						placeholder="CÓDIGO"
						value={codigo}
						onChange={handleCodigoChange}
					/>
				</div>
			</div>
			
			<div
				id={`codigo-feedback-${step1Id}`}
				className="text-center mb-4 min-h-[24px]"
			>
				<p
					id={`codigo-error-${step1Id}`}
					className={`text-red-500 text-xs pixel-text ${
						hasError ? "" : "hidden"
					}`}
				>
					❌ CODIGO INCORRECTO INTENTADO {invalidCount}
					{invalidCount === 1 ? " VEZ" : " VECES"}
				</p>
			</div>

			<button
				id={`nombre-next-${step1Id}`}
				disabled={!codigo}
				type="submit"
				className="w-full px-6 py-4 bg-green-500 hover:bg-green-400 text-black font-bold text-sm transition-all pixel-text gaming-glow-strong border-4 border-green-600 active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				▶ VERIFICAR
			</button>
			<div className="my-10">
				<Countdown />
			</div>
		</form>
	);
};

import { get } from "@repositories/RepositoryComposite";
import { useEffect, useId, useState } from "react";

const GuestsRepository = await get("guestsClient");

interface Step5Props {
	guests: { id: number; name: string }[];
	selectedGuest: number | null;
	goNextStep: () => void;
	setSelectedGuest: (id: number | null) => void;
	selectedRoom: string | null;
	setSelectedRoom: (room: string) => void;
}

const ROOMS = [
	{
		id: "mineros",
		name: "Los Mineros",
		emoji: "⛏️",
		description:
			"Descubre los secretos de la mina abandonada y encuentra la salida",
		capacity: 6,
	},
	{
		id: "bajo-presion",
		name: "Bajo Presión",
		emoji: "🚢",
		description:
			"Encuentra los tanques de oxígeno ocultos antes de que sea tarde",
		capacity: 6,
	},
];

export const Step5 = ({
	goNextStep,
	selectedRoom,
	setSelectedRoom,
	selectedGuest,
}: Step5Props) => {
	const step5Id = useId();

	const [tempSelection, setTempSelection] = useState<string | null>(
		selectedRoom,
	);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [roomsStatus, setRoomsStatus] = useState<{
		mineros: { count: number; guests: { id: number; name: string }[] };
		"bajo-presion": { count: number; guests: { id: number; name: string }[] };
	} | null>(null);

	useEffect(() => {
		const fetchRoomsStatus = async () => {
			try {
				const status = await GuestsRepository.getRoomsStatus();
				setRoomsStatus(status);

				// Auto-assign if one room is full
				if (status.mineros.count >= 6 && status["bajo-presion"].count < 6) {
					setTempSelection("bajo-presion");
				} else if (
					status["bajo-presion"].count >= 6 &&
					status.mineros.count < 6
				) {
					setTempSelection("mineros");
				}
			} catch (error) {
				console.error("Error fetching rooms status:", error);
			}
		};
		fetchRoomsStatus();
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (tempSelection && selectedGuest && roomsStatus) {
			// Check if selected room is full and auto-assign to the other room silently
			const roomCount =
				roomsStatus[tempSelection as keyof typeof roomsStatus].count;
			let finalRoom = tempSelection;

			if (roomCount >= 6) {
				// Auto-assign to the other room silently
				finalRoom = tempSelection === "mineros" ? "bajo-presion" : "mineros";
			}

			setIsSubmitting(true);
			try {
				await GuestsRepository.assignRoom({
					userId: selectedGuest,
					room: finalRoom,
				});
				setSelectedRoom(finalRoom);
				goNextStep();
			} catch (error) {
				console.error("Error assigning room:", error);
				alert("Error al guardar la sala. Por favor intenta de nuevo.");
			} finally {
				setIsSubmitting(false);
			}
		}
	};

	return (
		<form id={`content-area-${step5Id}`} onSubmit={handleSubmit}>
			<div className="text-center mb-4 gaming-glow">
				<div className="text-6xl mb-2">🔐</div>
			</div>

			<h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-green-400 pixel-heading gaming-glow leading-tight">
				SELECCIONA TU SALA
			</h2>

			<p className="text-center text-green-300 mb-6 text-xs pixel-text">
				Elige en qué escape room quieres jugar
			</p>

			<div className="space-y-4 mb-6">
				{ROOMS.map((room) => {
					const roomData = roomsStatus?.[room.id as keyof typeof roomsStatus];
					const currentCount = roomData?.count || 0;
					const isFull = currentCount >= 6;
					const progressWidth = (currentCount / room.capacity) * 100;

					return (
						<label
							key={room.id}
							className={`block transition-all ${
								isFull
									? "opacity-60 cursor-not-allowed"
									: "cursor-pointer hover:scale-102"
							} ${tempSelection === room.id ? "scale-105" : ""}`}
						>
							<input
								type="radio"
								name="room"
								value={room.id}
								checked={tempSelection === room.id}
								onChange={() => !isFull && setTempSelection(room.id)}
								disabled={isFull}
								className="sr-only"
							/>
							<div
								className={`bg-black border-4 p-4 relative transition-all ${
									tempSelection === room.id
										? "border-green-300 gaming-glow-strong"
										: isFull
											? "border-red-500"
											: "border-green-500 gaming-glow"
								}`}
							>
								<div className="absolute -top-1 -left-1 w-3 h-3 bg-green-500"></div>
								<div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500"></div>
								<div className="absolute -bottom-1 -left-1 w-3 h-3 bg-green-500"></div>
								<div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500"></div>

								<div className="flex items-start gap-3 mb-3">
									<div className="text-4xl">{room.emoji}</div>
									<div className="flex-1">
										<div className="flex items-center justify-between mb-1">
											<p className="text-green-400 font-bold pixel-text">
												{room.name}
											</p>
											{isFull && (
												<span className="text-red-500 text-xs pixel-text">
													LLENA
												</span>
											)}
										</div>
										<p className="text-green-300 text-xs pixel-text mb-2">
											{room.description}
										</p>
										<div className="flex items-center gap-2 mb-2">
											<div className="flex-1 h-2 bg-black border border-green-500">
												<div
													className={`h-full transition-all ${
														isFull ? "bg-red-500" : "bg-green-500"
													}`}
													style={{ width: `${progressWidth}%` }}
												></div>
											</div>
											<p
												className={`text-xs pixel-text ${isFull ? "text-red-500" : "text-green-400"}`}
											>
												{currentCount}/{room.capacity}
											</p>
										</div>
									</div>
								</div>

								{/* Show assigned kids */}
								{roomData && roomData.guests.length > 0 && (
									<div className="border-t border-green-800 pt-2">
										<p className="text-green-400 text-xs pixel-text mb-1">
											Confirmados:
										</p>
										<div className="flex flex-wrap gap-1">
											{roomData.guests.map((guest) => (
												<span
													key={guest.id}
													className="text-green-300 text-xs pixel-text bg-green-900 bg-opacity-30 px-2 py-1 border border-green-700"
												>
													{guest.name}
												</span>
											))}
										</div>
									</div>
								)}
							</div>
						</label>
					);
				})}
			</div>

			<div className="bg-yellow-900 bg-opacity-30 border-2 border-yellow-600 p-3 mb-4">
				<p className="text-yellow-400 text-xs pixel-text text-center">
					⚠️ Al confirmar tu sala estarás confirmando tu asistencia al cumpleaños
				</p>
			</div>

			<button
				type="submit"
				disabled={!tempSelection || isSubmitting}
				className="w-full px-6 py-4 bg-green-500 hover:bg-green-400 text-black font-bold text-sm transition-all pixel-text gaming-glow-strong border-4 border-green-600 active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isSubmitting ? "⏳ GUARDANDO..." : "✓ CONFIRMAR ASISTENCIA"}
			</button>
		</form>
	);
};

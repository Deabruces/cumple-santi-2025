import { get } from "@repositories/RepositoryCompositeClient";
import { useEffect, useState } from "react";

const GuestsRepository = await get("guestsClient");

export const RoomAssignments = () => {
	const [roomsStatus, setRoomsStatus] = useState<{
		mineros: { count: number; guests: { id: number; name: string }[] };
		"bajo-presion": { count: number; guests: { id: number; name: string }[] };
	} | null>(null);
	const [currentGuestName, setCurrentGuestName] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const status = await GuestsRepository.getRoomsStatus();
				setRoomsStatus(status);
			} catch (error) {
				console.error("Error fetching rooms status:", error);
			}
		};

		const guestName = sessionStorage.getItem("guestName");
		setCurrentGuestName(guestName);

		fetchData();
	}, []);

	if (!roomsStatus) return null;

	const rooms = [
		{
			id: "mineros",
			name: "Los Mineros",
			emoji: "⛏️",
			data: roomsStatus.mineros,
		},
		{
			id: "bajo-presion",
			name: "Bajo Presión",
			emoji: "🚢",
			data: roomsStatus["bajo-presion"],
		},
	];

	return (
		<div className="mt-4 bg-black border-2 border-green-500 p-4 relative">
			<div className="absolute -top-1 -left-1 w-2 h-2 bg-green-500"></div>
			<div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500"></div>
			<div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-500"></div>
			<div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500"></div>

			<p className="text-green-400 text-xs font-bold pixel-text mb-3 text-center">
				👥 JUGADORES CONFIRMADOS
			</p>

			<div className="grid md:grid-cols-2 gap-4">
				{rooms.map((room) => (
					<div key={room.id} className="bg-black border border-green-700 p-3">
						<div className="flex items-center justify-between mb-2">
							<p className="text-green-400 text-xs font-bold pixel-text">
								{room.emoji} {room.name}
							</p>
							<span className="text-green-300 text-xs pixel-text">
								{room.data.count}/6
							</span>
						</div>

						{room.data.guests.length > 0 ? (
							<div className="space-y-1">
								{room.data.guests.map((guest) => {
									const isCurrentUser = guest.name === currentGuestName;
									return (
										<div
											key={guest.id}
											className={`text-xs pixel-text px-2 py-1 ${
												isCurrentUser
													? "bg-yellow-500 text-black border border-yellow-600 font-bold animate-pulse"
													: "bg-green-900 bg-opacity-30 text-green-300 border border-green-700"
											}`}
										>
											{isCurrentUser && "★ "}
											{guest.name}
										</div>
									);
								})}
							</div>
						) : (
							<p className="text-green-600 text-xs pixel-text text-center py-2">
								Sin confirmaciones aún
							</p>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

import { useEffect, useState } from "react";

export const Countdown = () => {
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	useEffect(() => {
		const targetDate = new Date("2025-10-19T16:00:00").getTime();

		const updateCountdown = () => {
			const now = Date.now();
			const difference = targetDate - now;

			if (difference > 0) {
				setTimeLeft({
					days: Math.floor(difference / (1000 * 60 * 60 * 24)),
					hours: Math.floor(
						(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
					),
					minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
					seconds: Math.floor((difference % (1000 * 60)) / 1000),
				});
			} else {
				setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
			}
		};

		updateCountdown();
		const interval = setInterval(updateCountdown, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="bg-black border-4 border-green-500 p-6 gaming-glow-strong relative">
			<div className="absolute -top-2 -left-2 w-6 h-6 bg-green-500"></div>
			<div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500"></div>
			<div className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-500"></div>
			<div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500"></div>

			<h3 className="text-2xl md:text-3xl font-bold mb-4 text-center text-green-400 pixel-heading">
				⏰ ESTE MENSAJE SE AUTODESTRUIRA EN 💣
			</h3>

			<div className="grid grid-cols-4 gap-2 md:gap-3 mb-4">
				<div className="bg-black border-2 border-green-500 p-2 md:p-3 text-center">
					<div className="text-xl md:text-3xl font-bold text-green-400 pixel-heading">
						{timeLeft.days}
					</div>
					<div className="text-[0.6rem] md:text-xs text-green-300 pixel-text mt-1">
						DÍAS
					</div>
				</div>
				<div className="bg-black border-2 border-green-500 p-2 md:p-3 text-center">
					<div className="text-xl md:text-3xl font-bold text-green-400 pixel-heading">
						{timeLeft.hours}
					</div>
					<div className="text-[0.6rem] md:text-xs text-green-300 pixel-text mt-1">
						HRS
					</div>
				</div>
				<div className="bg-black border-2 border-green-500 p-2 md:p-3 text-center">
					<div className="text-xl md:text-3xl font-bold text-green-400 pixel-heading">
						{timeLeft.minutes}
					</div>
					<div className="text-[0.6rem] md:text-xs text-green-300 pixel-text mt-1">
						MIN
					</div>
				</div>
				<div className="bg-black border-2 border-green-500 p-2 md:p-3 text-center">
					<div className="text-xl md:text-3xl font-bold text-green-400 pixel-heading">
						{timeLeft.seconds}
					</div>
					<div className="text-[0.6rem] md:text-xs text-green-300 pixel-text mt-1">
						SEG
					</div>
				</div>
			</div>

			<div className="bg-yellow-900 bg-opacity-40 border-2 border-yellow-500 p-4 animate-pulse">
				<p className="text-yellow-400 text-center pixel-text text-sm font-bold">
					⚠️ IMPORTANTE: Llegar 15 minutos antes (15:45)
				</p>
				<p className="text-yellow-300 text-center pixel-text text-xs mt-1">
					Para iniciar la aventura a tiempo
				</p>
			</div>
		</div>
	);
};

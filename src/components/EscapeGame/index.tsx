import { get } from "@repositories/RepositoryCompositeClient";
import { useEffect, useId, useState } from "react";
import type { Guest } from "../../db/schemas";
import { Step1 } from "./steps/step1";
import { Step2 } from "./steps/step2";
import { Step3 } from "./steps/step3";
import { Step4 } from "./steps/step4";
import { Step5 } from "./steps/step5";
import { Step6 } from "./steps/step6";

const GuestsRepository = await get("guestsClient");
export const EscapeGameReact = () => {
	const [step, setStep] = useState(1);
	const [health, setHealth] = useState(3);
	const [guests, setGuests] = useState<Pick<Guest, "id" | "name">[]>([]);
	const [noInvitees, setNoInvitees] = useState(false);
	const [selectedGuest, setSelectedGuest] = useState<number | null>(null);
	const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
	const idHealth = useId();
	const idProgressBar = useId();
	const idCurrentStage = useId();
	useEffect(() => {
		const fetchGuests = async () => {
			const Resp = await GuestsRepository.getAllGuests();
			if(Resp.length === 0){
				setNoInvitees(true);
				return;
			}
			setGuests(Resp);
		};
		fetchGuests();
	}, []);

	const goNextStep = () => {
		setStep((s) => s + 1);
	};

	const goPreviousStep = () => {
		setStep((s) => (s > 1 ? s - 1 : 1));
		setHealth(3);
	};

	// Calculate progress percentage
	const progressPercentage = ((step - 1) / 5) * 100;
	if (noInvitees)
		return (
			<div className="bg-black border-4 border-green-500 p-6 md:p-8 gaming-glow-strong animate-scale-in relative">
				<div className="absolute -top-2 -left-2 w-6 h-6 bg-green-500"></div>
				<div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500"></div>
				<div className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-500"></div>
				<div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500"></div>
				<h2 className="py-48 grid place-items-center pixel-heading text-center">
					La Base de datos esta vacia invita a alguien
				</h2>
			</div>
		);
	if (guests.length === 0)
		return (
			<div className="bg-black border-4 border-green-500 p-6 md:p-8 gaming-glow-strong animate-scale-in relative">
				<div className="absolute -top-2 -left-2 w-6 h-6 bg-green-500"></div>
				<div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500"></div>
				<div className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-500"></div>
				<div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500"></div>
				<h2 className="py-48 grid place-items-center pixel-heading">
					Loading...
				</h2>
			</div>
		);

	return (
		<div className="bg-black border-4 border-green-500 p-6 md:p-8 gaming-glow-strong animate-scale-in relative">
			{/* Pixel Corners */}
			<div className="absolute -top-2 -left-2 w-6 h-6 bg-green-500"></div>
			<div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500"></div>
			<div className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-500"></div>
			<div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500"></div>

			{/* Progress Indicator */}
			<div className="mb-6">
				<div className="flex justify-between items-center mb-2">
					<p className="text-green-400 text-xs pixel-text">
						ETAPA <span id={`current-stage-${idCurrentStage}`}>{step}</span>/6
					</p>
					<p
						className="text-green-400 text-xs pixel-text"
						id={`hp-display-${idHealth}`}
					>
						HP: {Array.from({ length: health }, (_) => "❤️").join("")}
					</p>
				</div>
				<div className="h-2 bg-black border-2 border-green-500">
					<div
						id={`progress-bar-${idProgressBar}`}
						className="h-full bg-green-500 transition-all duration-300"
						style={{ width: `${progressPercentage}%` }}
					></div>
				</div>
			</div>

			{/* Content Area (changes based on stage) */}
			{step === 1 && (
				<Step1
					guests={guests}
					goNextStep={goNextStep}
					setSelectedGuest={setSelectedGuest}
					selectedGuest={selectedGuest}
					health={health}
					setHealth={setHealth}
				/>
			)}
			{step === 2 && (
				<Step2
					guests={guests}
					goNextStep={goNextStep}
					setSelectedGuest={setSelectedGuest}
					selectedGuest={selectedGuest}
				/>
			)}
			{step === 3 && (
				<Step3
					guests={guests}
					goNextStep={goNextStep}
					setSelectedGuest={setSelectedGuest}
					selectedGuest={selectedGuest}
					health={health}
					setHealth={setHealth}
					goPreviousStep={goPreviousStep}
				/>
			)}
			{step === 4 && (
				<Step4
					guests={guests}
					goNextStep={goNextStep}
					setSelectedGuest={setSelectedGuest}
					selectedGuest={selectedGuest}
				/>
			)}
			{step === 5 && (
				<Step5
					guests={guests}
					goNextStep={goNextStep}
					setSelectedGuest={setSelectedGuest}
					selectedGuest={selectedGuest}
					selectedRoom={selectedRoom}
					setSelectedRoom={setSelectedRoom}
				/>
			)}
			{step === 6 && (
				<Step6
					guests={guests}
					goNextStep={goNextStep}
					setSelectedGuest={setSelectedGuest}
					selectedGuest={selectedGuest}
					selectedRoom={selectedRoom}
				/>
			)}
		</div>
	);
};

import Cookies from "js-cookie";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>;
	userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const COOKIE_NAME = "install-prompt-dismissed";
const COOKIE_DAYS = 2;

function setCookie(name: string, value: string, days: number) {
	Cookies.set(name, value, {
		expires: days,
		sameSite: "Lax",
		secure: window.location.protocol === "https:",
	});
}

function getCookie(name: string): string | null {
	return Cookies.get(name) ?? null;
}

export default function InstallPrompt() {
	const [deferredPrompt, setDeferredPrompt] =
		useState<BeforeInstallPromptEvent | null>(null);
	const [showInstallPrompt, setShowInstallPrompt] = useState(false);

	useEffect(() => {
		// Check if user dismissed the prompt in the last 2 days
		const dismissed = getCookie(COOKIE_NAME);
		if (dismissed === "true") {
			return;
		}

		const handler = (e: Event) => {
			e.preventDefault();
			setDeferredPrompt(e as BeforeInstallPromptEvent);
			setShowInstallPrompt(true);
		};

		window.addEventListener("beforeinstallprompt", handler);

		return () => window.removeEventListener("beforeinstallprompt", handler);
	}, []);

	const handleInstallClick = async () => {
		if (!deferredPrompt) return;

		deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;

		if (outcome === "accepted") {
			setDeferredPrompt(null);
			setShowInstallPrompt(false);
		}
	};

	const handleDismiss = () => {
		setCookie(COOKIE_NAME, "true", COOKIE_DAYS);
		setShowInstallPrompt(false);
	};

	if (!showInstallPrompt) return null;

	return (
		<div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black via-black/95 to-transparent">
			<div className="max-w-2xl mx-auto bg-green-900/30 border-2 border-green-500 rounded-lg p-4 backdrop-blur-sm">
				<div className="flex items-start justify-between gap-4">
					<div className="flex-1">
						<h3 className="text-lg font-bold text-green-400 mb-2">
							📱 Instala la app del cumple
						</h3>
						<p className="text-sm text-green-300/80 mb-3">
							Instala en tu dispositivo para acceso rápido y navegación directa
							con Waze o Maps
						</p>
						<div className="flex gap-3">
							<button
								onClick={handleInstallClick}
								type="button"
								className="px-6 py-2 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 transition-all transform hover:scale-105 shadow-lg shadow-green-500/50"
							>
								Instalar
							</button>
							<button
								onClick={handleDismiss}
								type="button"
								className="px-6 py-2 bg-transparent text-green-400 font-bold rounded-lg border-2 border-green-500/50 hover:border-green-500 transition-all"
							>
								Ahora no
							</button>
						</div>
					</div>
					<button
						onClick={handleDismiss}
						type="button"
						className="text-green-500 hover:text-green-400 transition-colors"
						aria-label="Cerrar"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>Close</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}

import type { GuestsRepositoryClient } from "./GuestsRepositoryClient";
import type { GuestsRepository } from "./GuestsRepositoryServer";

type RepositoryTypeMap = {
	guestsClient: typeof GuestsRepositoryClient;
	guestsServer: typeof GuestsRepository;
	// Add other repositories here as needed
};

export async function get<K extends keyof RepositoryTypeMap>(
	repoId: K,
): Promise<RepositoryTypeMap[K]> {
	if (repoId === "guestsClient") {
		const repo = (await import("./GuestsRepositoryClient").then(
			(mod) => mod.GuestsRepositoryClient,
		)) as typeof GuestsRepositoryClient;
		return repo;
	}
	if (repoId === "guestsServer") {
		const repo = (await import("./GuestsRepositoryServer").then(
			(mod) => mod.GuestsRepository,
		)) as RepositoryTypeMap["guestsServer"];
		return repo;
	}
	throw new Error(`Repository with id ${repoId} not found.`);
}
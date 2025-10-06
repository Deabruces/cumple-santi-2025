import type { GuestsRepositoryClient } from "./GuestsRepositoryClient";
import type { GuestsRepository } from "./GuestsRepositoryServer";

type RepositoryTypeMap = {
	guestsClient: typeof GuestsRepositoryClient;
	guestsServer: typeof GuestsRepository;
	// Add other repositories here as needed
};
type RepositoryUnion = typeof GuestsRepositoryClient | typeof GuestsRepository;
export function get(input:"guestsClient"): Promise<typeof GuestsRepositoryClient>;
export function get(input:"guestsServer"): Promise<typeof GuestsRepository>;
export async function get(repoId: keyof RepositoryTypeMap): Promise<RepositoryUnion>{
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
};
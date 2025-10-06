import type { GuestsRepositoryClient } from "./GuestsRepositoryClient";

type RepositoryTypeMap = {
	guestsClient: typeof GuestsRepositoryClient;
};
type RepositoryUnion = typeof GuestsRepositoryClient;
export function get(input:"guestsClient"): Promise<typeof GuestsRepositoryClient>;
export async function get(repoId: keyof RepositoryTypeMap): Promise<RepositoryUnion>{
	if (repoId === "guestsClient") {
		const repo = (await import("./GuestsRepositoryClient").then(
			(mod) => mod.GuestsRepositoryClient,
		)) as typeof GuestsRepositoryClient;
		return repo;
	}
	throw new Error(`Repository with id ${repoId} not found.`);
};
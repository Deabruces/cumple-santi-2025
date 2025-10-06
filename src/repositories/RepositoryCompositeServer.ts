import type { GuestsRepositoryServer } from "./GuestsRepositoryServer";

type RepositoryTypeMap = {
	guestsServer: typeof GuestsRepositoryServer;
	// Add other repositories here as needed
};
type RepositoryUnion = typeof GuestsRepositoryServer;
export function get(input:"guestsServer"): Promise<typeof GuestsRepositoryServer>;
export async function get(repoId: keyof RepositoryTypeMap): Promise<RepositoryUnion>{
	if (repoId === "guestsServer") {
		const repo = (await import("./GuestsRepositoryServer").then(
			(mod) => mod.GuestsRepositoryServer,
		)) as RepositoryTypeMap["guestsServer"];
		return repo;
	}
	throw new Error(`Repository with id ${repoId} not found.`);
};
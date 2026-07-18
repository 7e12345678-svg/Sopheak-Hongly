export interface Game {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
  featured: boolean;
  status: boolean;
  sortOrder: number;
}

export async function getGames(): Promise<Game[]> {
  const res = await fetch("/api/games", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch games");
  }

  const data = await res.json();

  return data.games ?? [];
}
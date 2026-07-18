export interface Package {
  _id: string;
  gameId: string;
  gameName: string;
  gameSlug: string;
  gameImage: string;
  name: string;
  price: number;
}

export async function getPackages(): Promise<Package[]> {
  const res = await fetch("/api/packages", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch packages");
  }

  const data = await res.json();

  return data.packages ?? [];
}
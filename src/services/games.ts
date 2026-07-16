export async function getGames() {
  const res = await fetch("/api/games", {
    cache: "no-store",
  });

  const data = await res.json();

  return data.games || [];
}
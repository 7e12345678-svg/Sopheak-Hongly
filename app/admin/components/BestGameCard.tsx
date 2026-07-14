interface Props {
  game: string;
  total: number;
}

const gameImages: Record<string, string> = {
  "Mobile Legend": "/images/mlbb.jpg",
  "PUBG Mobile": "/images/pubg.jpg",
  "Free Fire": "/images/freefire.jpg",
  Roblox: "/images/roblox.jpg",
};

export default function BestGameCard({
  game,
  total,
}: Props) {
  return (
    <div className="rounded-2xl bg-slate-900 border border-cyan-500 p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400">
            🏆 Best Selling Game
          </p>

          <h2 className="text-3xl font-bold text-cyan-400 mt-3">
            {game}
          </h2>

          <p className="text-gray-500 mt-2">
            {total} Orders
          </p>
        </div>

        <img
          src={gameImages[game] || "/images/default.jpg"}
          alt={game}
          className="w-20 h-20 rounded-xl object-cover"
        />
      </div>
    </div>
  );
}
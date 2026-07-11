"use client";

interface TopGamesProps {
  analytics: any;
}

export default function TopGames({
  analytics,
}: TopGamesProps) {

  const games = analytics.topGames;

  // ... JSX ដដែល

  return (
    <div className="bg-[#111827] rounded-2xl border border-slate-700 p-6 shadow-xl">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        🏆 Top Selling Games
      </h2>

      <div className="space-y-5">

        {games.map((game: any, index: number) => (

          <div
            key={game.name}
            className="flex justify-between items-center border-b border-slate-700 pb-3"
          >

            <div>

              <p className="font-semibold text-lg">
                #{index + 1} {game.name}
              </p>

              <p className="text-gray-400 text-sm">
                {game.orders} Orders
              </p>

            </div>

            <span className="text-green-400 font-bold">
              ▲
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}
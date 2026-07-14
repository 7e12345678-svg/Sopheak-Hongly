"use client";

import type { Analytics } from "@/types";

interface TopGamesProps {
  analytics: Analytics;
}

export default function TopGames({
  analytics,
}: TopGamesProps) {
  const games = analytics.topGames;

  return (
    <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6 shadow-xl">
      <h2 className="mb-6 text-2xl font-bold text-cyan-400">
        🏆 Top Selling Games
      </h2>

      <div className="space-y-5">
        {games.map((game, index) => (
          <div
            key={game.name}
            className="flex items-center justify-between border-b border-slate-700 pb-3"
          >
            <div>
              <p className="text-lg font-semibold">
                #{index + 1} {game.name}
              </p>

              <p className="text-sm text-gray-400">
                {game.orders} Orders
              </p>
            </div>

            <span className="font-bold text-green-400">
              ▲
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
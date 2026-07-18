"use client";

import { games } from "./games";
import GameCard from "./GameCard";
export default function FeaturedGames() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-5xl font-bold text-white">
            Featured Games
          </h2>

          <p className="mt-5 text-slate-400">
            Top up your favorite games instantly.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {games.map((game) => (
            <GameCard key={game.id} {...game} />
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import useGames from "@/app/hooks/useGames";

export default function Games() {
  const router = useRouter();

  const { games, loading } = useGames();

  if (loading) {
    return (
      <section
        id="games"
        className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cyan-400 mb-10">
            Popular Games
          </h2>

          <p className="text-gray-400">Loading games...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="games"
      className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <h2 className="text-center font-bold text-cyan-400 text-3xl sm:text-4xl lg:text-5xl mb-10">
          Popular Games
        </h2>

        {/* Games */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-5">

          {games.map((game) => (
            <div
              key={game._id}
              onClick={() =>
                router.push(
                  `/topup?game=${encodeURIComponent(game.name)}`
                )
              }
              className="bg-slate-900 rounded-2xl overflow-hidden cursor-pointer border border-slate-800 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-square">
                <Image
                  src={game.image}
                  alt={game.name}
                  fill
                  className="object-cover"
                  sizes="(max-width:640px) 33vw,
                         (max-width:768px) 33vw,
                         (max-width:1024px) 25vw,
                         25vw"
                />
              </div>

              {/* Content */}
              <div className="p-2 sm:p-4 text-center">
                <h3 className="text-[11px] sm:text-base font-semibold line-clamp-1">
                  {game.name}
                </h3>

                <button className="mt-2 w-full rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-[11px] sm:text-sm font-bold py-1.5 sm:py-2 transition">
                  Top Up
                </button>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
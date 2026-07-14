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
        className="bg-slate-950 py-20 text-white"
      >
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-4xl font-bold text-cyan-400">
            Featured Games
          </h2>

          <p className="mt-6 text-slate-400">
            Loading games...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="games"
      className="bg-slate-950 px-4 py-20 text-white"
    >
      <div className="mx-auto max-w-7xl">

        {/* Badge */}

        <div className="flex justify-center">

          <div className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-6 py-2">
            <span className="text-sm font-bold tracking-widest text-cyan-400">
              FEATURED GAMES
            </span>
          </div>

        </div>

        {/* Title */}

        <h2 className="mt-8 text-center text-4xl font-extrabold md:text-6xl">
          Choose Your Favorite Game
        </h2>

        <p className="mx-auto mt-5 max-w-3xl text-center text-slate-400">
          Select your favorite game and enjoy instant top up
          with secure payment and fast delivery.
        </p>

        {/* Games */}

        <div
  className="
    mt-14
    grid
    grid-cols-3
    md:grid-cols-3
    lg:grid-cols-3
    gap-4
    lg:gap-6
  "
>

          {games.map((game) => (

            <div
              key={game._id}
              onClick={() =>
                router.push(
                  `/topup?game=${encodeURIComponent(
                    game.name
                  )}`
                )
              }
              className="
              cursor-pointer
              overflow-hidden
              rounded-2xl
              border
              border-slate-800
              bg-slate-900
              transition-all
              duration-300
              hover:-translate-y-2
              hover:border-cyan-400
              hover:shadow-xl
              hover:shadow-cyan-500/20
              "
            >

              {/* HOT */}

              <div className="absolute z-20 m-2 rounded-full bg-cyan-500 px-3 py-1 text-[10px] font-bold text-black">
                🔥 HOT
              </div>

              {/* Image */}

              <div className="relative h-28 sm:h-40 lg:h-56 overflow-hidden">

                <Image
                  src={game.image}
                  alt={game.name}
                  fill
                  className="object-cover transition duration-500 hover:scale-110"
                />

              </div>

              {/* Content */}

              <div className="p-3">

                <h3 className="line-clamp-1 text-center text-[11px] font-bold sm:text-base">
                  {game.name}
                </h3>

                <p className="mt-2 text-center text-[10px] text-slate-400 sm:text-sm">
                  Instant Delivery
                </p>

                <button
                  className="
                  mt-4
                  w-full
                  rounded-xl
                  bg-cyan-500
                  py-2
                  text-[11px]
                  font-bold
                  text-black
                  transition
                  hover:bg-cyan-400
                  sm:text-sm
                  "
                >
                  ⚡ Top Up Now
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}
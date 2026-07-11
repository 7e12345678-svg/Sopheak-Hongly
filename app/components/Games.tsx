"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Games() {
  const router = useRouter();

  const games = [
    {
      name: "Mobile Legends",
      image: "/images/mlbb.jpg",
    },
    {
      name: "Free Fire",
      image: "/images/freefire.jpg",
    },
    {
      name: "PUBG Mobile",
      image: "/images/pubg.jpg",
    },
    {
      name: "Roblox",
      image: "/images/roblox.jpg",
    },
  ];

  return (
    <section
      id="games"
      className="bg-slate-950 text-white py-24 px-8"
    >
      <h2 className="text-5xl font-bold text-center text-cyan-400 mb-14">
        Popular Games
      </h2>

      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {games.map((game) => (
          <div
            key={game.name}
            onClick={() =>
              router.push(
                `/topup?game=${encodeURIComponent(game.name)}`
              )
            }
            className="bg-slate-900 rounded-2xl overflow-hidden cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 transition duration-300"
          >
            <Image
              src={game.image}
              alt={game.name}
              width={400}
              height={250}
              className="w-full h-56 object-cover"
            />

            <div className="p-5 text-center">
              <h3 className="text-xl font-bold mb-4">
                {game.name}
              </h3>

              <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-2 rounded-lg">
                Top Up
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
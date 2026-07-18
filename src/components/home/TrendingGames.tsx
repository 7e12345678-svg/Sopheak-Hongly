"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const games = [
  {
    name: "Mobile Legends",
    image: "/images/mlbb.jpg",
    href: "/topup?game=mobile-legends",
  },
  {
    name: "PUBG Mobile",
    image: "/images/pubg.jpg",
    href: "/topup?game=pubg-mobile",
  },
  {
    name: "Free Fire",
    image: "/images/freefire.jpg",
    href: "/topup?game=free-fire",
  },
  {
    name: "Roblox",
    image: "/images/roblox.jpg",
    href: "/topup?game=roblox",
  },
  {
    name: "Honor of Kings",
    image: "/images/hok.jpg",
    href: "/topup?game=honor-of-kings",
  },
  {
    name: "Call of Duty",
    image: "/images/codm.jpg",
    href: "/topup?game=cod-mobile",
  },
];

export default function TrendingGames() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-cyan-400">
              🔥 Trending
            </span>

            <h2 className="mt-5 text-4xl font-black text-white">
              Trending Games
            </h2>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {games.map((game, index) => (
            <motion.div
              key={game.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <Link
                href={game.href}
                className="group block overflow-hidden rounded-2xl border border-cyan-500/20 bg-white/5"
              >
                <div className="relative aspect-square">
                  <Image
                    src={game.image}
                    alt={game.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-center font-semibold text-white">
                    {game.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
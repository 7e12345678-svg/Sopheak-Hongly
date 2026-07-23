"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";

const games = [
  {
    name: "Mobile Legends",
    image: "/images/mlbb.jpg",
    players: "12M+",
    color: "from-blue-500 to-cyan-500",
    href: "/topup?game=mobile-legend",
  },
  {
    name: "PUBG Mobile",
    image: "/images/pubg.jpg",
    players: "8M+",
    color: "from-yellow-500 to-orange-500",
    href: "/topup?game=pubg-mobile",
  },
  {
    name: "Free Fire",
    image: "/images/freefire.jpg",
    players: "15M+",
    color: "from-purple-500 to-pink-500",
    href: "/topup?game=free-fire",
  },
  {
    name: "Roblox",
    image: "/images/roblox.jpg",
    players: "20M+",
    color: "from-green-500 to-emerald-500",
    href: "/topup?game=roblox",
  },
];

export default function PopularGames() {
  return (

    
    <section
  id="games"
  className="relative pt-12 pb-24"
>
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
       <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="mx-auto max-w-3xl text-center"
>
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 text-[10px] sm:px-4 sm:py-2 sm:text-sm text-cyan-400">
    <Flame size={18}/>
    Popular Games
</span>

          <h2 className="mt-8 text-5xl font-black leading-tight text-white md:text-6xl">
            Choose Your{" "}
            <span className="text-cyan-400">Favorite Game</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Instant top up with secure payment and automatic delivery.
          </p>
        </motion.div>

        {/* Games */}
        <div
  className="
    mt-20
    grid
    grid-cols-3
    gap-3
    sm:gap-4
    md:grid-cols-2
    xl:grid-cols-4
  "
>
          {games.map((game, index) => (
            <motion.div
              key={game.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y:-15, scale:1.05, rotateX:6,}}
            >
              <Link href={game.href} className="block">
                <div className="group relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_60px_rgba(34,211,238,.45)]">
                  {/* Image */}
                  <div
  className="
    relative
    h-32
    sm:h-44
    md:h-64
    xl:h-80
    overflow-hidden
  "
>
                    <Image
                      src={game.image}
                      alt={game.name}
                      fill
                      priority={index === 0}
                      className="pointer-events-none object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030712] via-black/20 to-transparent" />

                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${game.color} opacity-0 transition duration-500 group-hover:opacity-20`}
                    />

                    <div className="absolute left-4 top-4 rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1 text-xs font-bold text-white">
                      HOT
                    </div>

                    <div className="absolute bottom-5 left-5">
                      <h3
  className="
    text-xs
    sm:text-base
    md:text-xl
    xl:text-2xl
    font-black
    text-white
  "
>
                        {game.name}
                      </h3>

                      <p
 className="
 mt-1
 text-[10px]
 sm:text-xs
 text-cyan-300
 "
>
                        {game.players} Players
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div
 className="
 flex
 items-center
 justify-between
 p-2
 sm:p-4
 "
>
                    <span className="rounded-xl bg-cyan-500 px-2 py-1 text-[10px] sm:px-4 sm:py-2 sm:text-sm font-bold text-black transition-all duration-300 group-hover:bg-cyan-400 group-hover:shadow-[0_0_30px_rgba(34,211,238,.6)]">
                      Top Up
                    </span>

                    <ArrowRight className="text-cyan-400 transition duration-300 group-hover:translate-x-2" />
                  </div>
                </div>
              </Link>
              
            </motion.div>
          ))}
          
        </div>
</div>
      
      
    </section>
  );
}
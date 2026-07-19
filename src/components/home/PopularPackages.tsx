"use client";

import { motion } from "framer-motion";
import { Gem, Flame } from "lucide-react";
import Link from "next/link";

const packages = [
  {
    game: "Mobile Legends",
    gameId: "mobile-legend",
    amount: "86 Diamonds",
    price: "$1.99",
    badge: "Best Seller",
  },
  {
    game: "PUBG Mobile",
    gameId: "pubg-mobile",
    amount: "325 UC",
    price: "$4.99",
    badge: "Popular",
  },
  {
    game: "Free Fire",
    gameId: "free-fire",
    amount: "530 Diamonds",
    price: "$5.49",
    badge: "Hot",
  },
  {
    game: "Roblox",
    gameId: "roblox",
    amount: "800 Robux",
    price: "$9.99",
    badge: "Limited",
  },
];

export default function PopularPackages() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-cyan-400">

            <Gem size={18} />

            Popular Packages

          </span>

          <h2 className="mt-6 text-5xl font-black text-white">
            Best Selling Packages
          </h2>

          <p className="mt-4 text-slate-400">
            Fast delivery • Secure payment • Instant top up
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {packages.map((item, index) => (
            <motion.div
              key={item.amount}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.15,
              }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-cyan-500/20
                bg-white/5
                backdrop-blur-xl
                p-7
              "
            >
              {/* Shine */}
              <div className="absolute -left-24 top-0 h-full w-20 -skew-x-12 bg-white/10 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />

              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-3 py-1 text-xs font-bold text-black">
                <Flame size={14} />
                {item.badge}
              </div>

              {/* Game */}
              <p className="mt-5 text-slate-400">
                {item.game}
              </p>

              {/* Package */}
              <h3 className="mt-3 text-3xl font-black text-white">
                {item.amount}
              </h3>

              {/* Price */}
              <p className="mt-4 text-4xl font-black text-cyan-400">
                {item.price}
              </p>

              {/* Button */}
              <Link
  href={`/topup?game=${item.gameId}`}
  className="
    mt-8
    block
    w-full
    rounded-xl
    bg-cyan-500
    py-3
    text-center
    font-bold
    text-black
    transition
    duration-300
    hover:bg-cyan-400
  "
>
  Buy Now
</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
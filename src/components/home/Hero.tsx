"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroArtwork from "./hero/HeroArtwork";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute right-0 top-10 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:py-20">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20"
        >
          <span className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-400">
            ⚡ Instant Game Top Up
          </span>

          <h1 className="mt-6 text-5xl font-black leading-tight text-white lg:text-7xl">
            Fast &
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Secure
            </span>
            Game Top Up
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
            Top up Mobile Legends, PUBG Mobile, Free Fire and Roblox instantly
            with secure payment and lightning-fast delivery.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
  onClick={() =>
    document.getElementById("games")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
  className="rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,.45)]"
>
  Top Up Now
</button>

            <button
              onClick={() =>
                document.getElementById("games")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              className="flex items-center gap-2 rounded-xl border border-slate-700 px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-cyan-500 hover:text-cyan-400"
            >
              Explore Games
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="pointer-events-none flex justify-center"
        >
          <HeroArtwork />
        </motion.div>
      </div>
    </section>
  );
}
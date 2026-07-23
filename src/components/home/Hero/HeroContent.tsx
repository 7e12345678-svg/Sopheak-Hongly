"use client";

import { motion } from "framer-motion";
import { ArrowRight, Gamepad2, ShieldCheck, Zap } from "lucide-react";

export default function HeroContent() {
  const scrollToGames = () => {
    const section = document.getElementById("games");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="relative z-20 flex-1 max-w-2xl">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-cyan-300 backdrop-blur-md"
      >
        <Zap className="h-4 w-4" />
        Fast • Secure • Instant Top-Up
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-8 text-5xl font-extrabold leading-tight text-white lg:text-7xl"
      >
        TOP UP YOUR
        <br />
        <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
          FAVORITE GAMES
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 max-w-xl text-lg leading-8 text-slate-300"
      >
        Buy UC, Diamonds, Robux, CP and more with instant delivery,
        secure payments and the best prices in Cambodia.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 flex flex-wrap gap-4"
      >
        <button
          onClick={scrollToGames}
          className="group flex items-center gap-2 rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-black transition hover:bg-cyan-400"
        >
          Top Up Now
          <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
        </button>

        <button
          onClick={scrollToGames}
          className="rounded-xl border border-slate-700 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-xl transition hover:border-cyan-400 hover:text-cyan-400"
        >
          Explore Games
        </button>
      </motion.div>

      {/* Features */}
      <div className="mt-14 grid grid-cols-3 gap-4">
        <Feature
          icon={<Gamepad2 className="h-6 w-6" />}
          title="100+ Games"
        />

        <Feature
          icon={<ShieldCheck className="h-6 w-6" />}
          title="Secure"
        />

        <Feature
          icon={<Zap className="h-6 w-6" />}
          title="Instant"
        />
      </div>
    </div>
  );
}

function Feature({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
    >
      <div className="mb-3 text-cyan-400">{icon}</div>

      <div className="font-semibold text-white">{title}</div>
    </motion.div>
  );
}
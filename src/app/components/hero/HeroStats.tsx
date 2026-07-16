"use client";

import { heroStats } from "@/app/data/heroStats";

export default function HeroStats() {
  return (
    <div
      className="
        mt-16
        grid
        w-full
        grid-cols-4
        gap-3
        lg:gap-5
        max-w-7xl
        mx-auto
      "
    >
      {heroStats.map((item) => (
        <div
          key={item.title}
          className="
            rounded-2xl
            border
            border-cyan-500/20
            bg-slate-900/60
            backdrop-blur-xl
            p-3
            lg:p-6
            transition
            hover:border-cyan-400
            hover:-translate-y-1
          "
        >
          <h2 className="text-xl lg:text-4xl font-extrabold text-cyan-400">
            {item.value}
          </h2>

          <p className="mt-1 text-[10px] lg:text-base text-slate-400">
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
}
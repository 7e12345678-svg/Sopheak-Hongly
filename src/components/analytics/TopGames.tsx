"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Gamepad2,
  TrendingUp,
} from "lucide-react";

import type { Analytics } from "@/types";

interface TopGamesProps {
  analytics: Analytics;
}

export default function TopGames({
  analytics,
}: TopGamesProps) {

  const games = analytics.topGames;

  const totalOrders = games.reduce(
    (sum, game) => sum + game.orders,
    0
  );

  const getPercentage = (orders: number) => {
    if (totalOrders === 0) return 0;

    return Math.round(
      (orders / totalOrders) * 100
    );
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return "text-yellow-400";
      case 1:
        return "text-slate-300";
      case 2:
        return "text-orange-400";
      default:
        return "text-cyan-400";
    }
  };

    return (
    <div className="overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/90 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 p-6">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
            Analytics
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Top Selling Games
          </h2>

          <p className="mt-2 text-slate-400">
            Best performing games by completed orders
          </p>
        </div>

        <div className="rounded-2xl bg-yellow-500/10 p-4">
          <Trophy
            size={36}
            className="text-yellow-400"
          />
        </div>
      </div>

      {/* Games */}
      <div className="space-y-6 p-6">
        {games.map((game, index) => {
          const percent = getPercentage(game.orders);

          return (
            <motion.div
              key={game.name}
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
              whileHover={{
                scale: 1.02,
              }}
              className="rounded-2xl border border-slate-800 bg-slate-800/50 p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-slate-900
                    `}
                  >
                    <Gamepad2
                      size={24}
                      className={getRankColor(index)}
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      #{index + 1} {game.name}
                    </h3>

                    <p className="text-sm text-slate-400">
                      {game.orders} Orders
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <h3 className="text-xl font-bold text-cyan-400">
                    {percent}%
                  </h3>

                  <div className="mt-1 flex items-center justify-end gap-1">
                    <TrendingUp
                      size={14}
                      className="text-emerald-400"
                    />

                    <span className="text-xs text-emerald-400">
                      Growing
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="h-3 overflow-hidden rounded-full bg-slate-700">
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: `${percent}%`,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.12,
                  }}
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-cyan-400
                    via-sky-400
                    to-blue-500
                  "
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
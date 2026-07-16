"use client";

import {
  DollarSign,
  ShoppingCart,
  Users,
  Gamepad2,
  TrendingUp,
} from "lucide-react";

import { motion } from "framer-motion";
import { formatCurrency } from "@/utils/formatCurrency";

import type { Analytics } from "@/types";

interface StatsCardsProps {
  analytics: Analytics;
}

export default function StatsCards({
  analytics,
}: StatsCardsProps) {

  const cards = [
    {
      title: "Revenue",
      value: formatCurrency(
        analytics.stats.revenue
      ),
      icon: DollarSign,
      color: "text-emerald-400",
      bg: "from-emerald-500/20 to-emerald-700/5",
      border: "border-emerald-500/30",
      iconBg: "bg-emerald-500/15",
    },

    {
      title: "Orders",
      value: analytics.stats.totalOrders,
      icon: ShoppingCart,
      color: "text-cyan-400",
      bg: "from-cyan-500/20 to-cyan-700/5",
      border: "border-cyan-500/30",
      iconBg: "bg-cyan-500/15",
    },

    {
      title: "Customers",
      value: analytics.stats.totalCustomers,
      icon: Users,
      color: "text-violet-400",
      bg: "from-violet-500/20 to-violet-700/5",
      border: "border-violet-500/30",
      iconBg: "bg-violet-500/15",
    },

    {
      title: "Games",
      value: analytics.stats.totalGames,
      icon: Gamepad2,
      color: "text-amber-400",
      bg: "from-amber-500/20 to-amber-700/5",
      border: "border-amber-500/30",
      iconBg: "bg-amber-500/15",
    },
  ];
       return (
    <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              delay: index * 0.08,
            }}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            className={`
              relative
              overflow-hidden
              rounded-3xl
              border
              ${card.border}
              bg-gradient-to-br
              ${card.bg}
              backdrop-blur-xl
              p-6
              shadow-xl
              transition-all
              duration-300
              hover:shadow-cyan-500/20
            `}
          >
            {/* Glow */}
            <div
              className="
                absolute
                -right-10
                -top-10
                h-32
                w-32
                rounded-full
                bg-cyan-500/10
                blur-3xl
              "
            />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  {card.title}
                </p>

                <h2 className="mt-3 text-4xl font-bold text-white">
                  {card.value}
                </h2>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1">
                  <TrendingUp
                    size={14}
                    className="text-emerald-400"
                  />

                  <span className="text-xs font-medium text-emerald-400">
                    Live
                  </span>
                </div>
              </div>

              <div
                className={`
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  ${card.iconBg}
                `}
              >
                <Icon
                  size={34}
                  className={card.color}
                />
              </div>
            </div>

            {/* Bottom Line */}
            <div
              className="
                absolute
                bottom-0
                left-0
                h-1
                w-full
                bg-gradient-to-r
                from-cyan-400
                via-sky-400
                to-transparent
              "
            />
          </motion.div>
        );
      })}
    </div>
  );
}
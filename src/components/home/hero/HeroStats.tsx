"use client";

import { motion } from "framer-motion";
import {
  Users,
  ShoppingCart,
  Star,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "50K+",
    label: "Players",
  },
  {
    icon: ShoppingCart,
    value: "120K+",
    label: "Orders",
  },
  {
    icon: Star,
    value: "4.9",
    label: "Rating",
  },
];

export default function HeroStats() {
  return (
    <div className="mt-14 grid grid-cols-3 gap-5">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.label}
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: index * .15,
            }}
            whileHover={{
              y: -8,
              scale: 1.05,
            }}
            className="rounded-2xl border border-cyan-400/20 bg-white/5 p-5 backdrop-blur-xl"
          >
            <Icon className="mb-3 h-7 w-7 text-cyan-400"/>

            <div className="text-3xl font-bold text-white">
              {item.value}
            </div>

            <div className="text-slate-400">
              {item.label}
            </div>

          </motion.div>
        );
      })}
    </div>
  );
}
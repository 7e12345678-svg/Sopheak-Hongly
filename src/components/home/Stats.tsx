"use client";

import { motion } from "framer-motion";
import {
  Users,
  Trophy,
  ShieldCheck,
  Headphones,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "10K+",
    label: "Happy Customers",
  },
  {
    icon: Trophy,
    value: "50K+",
    label: "Orders Completed",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Secure Payments",
  },
  {
    icon: Headphones,
    value: "24/7",
    label: "Customer Support",
  },
];

export default function Stats() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-4"
        >
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="
                  group
                  rounded-3xl
                  border
                  border-cyan-500/20
                  bg-slate-900/70
                  p-8
                  text-center
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-cyan-400
                  hover:shadow-[0_0_40px_rgba(34,211,238,.35)]
                "
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 transition group-hover:scale-110">
                  <Icon size={34} />
                </div>

                <h3 className="mt-6 text-5xl font-black text-white">
                  {item.value}
                </h3>

                <p className="mt-3 text-slate-400">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
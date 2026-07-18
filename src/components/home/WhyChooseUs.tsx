"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Headphones,
  BadgeDollarSign,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Delivery",
    description:
      "Receive your top up within seconds after successful payment.",
  },
  {
    icon: ShieldCheck,
    title: "100% Secure",
    description:
      "All payments are protected with trusted payment gateways.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Our support team is always ready to help you anytime.",
  },
  {
    icon: BadgeDollarSign,
    title: "Best Price",
    description:
      "Enjoy the best prices with exclusive promotions every day.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-3 text-cyan-400">
            WHY CHOOSE US
          </span>

          <h2 className="mt-8 text-5xl font-black text-white md:text-6xl">
            Everything You{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Need
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Fast, secure and trusted game top up platform trusted by thousands
            of gamers.
          </p>
        </motion.div>

        {/* Cards */}
        <div
  className="
    mt-20
    grid
    grid-cols-3
    gap-3
    sm:gap-5
    md:grid-cols-2
    xl:grid-cols-4
  "
>
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * .15 }}
                whileHover={{
                  y: -12,
                  scale: 1.04,
                }}
                className="
                group
                rounded-3xl
                border
                border-cyan-500/20
                bg-slate-900/70
                p-3 sm:p-6
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-cyan-400
                hover:shadow-[0_0_40px_rgba(34,211,238,.35)]
                "
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 transition group-hover:scale-110">
                  <Icon size={34} />
                </div>

                <h3 className="mt-8 text-sm sm:text-xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
"use client";

import { motion } from "framer-motion";

interface Props {
  badge: string;
  title: string;
  highlight: string;
  description: string;
}

export default function SectionHeader({
  badge,
  title,
  highlight,
  description,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .7 }}
      className="mx-auto mb-20 max-w-3xl text-center"
    >
      <span className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-3 text-cyan-400">
        {badge}
      </span>

      <h2 className="mt-8 text-5xl font-black text-white md:text-6xl">
        {title}{" "}
        <span className="text-cyan-400">
          {highlight}
        </span>
      </h2>

      <p className="mt-6 text-lg leading-8 text-slate-400">
        {description}
      </p>
    </motion.div>
  );
}
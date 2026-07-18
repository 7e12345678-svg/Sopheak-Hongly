"use client";

import { motion } from "framer-motion";

interface Props {
  icon: any;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: Props) {
  return (
    <motion.div
      whileHover={{
        y: -12,
        scale: 1.03,
      }}
      className="
      rounded-3xl
      border
      border-cyan-500/20
      bg-slate-900/70
      p-10
      backdrop-blur-xl
      transition-all
      hover:border-cyan-400
      hover:shadow-[0_0_50px_rgba(34,211,238,.35)]
      "
    >
      <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800">
        <Icon className="text-cyan-400" size={32} />
      </div>

      <h3 className="text-3xl font-bold text-white">
        {title}
      </h3>

      <p className="mt-5 leading-8 text-slate-400">
        {description}
      </p>
    </motion.div>
  );
}
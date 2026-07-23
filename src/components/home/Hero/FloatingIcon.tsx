"use client";

import { motion } from "framer-motion";
import { Gem, Zap } from "lucide-react";

interface Props {
  className: string;
  delay?: number;
  type?: "gem" | "zap";
}

export default function FloatingIcon({
  className,
  delay = 0,
  type = "gem",
}: Props) {
  const Icon = type === "gem" ? Gem : Zap;

  return (
    <motion.div
      className={`absolute z-30 ${className}`}
      animate={{
        y: [0, -18, 0],
        rotate: [0, 8, 0],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      <div className="rounded-full border border-cyan-500/30 bg-slate-900/70 p-3 backdrop-blur-xl">
        <Icon
          size={18}
          className="text-cyan-400"
        />
      </div>
    </motion.div>
  );
}
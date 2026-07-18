"use client";

import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black" />

      {/* Cyan Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.45, 0.75, 0.45],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[180px]"
      />

      {/* Purple Glow */}
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-0 top-0 h-[650px] w-[650px] rounded-full bg-fuchsia-500/20 blur-[170px]"
      />

      {/* Bottom Glow */}
      <motion.div
        animate={{
          opacity: [0.15, 0.4, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute bottom-[-200px] left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[160px]"
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Noise */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,.55))]" />
    </div>
  );
}
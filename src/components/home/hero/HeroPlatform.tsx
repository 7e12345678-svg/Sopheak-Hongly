"use client";

import { motion } from "framer-motion";

export default function HeroPlatform() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-28">

      {/* ================= Big Glow ================= */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.25, 0.55, 0.25],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 blur-[120px]"
      />

      {/* ================= Outer Ring ================= */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/30"
      />

      {/* ================= Middle Ring ================= */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/40"
      />

      {/* ================= Pulse Ring ================= */}
      <motion.div
        animate={{
          scale: [1, 1.35],
          opacity: [0.7, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeOut",
        }}
        className="absolute left-1/2 top-1/2 h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-400"
      />

      {/* ================= Platform ================= */}
      <motion.div
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative h-28 w-80 rounded-full border border-cyan-400/40 bg-gradient-to-b from-cyan-400/20 to-cyan-900/20 backdrop-blur-xl"
      >
        {/* Glass */}
        <div className="absolute inset-2 rounded-full border border-white/10 bg-white/5" />

        {/* Inner Glow */}
        <div className="absolute left-1/2 top-1/2 h-24 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-3xl" />

        {/* Center Core */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_50px_rgba(34,211,238,.9)]"
        />

        {/* Energy Line */}
        <motion.div
          animate={{
            opacity: [0.3, 1, 0.3],
            scaleX: [0.7, 1.1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute left-8 right-8 top-1/2 h-[2px] -translate-y-1/2 bg-cyan-300"
        />
      </motion.div>

      {/* ================= Orbit Dots ================= */}
      {[0, 90, 180, 270].map((angle) => (
        <motion.div
          key={angle}
          animate={{ rotate: 360 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformOrigin: "0 0",
          }}
          className="absolute left-1/2 top-1/2"
        >
          <div
            style={{
              transform: `rotate(${angle}deg) translateX(130px)`,
            }}
            className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,.9)]"
          />
        </motion.div>
      ))}
    </div>
  );
}
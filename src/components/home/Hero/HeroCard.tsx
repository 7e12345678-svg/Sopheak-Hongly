"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface HeroCardProps {
  name: string;
  image: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  delay?: number;
  offsetX: number;
  offsetY: number;
}

export default function HeroCard({
  name,
  image,
  position,
  delay = 0,
  offsetX,
  offsetY,
}: HeroCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -12, 0],
      }}
      transition={{
        opacity: {
          duration: 0.5,
          delay,
        },
        scale: {
          duration: 0.5,
          delay,
        },
        y: {
          duration: 4 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        scale: 1.08,
        rotateY: 12,
        rotateX: -8,
      }}
      style={{
        ...position,
        x: offsetX,
        y: offsetY,
        transformStyle: "preserve-3d",
      }}
      className="absolute z-20 pointer-events-auto"
    >
      {/* Glow */}
      <div className="absolute inset-0 rounded-3xl bg-cyan-400/20 blur-2xl" />

      {/* Card */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-400/30 bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,.25)]">

        {/* Top Glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />

        {/* Image */}
        <div className="relative h-32 w-32">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            draggable={false}
          />
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 bg-black/40 px-3 py-2">
          <p className="text-center text-sm font-semibold text-white">
            {name}
          </p>
        </div>

        {/* Shine */}
        <motion.div
          animate={{
            x: ["-120%", "220%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
          }}
          className="absolute inset-y-0 w-12 rotate-12 bg-white/20 blur-md"
        />
      </div>
    </motion.div>
  );
}
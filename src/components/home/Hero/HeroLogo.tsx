"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface HeroLogoProps {
  image: string;
  alt: string;
}

export default function HeroLogo({
  image,
  alt,
}: HeroLogoProps) {
  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-[58%]"
      animate={{
        y: [0, -18, 0],
        rotateZ: [-2, 2, -2],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* ========= Glow ========= */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.45, 0.9, 0.45],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/25 blur-[90px]"
      />

      {/* ========= Rotating Ring ========= */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/30"
      >
        <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,.9)]" />
        <div className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,.9)]" />
      </motion.div>

      {/* ========= Controller ========= */}
      <motion.div
        whileHover={{
          scale: 1.05,
          rotateY: 10,
          rotateX: -8,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        <Image
          src={image}
          alt={alt}
          width={420}
          height={420}
          priority
          draggable={false}
          className="drop-shadow-[0_0_50px_rgba(34,211,238,.8)] select-none"
        />
      </motion.div>

      {/* ========= Reflection ========= */}
      <div className="absolute left-1/2 top-[88%] h-12 w-52 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-2xl" />

      {/* ========= Vertical Energy Beam ========= */}
      <motion.div
        animate={{
          opacity: [0.15, 0.45, 0.15],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="absolute left-1/2 top-1/2 h-[360px] w-[2px] -translate-x-1/2 -translate-y-1/2 bg-cyan-300 blur-sm"
      />

      {/* ========= Spark Points ========= */}
      {[
        { x: -120, y: -60 },
        { x: 120, y: -80 },
        { x: -100, y: 90 },
        { x: 100, y: 80 },
      ].map((dot, index) => (
        <motion.div
          key={index}
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2 + index * 0.3,
            repeat: Infinity,
          }}
          className="absolute h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(34,211,238,.9)]"
          style={{
            left: `calc(50% + ${dot.x}px)`,
            top: `calc(50% + ${dot.y}px)`,
          }}
        />
      ))}
    </motion.div>
  );
}
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Particle = {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
};

export default function HeroParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const data: Particle[] = Array.from({ length: 70 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 5,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 4,
    }));

    setParticles(data);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-cyan-300"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
            boxShadow: "0 0 10px rgba(34,211,238,.9)",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating Energy Orbs */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full bg-cyan-400/40 blur-xl"
          style={{
            width: 80,
            height: 80,
            left: `${15 + i * 18}%`,
            top: `${20 + (i % 2) * 35}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            opacity: [0.15, 0.45, 0.15],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Vertical Energy Lines */}
      {[20, 40, 60, 80].map((left) => (
        <motion.div
          key={left}
          className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
          style={{
            left: `${left}%`,
          }}
          animate={{
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: left / 40,
          }}
        />
      ))}
    </div>
  );
}
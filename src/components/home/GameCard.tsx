"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Props {
  name: string;
  image: string;
  category: string;
  color: string;
  discount: string;
}

export default function GameCard({
  name,
  image,
  category,
  color,
  discount,
}: Props) {
  return (
    <motion.div
      whileHover={{
        y: -12,
        scale: 1.03,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
      }}
      className="group relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-white/5 backdrop-blur-xl"
    >
      {/* Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 blur-3xl transition duration-500 group-hover:opacity-30`}
      />

      {/* Discount */}
      <div className="absolute right-4 top-4 z-20 rounded-full bg-cyan-400 px-3 py-1 text-xs font-bold text-black">
        -{discount}
      </div>

      {/* Image */}
      <div className="relative h-60">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-2 text-sm text-cyan-400">
          {category}
        </div>

        <h3 className="text-2xl font-bold text-white">
          {name}
        </h3>

        <button className="mt-6 flex items-center gap-2 font-semibold text-cyan-400 transition hover:gap-3">
          Top Up
          <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}
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
        y: -10,
        scale: 1.04,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-xl
        sm:rounded-2xl
        border
        border-cyan-400/20
        bg-white/5
        backdrop-blur-xl
      "
    >

      {/* Glow */}
      <div
        className={`
          absolute
          inset-0
          bg-gradient-to-br
          ${color}
          opacity-0
          blur-3xl
          transition
          duration-500
          group-hover:opacity-30
        `}
      />


      {/* Discount */}
      <div
        className="
          absolute
          right-2
          top-2
          z-20
          rounded-full
          bg-cyan-400
          px-2
          py-1
          text-[9px]
          sm:text-xs
          font-bold
          text-black
        "
      >
        -{discount}
      </div>


      {/* Image */}
      <div
        className="
          relative
          h-24
          sm:h-32
          md:h-44
          xl:h-60
        "
      >
        <Image
          src={image}
          alt={name}
          fill
          className="
            object-cover
            transition
            duration-500
            group-hover:scale-110
          "
        />
      </div>



      {/* Content */}
      <div
        className="
          p-2
          sm:p-4
        "
      >

        <div
          className="
            mb-1
            text-[9px]
            sm:text-sm
            text-cyan-400
          "
        >
          {category}
        </div>


        <h3
          className="
            truncate
            text-xs
            sm:text-lg
            xl:text-2xl
            font-bold
            text-white
          "
        >
          {name}
        </h3>


        <button
          className="
            mt-2
            flex
            items-center
            gap-1
            text-[10px]
            sm:text-sm
            font-semibold
            text-cyan-400
            transition
            hover:gap-3
          "
        >
          Top Up
          <ArrowRight
            size={14}
          />
        </button>

      </div>


    </motion.div>
  );
}
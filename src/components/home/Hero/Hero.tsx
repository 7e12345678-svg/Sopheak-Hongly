"use client";

import { motion } from "framer-motion";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroArtwork from "./HeroArtwork";
import HeroParticles from "./HeroParticles";

export default function Hero() {
  return (
    <section
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-slate-950
      "
    >

      {/* Background */}
      <HeroBackground />

      {/* Global Particles */}
      <HeroParticles />


      {/* Main Content */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="
          relative
          z-10
          mx-auto
          grid
          min-h-screen
          max-w-7xl
          grid-cols-1
          items-center
          gap-10
          px-6
          py-20

          lg:grid-cols-[45%_55%]
        "
      >

        {/* Left */}
        <HeroContent />


        {/* Right */}
        <div className="relative w-full">
          <HeroArtwork />
        </div>


      </motion.div>


      {/* Bottom Scroll */}
      <motion.div
        animate={{
          y:[0,10,0],
          opacity:[1,.5,1],
        }}
        transition={{
          duration:2,
          repeat:Infinity,
        }}
        className="
          absolute
          bottom-8
          left-1/2
          z-20
          -translate-x-1/2
        "
      >

        <div
          className="
            flex
            h-14
            w-8
            justify-center
            rounded-full
            border
            border-cyan-400/40
          "
        >

          <div
            className="
              mt-3
              h-2
              w-2
              rounded-full
              bg-cyan-400
            "
          />

        </div>

      </motion.div>


    </section>
  );
}
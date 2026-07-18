"use client";

import { motion } from "framer-motion";

import HeroPlatform from "./HeroPlatform";
import HeroParticles from "./HeroParticles";
import HeroLogo from "./HeroLogo";
import HeroCard from "./HeroCard";

import { heroGames } from "./heroData";

import { useParallax } from "@/hooks/useParallax";
import { useHeroTilt } from "@/hooks/useHeroTilt";


export default function HeroArtwork() {

  const {x,y}=useParallax();

  const {
    rotateX,
    rotateY
  } = useHeroTilt();


  return (

    <motion.div

      animate={{
        rotateX,
        rotateY,
      }}

      transition={{
        type:"spring",
        stiffness:120,
        damping:20,
      }}

      style={{
        perspective:"1800px",
        transformStyle:"preserve-3d",
      }}

      className="
        relative
        flex
        h-[650px]
        w-full
        items-center
        justify-center
        overflow-visible
      "
    >


      {/* Glow */}

      <div className="absolute inset-0">


        <motion.div

          animate={{
            x:rotateY * 8,
            y:-rotateX * 8,
          }}

          className="
            absolute
            left-1/2
            top-1/2
            h-[600px]
            w-[600px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-cyan-400/20
            blur-[150px]
          "

        />


        {/* Rings */}

        <div
          className="
          absolute
          left-1/2
          top-1/2
          h-[350px]
          w-[350px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-cyan-400/30
          "
        />


        <div
          className="
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-cyan-400/15
          "
        />

      </div>



      {/* Particles */}

      <HeroParticles />



      {/* Platform */}

      <HeroPlatform />



      {/* Controller */}

      <HeroLogo

        image="/images/controller.png"

        alt="Gaming Controller"

      />




      {/* Cards */}

      {
        heroGames.map((game)=>(

          <HeroCard

            key={game.name}

            {...game}

            offsetX={x*0.5}

            offsetY={y*0.5}

          />

        ))
      }



    </motion.div>

  );
}
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { gameIcons } from "./gameIcons";

type Props = {
  avatar: string;
  name: string;
  game: string;
  item: string;
  time: string;
};

export default function NotificationItem({
  avatar,
  name,
  game,
  item,
  time,
}: Props) {
  return (
    <motion.div
      initial={{ x: 120, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 120, opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-cyan-500/20
        bg-slate-900/90
        p-4
        shadow-2xl
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-cyan-400/60
        hover:shadow-cyan-500/20
      "
    >
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="relative shrink-0">
          <Image
            src={avatar}
            alt={name}
            width={52}
            height={52}
            className="rounded-full object-cover"
          />

          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-slate-900 bg-green-400" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <CheckCircle2
              size={18}
              className="text-green-400"
            />

            <p className="font-bold text-white">
              {name}
            </p>
          </div>

          <p className="mt-1 text-sm text-slate-300">
            Purchased{" "}
            <span className="font-semibold text-cyan-400">
              {item}
            </span>
          </p>

          <div className="mt-3 flex items-center gap-3">
            <Image
              src={gameIcons[game] || "/images/default-game.png"}
              alt={game}
              width={40}
              height={40}
              className="rounded-xl object-cover"
            />

            <div>
              <p className="font-semibold text-white">
                {game}
              </p>

              <p className="text-xs text-slate-500">
                {time}
              </p>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{
          duration: 5,
          ease: "linear",
        }}
        className="absolute bottom-0 left-0 h-1 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]"
      />
    </motion.div>
  );
}
"use client";

import { Menu, X } from "lucide-react";

interface Props {
  open: boolean;
  onClick: () => void;
}

export default function MobileButton({
  open,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle Menu"
      className="
        flex
        md:hidden
        h-12
        w-12
        items-center
        justify-center
        rounded-2xl
        border
        border-cyan-500/30
        bg-slate-900/80
        text-cyan-400
        shadow-lg
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-cyan-400
        hover:bg-slate-800
        hover:scale-105
        active:scale-95
      "
    >
      {open ? (
        <X size={24} strokeWidth={2.5} />
      ) : (
        <Menu size={24} strokeWidth={2.5} />
      )}
    </button>
  );
}
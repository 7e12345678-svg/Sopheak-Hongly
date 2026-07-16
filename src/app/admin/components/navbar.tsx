"use client";

import { Menu } from "lucide-react";

interface Props {
  onMenuClick: () => void;
}

export default function Navbar({
  onMenuClick,
}: Props) {
  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-20
        items-center
        justify-between
        border-b
        border-slate-800
        bg-[#070B1D]
        px-4
        lg:px-8
      "
    >
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="
          rounded-xl
          border
          border-slate-700
          p-2
          text-white
          transition
          hover:bg-slate-800
          lg:hidden
        "
      >
        <Menu size={24} />
      </button>

      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Admin Dashboard
        </h1>

        <p className="text-sm text-slate-400">
          Game Top-Up Management
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <div className="hidden text-right md:block">
          <p className="font-semibold text-cyan-400">
            Welcome Admin
          </p>

          <p className="text-sm text-slate-400">
            Online
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500 font-bold text-black">
          A
        </div>
      </div>
    </header>
  );
}
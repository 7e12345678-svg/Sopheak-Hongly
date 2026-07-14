"use client";

import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 select-none"
    >
      <span className="text-2xl md:text-3xl font-extrabold text-cyan-400 whitespace-nowrap">
        Z-Store
      </span>

      <span className="hidden md:block text-slate-500 text-2xl">
        |
      </span>

      <span className="hidden md:block text-2xl md:text-3xl font-bold text-white whitespace-nowrap">
        Instant
      </span>
    </Link>
  );
}
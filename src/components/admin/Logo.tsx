"use client";

import Link from "next/link";
import { FaGamepad } from "react-icons/fa";

export default function Logo() {
  return (
    <Link
      href="/admin"
      className="flex items-center gap-3 px-6 py-6 border-b border-slate-800"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500 shadow-lg shadow-cyan-500/30">
        <FaGamepad className="text-2xl text-white" />
      </div>

      <div>
        <h1 className="text-xl font-bold text-white">
          GameTopUp
        </h1>

        <p className="text-xs text-slate-400">
          Admin Panel
        </p>
      </div>
    </Link>
  );
}
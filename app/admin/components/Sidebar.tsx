"use client";

import Link from "next/link";
import { LayoutDashboard, ShoppingCart, Users, LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800">

      <div className="p-6 text-3xl font-bold text-cyan-400">
        Ly Top Up
      </div>

      <nav className="px-4 mt-8 space-y-2">

        <Link
          href="/admin"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          href="/admin/orders"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800"
        >
          <ShoppingCart size={20} />
          Orders
        </Link>

        <Link
          href="/admin/users"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800"
        >
          <Users size={20} />
          Users
        </Link>

        <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-500 w-full text-left mt-10">
          <LogOut size={20} />
          Logout
        </button>

      </nav>

    </aside>
  );
}
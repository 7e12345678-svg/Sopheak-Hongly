"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const menus = [
  { name: "Home", href: "/" },
  { name: "Games", href: "/#games" },
  { name: "Top Up", href: "/topup" },
  { name: "Contact", href: "/#footer" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="TopUp Logo"
            width={42}
            height={42}
            className="rounded-xl"
          />

          <div>
            <h1 className="text-lg font-bold text-white">
              TopUp
            </h1>

            <p className="text-xs text-cyan-400">
              Game Center
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 md:flex">
          {menus.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-medium text-slate-300 transition hover:text-cyan-400"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/admin/login"
            className="rounded-xl border border-slate-700 px-5 py-2 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
          >
            Login
          </Link>

          <Link
            href="/admin"
            className="rounded-xl bg-cyan-500 px-5 py-2 font-semibold text-black transition hover:bg-cyan-400"
          >
            Dashboard
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-slate-800 bg-slate-900 md:hidden">
          {menus.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-4 text-slate-300 transition hover:bg-slate-800 hover:text-cyan-400"
            >
              {item.name}
            </Link>
          ))}

          <div className="space-y-3 border-t border-slate-800 p-6">
            <Link
              href="/admin/login"
              onClick={() => setOpen(false)}
              className="block rounded-xl border border-slate-700 px-5 py-3 text-center text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
            >
              Login
            </Link>

            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="block rounded-xl bg-cyan-500 px-5 py-3 text-center font-semibold text-black transition hover:bg-cyan-400"
            >
              Dashboard
            </Link>

            <Link
  href="/track"
  className="rounded-xl border border-cyan-500 px-6 py-3 text-cyan-400 hover:bg-cyan-500 hover:text-black transition"
>
  Track Order
</Link>
          </div>
        </div>
      )}
    </header>
  );
}
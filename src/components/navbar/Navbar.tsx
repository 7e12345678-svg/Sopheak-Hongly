"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  Package,
} from "lucide-react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const menus = [
  { name: "Home", id: "home" },
  { name: "Games", id: "games" },
  { name: "Contact", id: "footer" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const { user, logout } = useAuth();

  function handleScroll(id: string) {
    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      logout();

      setMenuOpen(false);

      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={42}
            height={42}
            className="rounded-xl"
          />

          <div>
            <h1 className="text-lg font-bold text-white">
              Z-Store
            </h1>

            <p className="text-xs text-cyan-400">
              Game Center
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 md:flex">

          {menus.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className="font-medium text-slate-300 transition hover:text-cyan-400"
            >
              {item.name}
            </button>
          ))}

          <Link
            href="/topup"
            className="font-medium text-slate-300 transition hover:text-cyan-400"
          >
            Top Up
          </Link>

        </nav>

        {/* Desktop Right */}
        <div className="hidden items-center gap-3 md:flex">

                    {!user ? (
            <>
              <Link
                href="/login"
                className="rounded-xl border border-slate-700 px-5 py-2 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
              >
                Sign In
              </Link>

              <Link
                href="/admin"
                className="rounded-xl bg-cyan-500 px-5 py-2 font-semibold text-black transition hover:bg-cyan-400"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-white hover:border-cyan-400"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 font-bold text-black">
                  {user.name.charAt(0)}
                </div>

                <span>{user.name}</span>

                <ChevronDown size={18} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-700 bg-slate-900 shadow-xl">
                  <div className="border-b border-slate-800 p-5">
                    <h3 className="font-bold text-white">{user.name}</h3>

                    <p className="text-sm text-slate-400">
                      {user.email}
                    </p>
                  </div>

                  <button
  onClick={() => {
    setMenuOpen(false);
    router.push("/dashboard/profile");
  }}
  className="flex w-full items-center gap-3 px-5 py-3 text-left text-slate-300 hover:bg-slate-800"
>
  <User size={18} />
  Profile
</button>

                  <button
  onClick={() => {
    setMenuOpen(false);
    router.push("/dashboard/orders");
  }}
  className="flex w-full items-center gap-3 px-5 py-3 text-left text-slate-300 hover:bg-slate-800"
>
  <Package size={18} />
  My Orders
</button>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-5 py-3 text-red-400 hover:bg-slate-800"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
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
            <button
              key={item.id}
              onClick={() => {
                handleScroll(item.id);
                setOpen(false);
              }}
              className="block w-full px-6 py-4 text-left text-slate-300 transition hover:bg-slate-800 hover:text-cyan-400"
            >
              {item.name}
            </button>
          ))}

          <Link
            href="/topup"
            onClick={() => setOpen(false)}
            className="block px-6 py-4 text-slate-300 transition hover:bg-slate-800 hover:text-cyan-400"
          >
            Top Up
          </Link>

          <div className="space-y-3 border-t border-slate-800 p-6">
            {!user ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="block rounded-xl border border-slate-700 px-5 py-3 text-center text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Sign In
                </Link>

                <Link
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className="block rounded-xl bg-cyan-500 px-5 py-3 text-center font-semibold text-black transition hover:bg-cyan-400"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <button
  onClick={() => {
    setMenuOpen(false);
    router.push("/dashboard/profile");
  }}
  className="flex w-full items-center gap-3 px-5 py-3 text-left text-slate-300 hover:bg-slate-800"
>
  <User size={18} />
  Profile
</button>

                <button
  onClick={() => {
    setMenuOpen(false);
    router.push("/dashboard/orders");
  }}
  className="flex w-full items-center gap-3 px-5 py-3 text-left text-slate-300 hover:bg-slate-800"
>
  <Package size={18} />
  My Orders
</button>

                <button
                  onClick={handleLogout}
                  className="block w-full rounded-xl border border-red-500 px-5 py-3 text-center text-red-400"
                >
                  Logout
                </button>
              </>
            )}

            <Link
              href="/track"
              onClick={() => setOpen(false)}
              className="block rounded-xl border border-cyan-500 px-5 py-3 text-center text-cyan-400 transition hover:bg-cyan-500 hover:text-black"
            >
              Track Order
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  const scrollTo = (id: string) => {
    setActive(id);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 30);

    const sections = ["home", "games", "contact"];

    for (const section of sections) {
      const element = document.getElementById(section);

      if (!element) continue;

      const top = element.offsetTop - 120;
      const bottom = top + element.offsetHeight;

      if (window.scrollY >= top && window.scrollY < bottom) {
        setActive(section);
      }
    }
  };

  window.addEventListener("scroll", handleScroll);

  handleScroll();

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/80 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        {/* Logo */}
        <h1
          onClick={() => scrollTo("home")}
          className="text-3xl font-extrabold text-cyan-400 cursor-pointer"
        >
          Ly Top Up
        </h1>

        {/* Menu */}
        <div className="flex items-center gap-8 text-lg text-white">

          <button
            onClick={() => scrollTo("home")}
            className={`transition ${
              active === "home"
                ? "text-cyan-400 font-bold"
                : "text-white hover:text-cyan-400"
            }`}
          >
            Home
          </button>

          <button
            onClick={() => scrollTo("games")}
            className={`transition ${
              active === "games"
                ? "text-cyan-400 font-bold"
                : "text-white hover:text-cyan-400"
            }`}
          >
            Games
          </button>

          <button
            onClick={() => scrollTo("contact")}
            className={`transition ${
              active === "contact"
                ? "text-cyan-400 font-bold"
                : "text-white hover:text-cyan-400"
            }`}
          >
            Contact
          </button>

          <Link
            href="/admin/login"
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-5 py-2 rounded-xl transition"
          >
            Admin
          </Link>

        </div>
      </div>
    </nav>
  );
}
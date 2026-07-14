"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setActive(id);
    setMenuOpen(false);

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

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/90 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 py-4">

        {/* Logo */}
        <h1
          onClick={() => scrollTo("home")}
          className="cursor-pointer text-cyan-400 font-extrabold text-2xl sm:text-3xl"
        >
          Z-Store
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-lg">

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

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-3xl"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="bg-slate-900/95 backdrop-blur-lg px-6 py-6 flex flex-col gap-5 text-lg">

          <button
            onClick={() => scrollTo("home")}
            className={`text-left ${
              active === "home"
                ? "text-cyan-400 font-bold"
                : "text-white"
            }`}
          >
            Home
          </button>

          <button
            onClick={() => scrollTo("games")}
            className={`text-left ${
              active === "games"
                ? "text-cyan-400 font-bold"
                : "text-white"
            }`}
          >
            Games
          </button>

          <button
            onClick={() => scrollTo("contact")}
            className={`text-left ${
              active === "contact"
                ? "text-cyan-400 font-bold"
                : "text-white"
            }`}
          >
            Contact
          </button>

          <Link
            href="/admin/login"
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-center py-3 rounded-xl"
            onClick={() => setMenuOpen(false)}
          >
            Admin
          </Link>

        </div>
      </div>
    </nav>
  );
}
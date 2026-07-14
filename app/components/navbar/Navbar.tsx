"use client";

import { useEffect, useState } from "react";

import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import MobileButton from "./MobileButton";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setActive(id);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = [
        "home",
        "games",
        "features",
        "payment",
        "contact",
      ];

      for (const section of sections) {
        const el = document.getElementById(section);

        if (!el) continue;

        const top = el.offsetTop - 120;
        const bottom = top + el.offsetHeight;

        if (
          window.scrollY >= top &&
          window.scrollY < bottom
        ) {
          setActive(section);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <>
      <header
        className={`
          fixed
          top-0
          left-0
          right-0
          z-50
          transition-all
          duration-300
          ${
            scrolled
              ? "bg-slate-950/90 backdrop-blur-xl border-b border-slate-800"
              : "bg-transparent"
          }
        `}
      >
        <div
          className="
            mx-auto
            flex
            h-20
            max-w-7xl
            items-center
            justify-between
            px-5
            lg:px-8
            shrink-0
          "
        >
          <Logo />

          <DesktopMenu
            active={active}
            onNavigate={scrollTo}
          />

          <MobileButton
            open={menuOpen}
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          />
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        active={active}
        onNavigate={scrollTo}
        onClose={() =>
          setMenuOpen(false)
        }
      />
    </>
  );
}
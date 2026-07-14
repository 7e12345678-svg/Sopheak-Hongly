"use client";

import Link from "next/link";
import NavItem from "./NavItem";

interface Props {
  active: string;
  onNavigate: (target: string) => void;
}

export default function DesktopMenu({
  active,
  onNavigate,
}: Props) {
  return (
    <nav className="hidden md:flex items-center gap-8">

      <NavItem
        label="Home"
        target="home"
        active={active === "home"}
        onClick={onNavigate}
      />

      <NavItem
        label="Games"
        target="games"
        active={active === "games"}
        onClick={onNavigate}
      />

      <NavItem
        label="Contact"
        target="contact"
        active={active === "contact"}
        onClick={onNavigate}
      />

      <Link
        href="/admin"
        className="
          rounded-xl
          bg-cyan-500
          shadow-lg
shadow-cyan-500/30
          px-5
          py-2.5
          font-bold
          text-black
          transition
          hover:bg-cyan-400
        "
      >
        Admin
      </Link>

    </nav>
  );
}
"use client";

import Link from "next/link";
import NavItem from "./NavItem";

interface Props {
  open: boolean;
  active: string;
  onNavigate: (target: string) => void;
  onClose: () => void;
}

export default function MobileMenu({
  open,
  active,
  onNavigate,
  onClose,
}: Props) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          z-40
          bg-black/60
          transition-opacity
          duration-300
          md:hidden
          ${open ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      {/* Drawer */}
      <aside
        className={`
          fixed
          top-0
          right-0
          z-50
          h-screen
          w-72
          bg-slate-950
          border-l
          border-cyan-500/20
          shadow-2xl
          transition-transform
          duration-300
          md:hidden
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-6">
          <h2 className="text-2xl font-bold text-cyan-400">
            Menu
          </h2>

          <button
            onClick={onClose}
            className="text-3xl text-white hover:text-cyan-400"
          >
            ✕
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-6 p-6">

          <NavItem
            label="Home"
            target="home"
            active={active === "home"}
            onClick={(id) => {
              onNavigate(id);
              onClose();
            }}
          />

          <NavItem
            label="Games"
            target="games"
            active={active === "games"}
            onClick={(id) => {
              onNavigate(id);
              onClose();
            }}
          />

          <NavItem
            label="Contact"
            target="contact"
            active={active === "contact"}
            onClick={(id) => {
              onNavigate(id);
              onClose();
            }}
          />

          <Link
            href="/admin"
            onClick={onClose}
            className="
              mt-4
              rounded-xl
              bg-cyan-500
              py-3
              text-center
              font-bold
              text-black
              transition
              hover:bg-cyan-400
            "
          >
            Admin
          </Link>

        </div>
      </aside>
    </>
  );
}
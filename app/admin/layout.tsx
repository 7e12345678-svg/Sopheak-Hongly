"use client";

import { ReactNode, useState } from "react";

import Sidebar from "./components/Sidebar";
import MobileSidebar from "./components/MobileSidebar";
import Navbar from "./components/navbar";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: Props) {
  const [menuOpen, setMenuOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-[#070B1D]">

      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar */}
      <MobileSidebar
        open={menuOpen}
        onClose={() =>
          setMenuOpen(false)
        }
      />

      {/* Content */}
      <div className="lg:ml-72">

        <Navbar
          onMenuClick={() =>
            setMenuOpen(true)
          }
        />

        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>
    </div>
  );
}
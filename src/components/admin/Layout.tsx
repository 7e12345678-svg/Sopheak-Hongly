"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-[#070B1D]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-72">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
}
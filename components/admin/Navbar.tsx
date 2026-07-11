"use client";

import { useEffect, useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();

      setTime(
        now.toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-20 bg-[#0F172A] border-b border-slate-800 flex items-center justify-between px-8">

      {/* Left */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          Welcome Back 👋
        </h2>

        <p className="text-slate-400 text-sm mt-1">
          {time}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        <button className="relative p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition">

          <FaBell className="text-cyan-400 text-xl" />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>

        </button>

        <div className="flex items-center gap-3">

          <FaUserCircle className="text-5xl text-cyan-400" />

          <div>

            <h4 className="text-white font-semibold">
              Administrator
            </h4>

            <p className="text-slate-400 text-sm">
              Super Admin
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}
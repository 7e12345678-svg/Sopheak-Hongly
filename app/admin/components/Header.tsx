"use client";

export default function Header() {
  return (
    <header className="h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8">

      <h1 className="text-3xl font-bold text-white">
        Dashboard
      </h1>

      <input
        type="text"
        placeholder="Search Orders..."
        className="bg-slate-800 px-4 py-2 rounded-xl outline-none w-80"
      />

    </header>
  );
}
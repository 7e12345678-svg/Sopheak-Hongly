"use client";

import Image from "next/image";

export default function Hero() {
  const goToGames = () => {
    document.getElementById("games")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden"
    >
      {/* Background */}
      <Image
        src="/images/hero-bg.jpg"
        alt="Background"
        fill
        priority
        className="absolute inset-0 -z-30 object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/80" />

      {/* Glow */}
      <div className="absolute top-20 left-0 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl sm:h-72 sm:w-72" />
      <div className="absolute bottom-20 right-0 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl sm:h-80 sm:w-80" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-center justify-center px-5 sm:px-8 lg:px-10">

        <div className="max-w-4xl text-center text-white">

          <h1 className="font-extrabold leading-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
  Instant
  <span className="block text-cyan-400">
    Game Top Up
  </span>
</h1>

<p className="mx-auto mt-8 max-w-3xl text-lg text-slate-300 leading-8">
  Buy Mobile Legends, PUBG Mobile, Free Fire,
  Roblox and many more with instant delivery,
  secure payment and the best price in Cambodia.
</p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

  <button
    onClick={goToGames}
    className="rounded-xl bg-cyan-500 px-10 py-4 font-bold text-black hover:bg-cyan-400 transition"
  >
    ⚡ Top Up Now
  </button>

  <button
    onClick={goToGames}
    className="rounded-xl border border-cyan-400 px-10 py-4 font-bold text-cyan-400 hover:bg-cyan-400 hover:text-black transition"
  >
    View Games
  </button>

</div>

<div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">

  <div className="text-center">
    <h2 className="text-4xl font-bold text-cyan-400">
      20K+
    </h2>
    <p className="text-slate-400">
      Orders
    </p>
  </div>

  <div className="text-center">
    <h2 className="text-4xl font-bold text-cyan-400">
      4
    </h2>
    <p className="text-slate-400">
      Games
    </p>
  </div>

  <div className="text-center">
    <h2 className="text-4xl font-bold text-cyan-400">
      99%
    </h2>
    <p className="text-slate-400">
      Satisfaction
    </p>
  </div>

  <div className="text-center">
    <h2 className="text-4xl font-bold text-cyan-400">
      24/7
    </h2>
    <p className="text-slate-400">
      Support
    </p>
  </div>

</div>

</div>

</div>
    </section>
  
  );
}
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
      className="relative min-h-screen overflow-hidden"
    >
      {/* Background */}
      <Image
  src="/images/hero-bg.jpg"
  alt="Background"
  fill
  priority
  className="absolute inset-0 object-cover object-center -z-30"
/>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/35 to-slate-950/75 -z-20" />

      {/* Glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/20 blur-3xl rounded-full" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex min-h-screen items-center justify-center px-6">
        <div className="text-center text-white max-w-3xl">

          <h1 className="text-6xl lg:text-8xl font-extrabold text-white">
            FAST GAME
          </h1>

          <h2 className="mt-2 text-6xl lg:text-8xl font-extrabold text-cyan-400">
            TOP UP
          </h2>

          <p className="mt-8 text-xl text-gray-300">
            Top up your favorite games instantly with secure payment,
            instant delivery and the best prices.
          </p>

          <button
            onClick={goToGames}
            className="mt-10 px-10 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg transition hover:scale-105"
          >
            ⚡ TOP UP NOW
          </button>
          

        </div>
      </div>
    </section>
  );
}
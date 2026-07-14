"use client";

import Image from "next/image";

import HeroBadge from "./hero/HeroBadge";
import HeroTitle from "./hero/HeroTitle";
import HeroButtons from "./hero/HeroButtons";
import PaymentMethods from "./hero/PaymentMethods";
import HeroStats from "./hero/HeroStats";

export default function Hero() {
  const goToGames = () => {
    document
      .getElementById("games")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden"
    >
      <Image
        src="/images/hero-bg.jpg"
        alt="Hero"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-slate-950/75" />

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          max-w-7xl
          flex-col
          items-center
          justify-center
          px-6
          pt-24
        "
      >
        <HeroBadge />

        <HeroTitle />

        <HeroButtons
          onTopUp={goToGames}
        />

        <PaymentMethods />

        <HeroStats />
      </div>
    </section>
  );
}
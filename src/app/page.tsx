"use client";

import Navbar from "./components/navbar/Navbar";
import Hero from "./components/Hero";
import Games from "./components/Games";
import WhyChooseUs from "./components/WhyChooseUs";
import Features from "./components/Features";
import Payment from "./components/Payment";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Games />
      <WhyChooseUs />
      <Features />
      <Payment />
      <Footer />
    </>
  );
}
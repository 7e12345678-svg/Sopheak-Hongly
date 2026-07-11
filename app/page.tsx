"use client";

import Navbar from "./components/navbar";
import Hero from "./components/Hero";
import Games from "./components/Games";
import Features from "./components/Features";
import Payment from "./components/Payment";
import Footer from "./components/Footer";


import { useState } from "react";
import Image from "next/image";


export default function Home() { 
  
  return (
    
    <>
      <Navbar />
      <Hero />
      <Games />
      <Features />
      <Payment />
      <Footer />
    </>
    
  );
}
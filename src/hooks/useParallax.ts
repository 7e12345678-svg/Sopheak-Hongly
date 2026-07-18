"use client";

import { useEffect, useState } from "react";

export function useParallax() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const x = (e.clientX - window.innerWidth / 2) / 40;
      const y = (e.clientY - window.innerHeight / 2) / 40;

      setPosition({ x, y });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return position;
}
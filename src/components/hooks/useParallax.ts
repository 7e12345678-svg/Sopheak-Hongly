"use client";

import { useEffect, useState } from "react";

export function useParallax(strength = 25) {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    let animationFrame: number;

    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(() => {
        const x =
          ((e.clientX - window.innerWidth / 2) / window.innerWidth) * strength;

        const y =
          ((e.clientY - window.innerHeight / 2) / window.innerHeight) * strength;

        setPosition({
          x,
          y,
        });
      });
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", handleMove);
    };
  }, [strength]);

  return position;
}
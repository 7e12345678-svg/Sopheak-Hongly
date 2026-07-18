"use client";

import { useEffect, useState } from "react";

export function useHeroTilt() {
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      setTilt({
        rotateY: x * 12,
        rotateX: -y * 10,
      });
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return tilt;
}
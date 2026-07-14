"use client";

import { useEffect, useState } from "react";
import { GamePackage } from "@/app/types/package";

export default function usePackages() {
  const [games, setGames] = useState<GamePackage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGames = async () => {
    try {
      const res = await fetch("/api/games");
      const data = await res.json();

      if (data.success) {
        setGames(data.games);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return {
    games,
    loading,
    refresh: fetchGames,
  };
}
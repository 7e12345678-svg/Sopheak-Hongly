"use client";

import { useEffect, useState } from "react";
import { Game } from "@/app/types/game";

export default function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const res = await fetch("/api/games");
      const data = await res.json();

      if (data.success) {
        setGames(data.games.filter((g: Game) => g.status));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    games,
    loading,
    refresh: fetchGames,
  };
}
"use client";

import { useEffect, useState } from "react";
import { gamesAPI } from "@/lib/api";
import { GameSummary } from "@/types/game";

interface HomeGamesState {
  popularGames: GameSummary[];
  topRatedGames: GameSummary[];
  isLoading: boolean;
  error: string | null;
}

export function useHomeGames(limit = 6): HomeGamesState {
  const [popularGames, setPopularGames] = useState<GameSummary[]>([]);
  const [topRatedGames, setTopRatedGames] = useState<GameSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const loadSections = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [popular, topRated] = await Promise.all([
          gamesAPI.getPopular(limit),
          gamesAPI.getTopRated(limit),
        ]);

        if (!isCancelled) {
          setPopularGames(popular);
          setTopRatedGames(topRated);
        }
      } catch (err) {
        if (!isCancelled) {
          const message = err instanceof Error ? err.message : "Erro ao carregar a home";
          setError(message);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadSections();

    return () => {
      isCancelled = true;
    };
  }, [limit]);

  return { popularGames, topRatedGames, isLoading, error };
}

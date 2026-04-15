"use client";

import { useEffect, useState } from "react";
import { gamesAPI } from "@/lib/api";
import { ExploreGamesFilters, GameSummary, PagedResponse } from "@/types/game";

interface UseExploreGamesParams {
  page: number;
  size: number;
  filters: ExploreGamesFilters;
}

export function useExploreGames({ page, size, filters }: UseExploreGamesParams) {
  const [data, setData] = useState<PagedResponse<GameSummary> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const loadGames = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await gamesAPI.explore({ page, size, ...filters });
        if (!isCancelled) {
          setData(response);
        }
      } catch (err) {
        if (!isCancelled) {
          const message = err instanceof Error ? err.message : "Erro ao carregar jogos";
          setError(message);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadGames();

    return () => {
      isCancelled = true;
    };
  }, [page, size, filters]);

  return {
    games: data?.content ?? [],
    meta: data,
    isLoading,
    error,
  };
}

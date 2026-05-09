import { useState, useCallback } from "react";
import { gamesAPI, recommendationsAPI } from "@/lib/api";
import { RecommendationResponse } from "@/types/game";
import { useToast } from "@/hooks/use-toast";

interface UseRecommendationsReturn {
  recommendation: RecommendationResponse | null;
  loading: boolean;
  error: string | null;
  generateRecommendation: () => Promise<void>;
  clearError: () => void;
}

export function useRecommendations(): UseRecommendationsReturn {
  const [recommendation, setRecommendation] = useState<RecommendationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const enrichRecommendation = useCallback(async (recommendation: RecommendationResponse): Promise<RecommendationResponse> => {
    if (!recommendation.gameSlug) {
      return recommendation;
    }

    if (recommendation.releaseDate && recommendation.averageRating > 0 && recommendation.coverUrl) {
      return recommendation;
    }

    try {
      const game = await gamesAPI.getBySlug(recommendation.gameSlug);

      return {
        ...recommendation,
        averageRating: recommendation.averageRating > 0 ? recommendation.averageRating : game.averageRating,
        defaultRating:
          typeof recommendation.defaultRating === "number" && recommendation.defaultRating > 0
            ? recommendation.defaultRating
            : game.defaultRating,
        releaseDate: recommendation.releaseDate ?? game.releaseDate,
        coverUrl: recommendation.coverUrl ?? game.coverUrl,
      };
    } catch {
      return recommendation;
    }
  }, []);

  const generateRecommendation = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await recommendationsAPI.generateOne();
      const enrichedResponse = await enrichRecommendation(response);
      setRecommendation(enrichedResponse);

      toast({
        title: "Recomendacao gerada!",
        description: `Confira o jogo: ${enrichedResponse.gameName}`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao gerar recomendacao";
      setError(errorMessage);

      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [enrichRecommendation, toast]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    recommendation,
    loading,
    error,
    generateRecommendation,
    clearError,
  };
}

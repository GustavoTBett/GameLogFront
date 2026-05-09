import type { GameSummary } from "./game";

export interface FavoriteStatusResponse {
  gameId: number;
  favorite: boolean;
  favoriteId: number | null;
}

export type FavoriteGame = GameSummary;

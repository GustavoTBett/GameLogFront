export type GamePlatform =
  | "PC"
  | "PLAYSTATION"
  | "XBOX"
  | "NINTENDO"
  | "MOBILE"
  | "CLOUD"
  | "VR"
  | "ARCADE";

export interface GameSummary {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  coverUrl: string | null;
  averageRating: number;
  releaseDate: string | null;
  developer: string | null;
  totalReviews: number;
  genres: string[];
  platforms: GamePlatform[];
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface GenreOption {
  id: number;
  name: string;
}

export interface ExploreGamesFilters {
  genreId?: number;
  platform?: GamePlatform;
  minRating?: number;
}

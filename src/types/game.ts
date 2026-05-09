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
  descriptionPtBr: string | null;
  coverUrl: string | null;
  averageRating: number;
  defaultRating?: number | null;
  releaseDate: string | null;
  developer: string | null;
  totalReviews: number;
  genres: string[];
  platforms: GamePlatform[];
}

export interface GameReview {
  id: number;
  score: number;
  review: string | null;
  username: string;
  createdAt: string;
  updatedAt?: string | null;
  upvoteCount: number;
  downvoteCount: number;
  userVote?: "UPVOTE" | "DOWNVOTE" | null;
}

export interface GameDetail extends GameSummary {
  reviews: GameReview[];
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
  q?: string;
}

export interface RecommendationResponse {
  gameName: string;
  gameSlug: string | null;
  reason: string;
  gameId: number | null;
  averageRating: number;
  defaultRating?: number | null;
  isNewlyImported: boolean;
  coverUrl: string | null;
  releaseDate?: string | null;
  generatedAt: string;
}

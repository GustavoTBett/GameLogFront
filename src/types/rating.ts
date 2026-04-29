export interface CreateRatingRequest {
  gameId: number;
  score: number;
  review?: string;
}

export interface RatingResponse {
  id: number;
  score: number;
  review: string | null;
  createdAt?: string;
  updatedAt?: string;
}
export interface CreateRatingRequest {
  gameId: number;
  score: number;
  review?: string;
}

export type RatingVoteType = "UPVOTE" | "DOWNVOTE";

export interface RatingVoteRequest {
  voteType: RatingVoteType;
}

export interface RatingResponse {
  id: number;
  score: number;
  review: string | null;
  createdAt?: string;
  updatedAt?: string;
  upvoteCount?: number;
  downvoteCount?: number;
  userVote?: RatingVoteType | null;
}
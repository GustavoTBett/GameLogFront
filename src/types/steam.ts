export interface SteamAccountResponse {
  linked: boolean;
  steamId: string | null;
  profileUrl: string | null;
  lastSyncedAt: string | null;
  synced: boolean;
}

export interface SteamUserReviewResponse {
  appId: number;
  gameName: string | null;
  gameSlug: string | null;
  coverUrl: string | null;
  reviewText: string | null;
  language: string | null;
  recommended: boolean | null;
  reviewedAt: string | null;
  active: boolean | null;
  importedAt: string | null;
}

export interface SteamSyncSummaryResponse {
  totalReviews: number;
  importedGames: number;
  savedReviews: number;
}

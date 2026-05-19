/**
 * Cliente HTTP centralizado para chamadas à API
 * Gerencia CSRF tokens, headers, e tratamento de erros globais
 */

import {
  AuthUserResponse,
  CsrfToken,
  ForgotPasswordRequest,
  LoginRequest,
  ResetPasswordRequest,
  UpdateProfileRequest,
} from "@/types/auth";
import { ExploreGamesFilters, GameDetail, GameSummary, GenreOption, PagedResponse, RecommendationResponse } from "@/types/game";
import { FavoriteStatusResponse } from "@/types/favorite";
import { CreateRatingRequest, RatingResponse, RatingVoteRequest } from "@/types/rating";
import { SteamAccountResponse, SteamSyncSummaryResponse, SteamUserReviewResponse } from "@/types/steam";
import { showErrorToast } from '@/lib/toast';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

// Cache de token CSRF
let csrfTokenCache: CsrfToken | null = null;

type ApiRequestError<T = unknown> = Error & {
  status?: number;
  data?: T;
};

/**
 * Busca o token CSRF do servidor
 */
async function fetchCsrfToken(): Promise<CsrfToken> {
  if (csrfTokenCache) {
    return csrfTokenCache;
  }

  const response = await fetch(`${API_BASE_URL}/auth/csrf`, {
    method: "GET",
    credentials: "include", // Incluir cookies
  });

  if (!response.ok) {
    throw new Error("Falha ao obter token CSRF");
  }

  const data = await response.json();
  csrfTokenCache = data;
  return data;
}

/**
 * Cliente HTTP wrapper que adiciona CSRF token e headers automáticos
 */
function hasMessage(value: unknown): value is { message?: unknown } {
  return typeof value === "object" && value !== null && "message" in value;
}

async function fetchAPI<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data: T; status: number }> {
  const url = `${API_BASE_URL}${endpoint}`;
  const method = options.method || "GET";

  // Preparar headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  // Adicionar CSRF token para requisições não-GET
  if (method !== "GET") {
    try {
      const csrfToken = await fetchCsrfToken();
      headers[csrfToken.headerName] = csrfToken.token;
    } catch (error) {
      console.error("Erro ao obter CSRF token:", error);
    }
  }

  try {
    const response = await fetch(url, {
      ...options,
      method,
      headers,
      credentials: "include", // Incluir cookies de sessão
    });

    let data: T;
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      data = (await response.text()) as T;
    }

    // Tratamento de erros
    if (!response.ok) {
      const maybeMessage = hasMessage(data) ? data.message : undefined;
      const fallbackMessage =
        response.status === 400
          ? "Não foi possível gerar a recomendação"
          : response.status === 503
            ? "Serviço de recomendação temporariamente indisponível. Tente novamente em instantes."
          : response.status === 401
            ? "Sua sessão expirou. Faça login novamente."
            : "Erro na requisição";

      const error: ApiRequestError<T> = new Error(
        maybeMessage ? String(maybeMessage) : fallbackMessage
      );
      error.status = response.status;
      error.data = data;

      // Mostrar mensagem do backend se existir
      try {
        if (maybeMessage) showErrorToast(String(maybeMessage));
      } catch {
      }

      // Se for 401 em chamadas protegidas, disparar logout automático.
      // A checagem inicial de /auth/me é silenciosa para não poluir a UI ao abrir o app deslogado.
      if (response.status === 401 && !endpoint.startsWith("/auth/me")) {
        // Disparar evento para logout automático (será tratado no contexto)
        window.dispatchEvent(new CustomEvent("auth:unauthorized"));
      }

      throw error;
    }

    return { data, status: response.status };
  } catch (error) {
    // Se for erro de rede, re-lançar
    if (error instanceof TypeError) {
      const errorMessage = `Erro de conexão: ${error.message}`;
      try {
        showErrorToast(errorMessage);
      } catch {
      }
      throw new Error(errorMessage);
    }
    throw error;
  }
}

/**
 * Endpoints de autenticação
 */
export const authAPI = {
  googleLoginUrl: (): string => `${API_BASE_URL}/oauth2/authorization/google`,

  /**
   * Fazer login
   */
  login: async (identifier: string, password: string): Promise<AuthUserResponse> => {
    const { data } = await fetchAPI<AuthUserResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ identifier, password } as LoginRequest),
    });
    // Invalidar cache de CSRF após login
    csrfTokenCache = null;
    return data;
  },

  /**
   * Fazer logout
   */
  logout: async (): Promise<void> => {
    await fetchAPI("/auth/logout", {
      method: "POST",
    });
    // Invalidar cache de CSRF
    csrfTokenCache = null;
  },

  /**
   * Obter dados do usuário autenticado
   */
  getCurrentUser: async (): Promise<AuthUserResponse> => {
    const { data } = await fetchAPI<AuthUserResponse>("/auth/me", {
      method: "GET",
    });
    return data;
  },

  /**
   * Registrar novo usuário
   */
  register: async (email: string, username: string, password: string): Promise<AuthUserResponse> => {
    const { data } = await fetchAPI<AuthUserResponse>("/users", {
      method: "POST",
      body: JSON.stringify({ email, username, password }),
    });
    // Invalidar cache de CSRF
    csrfTokenCache = null;
    return data;
  },

  /**
   * Solicitar link de recuperação de senha
   */
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const { data } = await fetchAPI<{ message: string }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email } as ForgotPasswordRequest),
    });

    csrfTokenCache = null;
    return data;
  },

  /**
   * Redefinir senha com token recebido por email
   */
  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    const { data } = await fetchAPI<{ message: string }>("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, newPassword } as ResetPasswordRequest),
    });

    csrfTokenCache = null;
    return data;
  },
};

export const steamAPI = {
  connectUrl: (): string => `${API_BASE_URL}/auth/steam`,

  getMyAccount: async (): Promise<SteamAccountResponse> => {
    const { data } = await fetchAPI<SteamAccountResponse>("/steam/me", {
      method: "GET",
    });

    return data;
  },

  getMyReviews: async (): Promise<SteamUserReviewResponse[]> => {
    const { data } = await fetchAPI<SteamUserReviewResponse[]>("/steam/me/reviews", {
      method: "GET",
    });

    return data;
  },

  syncMyAccount: async (): Promise<SteamSyncSummaryResponse> => {
    const { data } = await fetchAPI<SteamSyncSummaryResponse>("/steam/me/sync", {
      method: "POST",
    });

    return data;
  },
};

export const usersAPI = {
  getProfile: async (): Promise<AuthUserResponse> => {
    const { data } = await fetchAPI<AuthUserResponse>("/users/me", {
      method: "GET",
    });
    return data;
  },

  updateProfile: async (payload: UpdateProfileRequest): Promise<AuthUserResponse> => {
    const { data } = await fetchAPI<AuthUserResponse>("/users/me", {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    return data;
  },
};

export const favoritesAPI = {
  getMine: async (): Promise<GameSummary[]> => {
    const { data } = await fetchAPI<GameSummary[]>("/favorites/me", {
      method: "GET",
    });
    return data;
  },

  getStatus: async (gameId: number): Promise<FavoriteStatusResponse> => {
    const { data } = await fetchAPI<FavoriteStatusResponse>(`/favorites/games/${gameId}`, {
      method: "GET",
    });
    return data;
  },

  favorite: async (gameId: number): Promise<FavoriteStatusResponse> => {
    const { data } = await fetchAPI<FavoriteStatusResponse>(`/favorites/games/${gameId}`, {
      method: "POST",
    });
    return data;
  },

  unfavorite: async (gameId: number): Promise<void> => {
    await fetchAPI<void>(`/favorites/games/${gameId}`, {
      method: "DELETE",
    });
  },
};

export const gamesAPI = {
  explore: async (
    params: ExploreGamesFilters & { page?: number; size?: number }
  ): Promise<PagedResponse<GameSummary>> => {
    const searchParams = new URLSearchParams();

    searchParams.set("page", String(params.page ?? 0));
    searchParams.set("size", String(params.size ?? 12));

    if (params.genreId) {
      searchParams.set("genreId", String(params.genreId));
    }

    if (params.platform) {
      searchParams.set("platform", params.platform);
    }

    if (typeof params.minRating === "number") {
      searchParams.set("minRating", String(params.minRating));
    }

    if (typeof (params as { q?: string }).q === "string" && (params as { q?: string }).q?.trim()) {
      searchParams.set("q", (params as { q?: string }).q!.trim());
    }

    const { data } = await fetchAPI<PagedResponse<GameSummary>>(`/games/explore?${searchParams.toString()}`);
    return data;
  },

  getPopular: async (limit = 6): Promise<GameSummary[]> => {
    const { data } = await fetchAPI<GameSummary[]>(`/games/popular?limit=${limit}`);
    return data;
  },

  getTopRated: async (limit = 6): Promise<GameSummary[]> => {
    const { data } = await fetchAPI<GameSummary[]>(`/games/top-rated?limit=${limit}`);
    return data;
  },

  getBySlug: async (slug: string): Promise<GameDetail> => {
    const { data } = await fetchAPI<GameDetail>(`/games/slug/${encodeURIComponent(slug)}`);
    return data;
  },
};

export const genresAPI = {
  getAll: async (): Promise<GenreOption[]> => {
    const { data } = await fetchAPI<GenreOption[]>("/genres");
    return data;
  },
};

export const ratingsAPI = {
  create: async (payload: CreateRatingRequest): Promise<RatingResponse> => {
    const { data } = await fetchAPI<RatingResponse>("/ratings", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return data;
  },
  update: async (id: number, payload: CreateRatingRequest): Promise<RatingResponse> => {
    const { data } = await fetchAPI<RatingResponse>(`/ratings/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    return data;
  },
  vote: async (ratingId: number, payload: RatingVoteRequest): Promise<void> => {
    await fetchAPI<void>(`/ratings/${ratingId}/vote`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  removeVote: async (ratingId: number): Promise<void> => {
    await fetchAPI<void>(`/ratings/${ratingId}/vote`, {
      method: "DELETE",
    });
  },
};

export const recommendationsAPI = {
  generateOne: async (): Promise<RecommendationResponse> => {
    const { data } = await fetchAPI<RecommendationResponse>("/recommendations/generate", {
      method: "POST",
    });
    return data;
  },
};

export default fetchAPI;

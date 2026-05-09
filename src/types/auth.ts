/**
 * Tipos de autenticação do Gamelog
 */

import type { GamePlatform } from "./game";

export interface LoginRequest {
  identifier: string; // Email ou username
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface AuthUserResponse {
  id: number;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
  avatarUrl?: string | null;
  bio?: string | null;
  platforms?: GamePlatform[];
}

export type User = AuthUserResponse;

export interface UpdateProfileRequest {
  username: string;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
  platforms: GamePlatform[];
}

export interface CsrfToken {
  token: string;
  headerName: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

/**
 * Tipos de autenticação do Gamelog
 */

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
}

export type User = AuthUserResponse;

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

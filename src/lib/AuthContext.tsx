"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";
import { authAPI } from "./api";
import { AuthContextType, User } from "@/types/auth";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Restaurar usuário do localStorage ao inicializar
  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Erro ao restaurar usuário do localStorage:", error);
        localStorage.removeItem("auth_user");
      }
    }
    setIsLoading(false);
  }, []);

  /**
   * Sincronizar com o servidor para validar sessão
   */
  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const userData = await authAPI.getCurrentUser();
      setUser(userData);
      localStorage.setItem("auth_user", JSON.stringify(userData));
      setError(null);
    } catch (err: any) {
      // Se houver erro (401, etc), limpar dados locais
      setUser(null);
      localStorage.removeItem("auth_user");
      setError(err.message || "Erro ao verificar autenticação");
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Fazer login
   */
  const login = useCallback(
    async (identifier: string, password: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const userData = await authAPI.login(identifier, password);
        setUser(userData);
        localStorage.setItem("auth_user", JSON.stringify(userData));
      } catch (err: any) {
        setUser(null);
        localStorage.removeItem("auth_user");
        setError(
          err.data?.message || err.message || "Erro ao fazer login"
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Fazer logout
   */
  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await authAPI.logout();
      setUser(null);
      localStorage.removeItem("auth_user");
      setError(null);
    } catch (err: any) {
      console.error("Erro ao fazer logout:", err);
      // Mesmo com erro, limpar dados locais
      setUser(null);
      localStorage.removeItem("auth_user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Listener para logout automático (401 Unauthorized)
  useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null);
      localStorage.removeItem("auth_user");
      setError("Sessão expirada. Faça login novamente.");
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, []);

  const value: AuthContextType = {
    user: user || null,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

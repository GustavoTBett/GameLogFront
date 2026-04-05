"use client";

import { useContext } from "react";
import { AuthContext } from "@/lib/AuthContext";
import { AuthContextType } from "@/types/auth";

/**
 * Hook para acessar contexto de autenticação
 * Use em componentes cliente que precisam de dados ou funções de auth
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth deve ser usado dentro de um AuthProvider"
    );
  }

  return context;
}

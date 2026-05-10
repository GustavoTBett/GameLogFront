"use client";

import { useEffect } from "react";
import { useAuth } from "./useAuth";

/**
 * Hook para sincronizar sessão com o servidor ao inicializar o app
 * Valida se o usuário salvo no localStorage ainda tem sessão ativa
 */
export function useAuthInit() {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth().catch((error) => {
      console.error("Erro ao sincronizar sessão:", error);
    });
  }, [checkAuth]);
}

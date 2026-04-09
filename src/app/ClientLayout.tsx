"use client";

import React from "react";
import { useAuthInit } from "@/hooks/useAuthInit";

interface ClientLayoutProps {
  children: React.ReactNode;
}

/**
 * Wrapper cliente para inicializar autenticação
 * Sincroniza sessão com o servidor ao carregar a aplicação
 */
export default function ClientLayout({ children }: ClientLayoutProps) {
  useAuthInit();
  return <>{children}</>;
}

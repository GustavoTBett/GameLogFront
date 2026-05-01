"use client";

import React from "react";
import { useAuthInit } from "@/hooks/useAuthInit";
import { Toaster } from '@/components/ui/toaster/Toaster';

interface ClientLayoutProps {
  children: React.ReactNode;
}

/**
 * Wrapper cliente para inicializar autenticação
 * Sincroniza sessão com o servidor ao carregar a aplicação
 */
export default function ClientLayout({ children }: ClientLayoutProps) {
  useAuthInit();
  return (
    <>
      {children}
      <Toaster />
      {/* Dev-only test button removed */}
    </>
  );
}

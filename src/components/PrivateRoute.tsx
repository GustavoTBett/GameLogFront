"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface PrivateRouteProps {
  children: ReactNode;
  requiredRole?: "USER" | "ADMIN";
}

/**
 * Componente wrapper para proteger rotas
 * Redireciona para /login se não autenticado
 * Opcionalmente valida role de usuário
 */
export function PrivateRoute({ children, requiredRole }: PrivateRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuth();

  // Enquanto carrega, mostrar loader simples ou nada
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  // Se não autenticado, redirecionar para login
  if (!isAuthenticated) {
    router.push("/login");
    return <div className="flex items-center justify-center min-h-screen">Redirecionando...</div>;
  }

  // Se requer role específica e usuário não tem, mostrar erro
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold text-foreground">Acesso Negado</h1>
        <p className="text-muted-foreground">
          Você não tem permissão para acessar esta página
        </p>
      </div>
    );
  }

  // Se passou em todas as validações, renderizar conteúdo
  return <>{children}</>;
}

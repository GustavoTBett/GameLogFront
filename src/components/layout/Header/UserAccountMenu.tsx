/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, Heart, Sparkles, LogOut } from "lucide-react"
import * as S from "./Header.styled"
import { useAuth } from "@/hooks/useAuth"
import { ThemeToggle } from "@/components/ui/theme-toggle/ThemeToggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown/DropdownMenu"
import styled from "styled-components"

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as any).spacing[8]};
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => (theme as any).colors.destructive};
  font-size: ${({ theme }) => (theme as any).fontSizes[14]};
  padding: 0;
  transition: all 0.2s;
  
  &:hover {
    opacity: 0.8;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export function UserAccountMenu() {
  const router = useRouter()
  const { isAuthenticated, user, logout, isLoading } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  if (!isAuthenticated || !user) {
    return (
      <S.UserActions>
        <ThemeToggle />
        <Link href="/login"><S.ActionButton $variant="ghost">Entrar</S.ActionButton></Link>
        <Link href="/register"><S.ActionButton $variant="primary">Cadastrar</S.ActionButton></Link>
      </S.UserActions>
    )
  }

  return (
    <S.UserActions>
      <ThemeToggle />
      <Link href="/favoritos">
        <S.ActionButton $variant="ghost">
          <Heart size={20} />
        </S.ActionButton>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <S.ActionButton $variant="ghost">
            <User size={20} />
          </S.ActionButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div className="px-2 py-1.5 text-sm font-medium text-foreground">
            {user.username}
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <S.MenuLink href="/perfil"><User size={16} /> Meu Perfil</S.MenuLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <S.MenuLink href="/favoritos"><Heart size={16} /> Favoritos</S.MenuLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <S.MenuLink href="/recomendacoes"><Sparkles size={16} /> Recomendações</S.MenuLink>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <LogoutButton onClick={handleLogout} disabled={isLoading}>
              <LogOut size={16} /> Sair
            </LogoutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </S.UserActions>
  )
}
"use client"

import { usePathname, useRouter } from "next/navigation"
import { Heart, User, LogOut } from "lucide-react"
import * as S from "./Header.styled"
import { useAuth } from "@/hooks/useAuth"
import styled, { type DefaultTheme } from "styled-components"

const fromTheme = <T,>(selector: (theme: DefaultTheme) => T) =>
  ({ theme }: { theme: DefaultTheme }) => selector(theme)

const mainLinks = [
  { href: "/", label: "Início" },
  { href: "/jogos", label: "Jogos" },
  { href: "/recomendacoes", label: "Recomendações" },
]

const LogoutNavItem = styled.button`
  display: flex;
  align-items: center;
  gap: ${fromTheme((theme) => theme.spacing[8])};
  font-size: ${fromTheme((theme) => theme.fontSizes[14])};
  font-weight: ${fromTheme((theme) => theme.fontWeights.medium)};
  text-decoration: none;
  transition: all 0.2s;
  
  padding: ${fromTheme((theme) => `${theme.spacing[8]} ${theme.spacing[12]}`)};
  border-radius: ${fromTheme((theme) => theme.spacing[8])};
  
  background-color: transparent;
  color: ${fromTheme((theme) => theme.colors.destructive)};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${fromTheme((theme) => theme.colors.secondary)};
    color: ${fromTheme((theme) => theme.colors.destructive)};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface NavLinksProps {
  isMobile?: boolean
  onClose?: () => void
}

export function NavLinks({ isMobile, onClose }: NavLinksProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, logout, isLoading } = useAuth()

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href)

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
      onClose?.()
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  return (
    <>
      {mainLinks.map((link) => (
        <S.NavItem
          key={link.href}
          href={link.href}
          $isActive={isActive(link.href)}
          $isMobile={isMobile}
          onClick={onClose}
        >
          {link.label}
        </S.NavItem>
      ))}

      {isMobile && isAuthenticated && (
        <>
          <S.NavItem href="/favoritos" $isMobile onClick={onClose}>
            <Heart size={18} /> Favoritos
          </S.NavItem>
          <S.NavItem href="/perfil" $isMobile onClick={onClose}>
            <User size={18} /> Meu Perfil
          </S.NavItem>
          <LogoutNavItem 
            onClick={handleLogout}
            disabled={isLoading}
          >
            <LogOut size={18} /> Sair
          </LogoutNavItem>
        </>
      )}
    </>
  )
}
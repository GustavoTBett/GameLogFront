"use client"

import { usePathname, useRouter } from "next/navigation"
import { Heart, User, LogOut } from "lucide-react"
import * as S from "./Header.styled"
import { useAuth } from "@/hooks/useAuth"

const mainLinks = [
  { href: "/", label: "Início" },
  { href: "/jogos", label: "Jogos" },
  { href: "/recomendacoes", label: "Recomendações" },
]
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
          <S.LogoutNavItem 
            onClick={handleLogout}
            disabled={isLoading}
          >
            <LogOut size={18} /> Sair
          </S.LogoutNavItem>
        </>
      )}
    </>
  )
}
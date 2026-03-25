import { usePathname } from "next/navigation"
import { Heart, User, LogOut } from "lucide-react"
import * as S from "./Header.styled"

const mainLinks = [
  { href: "/", label: "Início" },
  { href: "/jogos", label: "Jogos" },
  { href: "/recomendacoes", label: "Recomendações" },
]

interface NavLinksProps {
  isMobile?: boolean
  isLoggedIn?: boolean
  onClose?: () => void
}

export function NavLinks({ isMobile, isLoggedIn, onClose }: NavLinksProps) {
  const pathname = usePathname()
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href)

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

      {isMobile && isLoggedIn && (
        <>
          <S.NavItem href="/favoritos" $isMobile onClick={onClose}>
            <Heart size={18} /> Favoritos
          </S.NavItem>
          <S.NavItem href="/perfil" $isMobile onClick={onClose}>
            <User size={18} /> Meu Perfil
          </S.NavItem>
          <S.NavItem href="/login" $isMobile $danger onClick={onClose}>
            <LogOut size={18} /> Sair
          </S.NavItem>
        </>
      )}
    </>
  )
}
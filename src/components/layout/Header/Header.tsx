"use client"

import { useState } from "react"
import { Menu, X, Gamepad2 } from "lucide-react"
import * as S from "./Header.styled"
import { useAuth } from "@/hooks/useAuth"

import { NavLinks } from "./NavLinks"
import { SearchForm } from "./SearchForm"
import { UserAccountMenu } from "./UserAccountMenu"

export function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { isAuthenticated } = useAuth()

  return (
    <S.Nav $isOpen={isMobileOpen}>
      <S.Container>
        <S.NavContent>
          <S.LogoLink href="/" onClick={() => setIsMobileOpen(false)}>
            <Gamepad2 size={32} />
            <span>GameLog</span>
          </S.LogoLink>

          <S.DesktopNav>
            <NavLinks />
          </S.DesktopNav>

          <SearchForm />

          <UserAccountMenu />

          <S.MobileMenuButton onClick={() => setIsMobileOpen(!isMobileOpen)}>
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </S.MobileMenuButton>
        </S.NavContent>

        {isMobileOpen && (
          <S.MobileMenu>
            <S.MobileNavList>
              <SearchForm isMobile />
              
              <NavLinks 
                isMobile
                onClose={() => setIsMobileOpen(false)} 
              />
            </S.MobileNavList>
          </S.MobileMenu>
        )}
      </S.Container>
    </S.Nav>
  )
}
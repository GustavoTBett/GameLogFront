"use client"

import { useState } from "react"
import { Menu, X, Gamepad2 } from "lucide-react"
import * as S from "./Header.styled"

import { NavLinks } from "./NavLinks"
import { SearchForm } from "./SearchForm"
import { UserAccountMenu } from "./UserAccountMenu"

export function Header({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <S.Nav>
      <S.Container>
        <S.NavContent>
          <S.LogoLink href="/" onClick={() => setIsMobileOpen(false)}>
            <Gamepad2 size={32} />
            <span>GameVault</span>
          </S.LogoLink>

          <S.DesktopNav>
            <NavLinks />
          </S.DesktopNav>

          <SearchForm />

          <UserAccountMenu isLoggedIn={isLoggedIn} />

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
                isLoggedIn={isLoggedIn} 
                onClose={() => setIsMobileOpen(false)} 
              />
            </S.MobileNavList>
          </S.MobileMenu>
        )}
      </S.Container>
    </S.Nav>
  )
}
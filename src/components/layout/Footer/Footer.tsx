"use client"

import { Gamepad2 } from "lucide-react"
import * as S from "./Footer.styled"

export function Footer() {
  return (
    <S.FooterWrapper>
      <S.Container>
        <S.Content>
          <S.LogoContainer>
            <Gamepad2 />
            <span>GameLog</span>
          </S.LogoContainer>
          
          <S.Description>
            Projeto educacional de review de jogos
          </S.Description>
        </S.Content>
      </S.Container>
    </S.FooterWrapper>
  )
}
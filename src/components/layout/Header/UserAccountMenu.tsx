import Link from "next/link"
import { User, Heart, Sparkles, LogOut } from "lucide-react"
import * as S from "./Header.styled"
import { ThemeToggle } from "@/components/features/ThemeToggle/ThemeToggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/features/Dropdown/DropdownMenu"

export function UserAccountMenu({ isLoggedIn }: { isLoggedIn: boolean }) {
  if (!isLoggedIn) {
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
            <S.MenuLink href="/login" $danger><LogOut size={16} /> Sair</S.MenuLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </S.UserActions>
  )
}
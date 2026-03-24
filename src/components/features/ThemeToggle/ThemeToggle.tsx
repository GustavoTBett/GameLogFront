"use client"

import { Sun, Moon } from "lucide-react";
import * as S from "./ThemeToggle.styled";
import { useTheme } from "@/lib/ThemeProvider";

export function ThemeToggle() {
  const { themeName, toggleTheme } = useTheme();

  return (
    <S.ToggleButton 
      onClick={toggleTheme} 
      aria-label="Alternar tema"
      title={`Mudar para modo ${themeName === 'light' ? 'escuro' : 'claro'}`}
    >
      {themeName === "light" ? (
        <Moon size={20} />
      ) : (
        <Sun size={20} />
      )}
    </S.ToggleButton>
  );
}
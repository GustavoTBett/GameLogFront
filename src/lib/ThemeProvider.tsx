"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { themes, ThemeName, FullTheme } from "../styles/theme";
import { GlobalStyles } from "../styles/GlobalStyles";

interface ThemeContextType {
  themeName: ThemeName;
  toggleTheme: () => void;
  theme: FullTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme") as ThemeName;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    
    requestAnimationFrame(() => {
      setThemeName(savedTheme || systemTheme);
    });
  }, []);

  const toggleTheme = () => {
    setThemeName((prev) => {
      const current = prev || "light";
      const newTheme = current === "light" ? "dark" : "light";
      localStorage.setItem("app-theme", newTheme);
      return newTheme;
    });
  };

  const currentTheme = useMemo(() => themes[themeName || "dark"], [themeName]);

  const contextValue = useMemo(() => ({
    themeName: themeName || "dark",
    toggleTheme,
    theme: currentTheme,
  }), [themeName, currentTheme]);

  if (themeName === null) {
    return null; 
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={currentTheme}>
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within an AppThemeProvider");
  return context;
};
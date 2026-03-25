const palette = {
  brand: "#16a34a",
  white: "#ffffff",
  black: "#050505",
  
  yellow: "#eab308",
  teal: "#0d9488",
  purple: "#a855f7",
  redLight: "#ef4444",
  redDark: "#dc2626",

  zinc: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    800: "#262626",
    900: "#18181b",
    950: "#09090b",
    darkMuted: "#141414",
    darkSecondary: "#1a1a1a",
    darkHover: "#0a0a0a",
    darkPopover: "#080808",
  }
};

const breakpoints = {
  mobile: "480px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1440px",
  ultraWide: "1920px",
};

const chartColors = {
  green: palette.brand,
  yellow: palette.yellow,
  teal: palette.teal,
  purple: palette.purple,
};

const sharedTheme = {
  breakpoints,
  brand: {
    green: palette.brand,
  },
  media: {
    mobile: `@media (min-width: ${breakpoints.mobile})`,
    tablet: `@media (min-width: ${breakpoints.tablet})`,
    laptop: `@media (min-width: ${breakpoints.laptop})`,
    desktop: `@media (min-width: ${breakpoints.desktop})`,
    ultraWide: `@media (min-width: ${breakpoints.ultraWide})`,
  },
  fontSizes: {
    10: "0.625rem", // Textos micro (badges, tooltips)
    12: "0.75rem",  // Legendas e rodapés
    14: "0.875rem", // UI padrão (botões, menus, inputs)
    16: "1rem",     // Texto base (parágrafos)
    18: "1.125rem", // Destaques leves
    20: "1.25rem",  // Subtítulos (H4)
    24: "1.5rem",   // Títulos internos (H3)
    32: "2rem",     // Cabeçalhos (H2)
    40: "2.5rem",   // Títulos principais (H1)
    48: "3rem",     // Banners e Hero sections
    64: "4rem",     // Títulos gigantes de impacto
  },
  fontWeights: { light: 300, regular: 400, medium: 500, bold: 700 },
  lineHeights: { none: 1, tight: 1.25, normal: 1.5, tall: 1.8 },
  spacing: {
    2: "0.125rem", 4: "0.25rem", 8: "0.5rem", 12: "0.75rem", 16: "1rem",
    24: "1.5rem", 32: "2rem", 48: "3rem", 64: "4rem",
  },
};

export const themes = {
  light: {
    ...sharedTheme,
    title: "light",
    colors: {
      background: palette.white,
      foreground: palette.zinc[950],

      card: palette.white,
      cardForeground: palette.zinc[950],
      popover: palette.white,
      popoverForeground: palette.zinc[950],

      primary: palette.brand,
      primaryForeground: palette.white,

      secondary: palette.zinc[100],
      secondaryForeground: palette.zinc[900],

      muted: palette.zinc[100],
      mutedForeground: "#71717a",

      accent: "#fef08a",
      accentForeground: "#713f12",
      destructive: palette.redLight,
      destructiveForeground: palette.white,

      border: palette.zinc[200],
      input: palette.zinc[200],
      ring: palette.brand,

      ...chartColors,
      red: palette.redLight,

      sidebar: palette.zinc[50],
      sidebarForeground: palette.zinc[950],
      sidebarPrimary: palette.brand,
      sidebarPrimaryForeground: palette.white,
      sidebarAccent: palette.zinc[100],
      sidebarAccentForeground: palette.zinc[900],
      sidebarBorder: palette.zinc[200],
      sidebarRing: palette.brand,
    },
    shadows: {
      shadow1: "0 4px 12px rgba(0, 0, 0, 0.05)",
      shadow2: "0 2px 10px rgba(0,0,0,0.2)",
      shadow3: "0 8px 20px rgba(0, 0, 0, 0.1)",
    },
  },
  dark: {
    ...sharedTheme,
    title: "dark",
    colors: {
      background: palette.black,
      foreground: "#f0f0f0",

      card: palette.zinc.darkHover,
      cardForeground: "#f0f0f0",
      popover: palette.zinc.darkPopover,
      popoverForeground: "#f0f0f0",

      primary: palette.brand,
      primaryForeground: palette.black,

      secondary: palette.zinc.darkSecondary,
      secondaryForeground: "#e1e1e1",

      muted: palette.zinc.darkMuted,
      mutedForeground: "#909090",

      accent: palette.yellow,
      accentForeground: palette.black,
      destructive: palette.redDark,
      destructiveForeground: "#f0f0f0",

      border: palette.zinc[800],
      input: palette.zinc.darkMuted,
      ring: palette.brand,

      ...chartColors,
      red: palette.redDark,

      sidebar: palette.zinc.darkPopover,
      sidebarForeground: "#f0f0f0",
      sidebarPrimary: palette.brand,
      sidebarPrimaryForeground: palette.black,
      sidebarAccent: palette.zinc.darkSecondary,
      sidebarAccentForeground: "#f0f0f0",
      sidebarBorder: palette.zinc[800],
      sidebarRing: palette.brand,
    },
    shadows: {
      shadow1: "0 4px 12px rgba(0, 0, 0, 0.1)",
      shadow2: "0 2px 10px rgba(0,0,0,0.4)",
      shadow3: "0 8px 24px rgba(0, 0, 0, 0.2)",
    },
  },
};

export type ThemeName = "light" | "dark";
export type FullTheme = typeof themes.light;
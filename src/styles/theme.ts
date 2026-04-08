const palette = {
  
  dark: {
    background: "#040404",
    foreground: "#ededed",
    card: "#090909",
    primary: "#22c55e",
    primaryForeground: "#040404",
    secondary: "#18181b",
    muted: "#121212",
    mutedForeground: "#909090",
    border: "#202023",
    sidebar: "#060606",
    sidebarAccent: "#18181b",
    sidebarBorder: "#202023",
    accent: "#eab308",
  },
  
  
  light: {
    background: "#ffffff",
    foreground: "#09090b",
    card: "#fafafa",
    primary: "#008dc2",
    primaryForeground: "#ffffff",
    secondary: "#f1f1f2",
    muted: "#f4f4f5",
    mutedForeground: "#71717a",
    border: "#e4e4e7",
    sidebar: "#ffffff",
    sidebarAccent: "#f4f4f5",
    sidebarBorder: "#e4e4e7",
    accent: "#e0f2fe",
  },

  
  status: {
    success: "#22c55e",
    warning: "#eab308",
    destructive: "#ef4444",
    destructiveForeground: "#ededed",
  },

  charts: {
    chart3: "#0ea5e9",
    chart4: "#a855f7",
  }
};

const breakpoints = {
  mobile: "480px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1440px",
  ultraWide: "1920px",
};

const sharedTheme = {
  media: {
    mobile: `@media (min-width: ${breakpoints.mobile})`,
    tablet: `@media (min-width: ${breakpoints.tablet})`,
    laptop: `@media (min-width: ${breakpoints.laptop})`,
    desktop: `@media (min-width: ${breakpoints.desktop})`,
    ultraWide: `@media (min-width: ${breakpoints.ultraWide})`,
  },
  spacing: {
    2: "0.125rem", 4: "0.25rem", 6: "0.375rem", 8: "0.5rem", 10: "0.625rem",12: "0.75rem", 16: "1rem", 20: "1.25rem", 24: "1.5rem", 32: "2rem", 40: "2.5rem", 48: "3rem", 64: "4rem",
  },
  fontSizes: {
    12: "0.75rem", 14: "0.875rem", 16: "1rem", 18: "1.125rem", 20: "1.25rem",
  },
  fontWeights: { regular: 400, medium: 500, bold: 700 },
  lineHeights: { none: 1, tight: 1.25, normal: 1.5, tall: 1.8 },
  shadows: {
      shadow1: "0 4px 12px rgba(0, 0, 0, 0.05)",
      shadow2: "0 2px 10px rgba(0,0,0,0.2)",
      shadow3: "0 8px 20px rgba(0, 0, 0, 0.1)",
  }
};

export const themes = {
  dark: {
    ...sharedTheme,
    title: "dark",
    colors: {
      ...palette.dark,
      popover: palette.dark.sidebar,
      popoverForeground: palette.dark.foreground,
      cardForeground: palette.dark.foreground,
      secondaryForeground: "#e2e2e2",
      accentForeground: palette.dark.background,
      ring: palette.dark.primary,
      input: palette.dark.muted,
      sidebarForeground: palette.dark.foreground,
      sidebarPrimary: palette.dark.primary,
      sidebarPrimaryForeground: palette.dark.background,
      sidebarAccentForeground: palette.dark.foreground,
      sidebarRing: palette.dark.primary,
      ...palette.status,
      ...palette.charts,
    },
  },
  light: {
    ...sharedTheme,
    title: "light",
    colors: {
      ...palette.light,
      popover: palette.light.card,
      popoverForeground: palette.light.foreground,
      cardForeground: palette.light.foreground,
      secondaryForeground: palette.light.foreground,
      accentForeground: palette.light.primary,
      ring: palette.light.primary,
      input: palette.light.border,
      sidebarForeground: palette.light.foreground,
      sidebarPrimary: palette.light.primary,
      sidebarPrimaryForeground: palette.light.primaryForeground,
      sidebarAccentForeground: palette.light.foreground,
      sidebarRing: palette.light.primary,
      ...palette.status,
    },
  },
};

export type ThemeName = "light" | "dark";
export type FullTheme = typeof themes.dark;
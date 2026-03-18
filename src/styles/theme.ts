const brandColors = {
  blue: "#4b63af",
};

const breakpoints = {
  mobile: "480px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1440px",
  ultraWide: "1920px"
};

const sharedTheme = {
  brand: brandColors,
  breakpoints,
  media: {
    mobile: `@media (min-width: ${breakpoints.mobile})`,
    tablet: `@media (min-width: ${breakpoints.tablet})`,
    laptop: `@media (min-width: ${breakpoints.laptop})`,
    desktop: `@media (min-width: ${breakpoints.desktop})`,
    ultraWide: `@media (min-width: ${breakpoints.ultraWide})`,
  },
  fontSizes: {
    small: "0.75rem",     // Legendas, detalhes
    text: "1rem",         // O padrão do corpo do site
    subtitle: "1.25rem",  // Subtítulos de seções
    title: "1.5rem",      // Títulos internos
    heading: "2rem",      // Títulos de destaque
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
  },
  lineHeights: {
    none: 1,
    tight: 1.25,
    normal: 1.5,
    tall: 1.8,
  },
  // Os nomes em números são em pixels convertidos para rem 
  spacing: {
    2: "0.125rem",
    4: "0.25rem",
    8: "0.5rem",
    12: "0.75rem",
    16: "1rem",
    24: "1.5rem",
    32: "2rem",
    48: "3rem",
    64: "4rem",
  },
};

export const themes = {
  light: {
    ...sharedTheme,
    title: "light",
    colors: {
      background: "#ffffff",
      text: "#1a1a1a",
      textSecondary: "#555",
      border: "#e0e0e0",
      borderFocus: "#ccc",
      backgroundContrast: "#f0f0f0",
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
      background: "#1a1a1a",
      text: "#e0e0e0",
      textSecondary: "#bbb",
      border: "#333",
      borderFocus: "#555",
      backgroundContrast: "#2a2a2a",
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

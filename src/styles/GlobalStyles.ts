"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* Suaviza a renderização das fontes em MacOS e Windows */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    /* Garante que o scroll seja suave ao usar âncoras (#) */
    scroll-behavior: smooth;
    /* Evita que o zoom automático em inputs no iOS quebre o layout */
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: 93.75%;
    }
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: ${({ theme }) => theme.fontSizes[12]};
    line-height: ${({ theme }) => theme.lineHeights.normal};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    min-height: 100vh;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.foreground};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: ${({ theme }) => theme.lineHeights.tight};
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: filter 0.2s ease;
    cursor: pointer;

    &:hover {
      filter: brightness(0.8);
    }
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    color: inherit;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  ul, ol {
    list-style: none;
  }

  button, input, select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
  }
`;
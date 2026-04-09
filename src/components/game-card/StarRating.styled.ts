"use client";

import styled, { css } from "styled-components";

interface SizeProps {
  $size: "sm" | "md" | "lg";
}

const gapMap = {
  sm: "0.125rem",
  md: "0.25rem",
  lg: "0.375rem",
};

const sizeMap = {
  sm: "1rem",
  md: "1.25rem",
  lg: "1.75rem",
};

const fontMap = {
  sm: "0.875rem",
  md: "1rem",    
  lg: "1.125rem",
};

export const Container = styled.div<SizeProps>`
  display: flex;
  align-items: center;
  gap: ${({ $size }) => gapMap[$size]};
`;

export const StarButton = styled.button<{ 
  $interactive: boolean; 
  $state: "filled" | "partial" | "empty"; 
  $size: "sm" | "md" | "lg" 
}>`
  position: relative;
  background: none;
  border: none;
  padding: 0;
  border-radius: ${({ theme }) => theme.spacing[4]}; /* border-radius do Tailwind */
  transition: transform 0.2s ease-in-out;

  ${({ $interactive, theme }) => 
    $interactive 
      ? css`
          cursor: pointer;

          &:hover {
            transform: scale(1.1);
          }

          &:focus-visible {
            outline: none;
            box-shadow: 0 0 0 2px ${theme.colors.background}, 0 0 0 4px ${theme.colors.primary};
          }
        ` 
      : css`
          cursor: default;
        `}

  svg {
    width: ${({ $size }) => sizeMap[$size]};
    height: ${({ $size }) => sizeMap[$size]};
    transition: all 0.2s ease-in-out;
    
    color: ${({ $state, theme }) => 
      $state === "empty" ? theme.colors.mutedForeground : theme.colors.accent};
      
    fill: ${({ $state, theme }) => 
      $state === "filled" ? theme.colors.accent 
      : $state === "partial" ? `color-mix(in srgb, ${theme.colors.accent} 50%, transparent)` 
      : "transparent"};
  }
`;

export const ValueText = styled.span<SizeProps>`
  margin-left: ${({ theme }) => theme.spacing[8]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ $size }) => fontMap[$size]};
`;
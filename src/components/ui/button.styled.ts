import styled from "styled-components";
import type { DefaultTheme } from "styled-components";

interface ButtonProps {
  $variant?: "primary" | "ghost" | "outline" | "destructive";
  $size?: "default" | "sm" | "lg" | "icon";
}

interface ThemeProps {
  theme: DefaultTheme;
}

const sizeStyles = {
  default: `
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    height: 2.5rem;
  `,
  sm: `
    padding: 0.25rem 0.75rem;
    font-size: 0.8125rem;
    height: 2rem;
  `,
  lg: `
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    height: 2.75rem;
  `,
  icon: `
    padding: 0.5rem;
    height: 2.5rem;
    width: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};

const variantStyles = {
  primary: `
    background-color: ${(props: ThemeProps) => props.theme.colors.primary};
    color: white;
    border: 1px solid transparent;
    
    &:hover:not(:disabled) {
      background-color: ${(props: ThemeProps) => props.theme.colors.primary}DD;
      opacity: 0.9;
    }
  `,
  ghost: `
    background-color: transparent;
    color: ${(props: ThemeProps) => props.theme.colors.foreground};
    border: 1px solid transparent;
    
    &:hover:not(:disabled) {
      background-color: ${(props: ThemeProps) => props.theme.colors.secondary};
    }
  `,
  outline: `
    background-color: transparent;
    color: ${(props: ThemeProps) => props.theme.colors.foreground};
    border: 1px solid ${(props: ThemeProps) => props.theme.colors.border};
    
    &:hover:not(:disabled) {
      background-color: ${(props: ThemeProps) => props.theme.colors.secondary};
    }
  `,
  destructive: `
    background-color: ${(props: ThemeProps) => props.theme.colors.destructive};
    color: white;
    border: 1px solid transparent;
    
    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  `,
};

export const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  border-radius: ${(props) => props.theme.spacing[8]};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  white-space: nowrap;
  transition: all 0.2s ease;
  cursor: pointer;
  outline: none;
  border: none;
  
  ${(props) => sizeStyles[props.$size || "default"]}
  ${(props) => variantStyles[props.$variant || "primary"]}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

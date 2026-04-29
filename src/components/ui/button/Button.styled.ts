'use client';

import styled, { css } from 'styled-components';

export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg';

export interface ButtonRootProps {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
}

export const ButtonRoot = styled.button<ButtonRootProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[8]};
  white-space: nowrap;
  border-radius: 6px;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: all 0.2s ease-in-out;
  flex-shrink: 0;
  outline: none;
  cursor: pointer;
  border: 1px solid transparent;

  
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  
  & svg {
    pointer-events: none;
    flex-shrink: 0;
    width: ${({ theme }) => theme.spacing[16]};
    height: ${({ theme }) => theme.spacing[16]};
  }

  
  &:focus-visible {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.ring}80;
  }

  &[aria-invalid='true'] {
    border-color: ${({ theme }) => theme.colors.destructive};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.destructive}33;
  }

  
  ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return css`
          height: 2rem; 
          padding: 0 ${({ theme }) => theme.spacing[12]};
          gap: ${({ theme }) => theme.spacing[6]};
          &:has(> svg) {
            padding: 0 0.625rem; 
          }
        `;
      case 'lg':
        return css`
          height: 2.5rem; 
          padding: 0 ${({ theme }) => theme.spacing[24]};
          &:has(> svg) {
            padding: 0 ${({ theme }) => theme.spacing[16]};
          }
        `;
      case 'icon':
        return css`
          width: 2.25rem;
          height: 2.25rem;
          padding: 0;
        `;
      case 'icon-sm':
        return css`
          width: 2rem;
          height: 2rem;
          padding: 0;
        `;
      case 'icon-lg':
        return css`
          width: 2.5rem;
          height: 2.5rem;
          padding: 0;
        `;
      case 'default':
      default:
        return css`
          height: 2.25rem; 
          padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[16]};
          &:has(> svg) {
            padding: 0 ${({ theme }) => theme.spacing[12]};
          }
        `;
    }
  }}

  
  ${({ theme, $variant }) => {
    switch ($variant) {
      case 'destructive':
        return css`
          background-color: ${theme.colors.destructive};
          color: ${theme.colors.destructiveForeground};
          &:hover {
            filter: brightness(0.9);
          }
        `;
      case 'outline':
        return css`
          background-color: ${theme.colors.background};
          color: ${theme.colors.foreground};
          border-color: ${theme.colors.border};
          box-shadow: ${theme.shadows.shadow1};
          &:hover {
            background-color: ${theme.colors.accent};
            color: ${theme.colors.accentForeground};
          }
        `;
      case 'secondary':
        return css`
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.secondaryForeground};
          &:hover {
            filter: brightness(0.9);
          }
        `;
      case 'ghost':
        return css`
          background-color: transparent;
          color: inherit;
          &:hover {
            background-color: ${theme.colors.accent};
            color: ${theme.colors.accentForeground};
          }
        `;
      case 'link':
        return css`
          background-color: transparent;
          color: ${theme.colors.primary};
          text-underline-offset: 4px;
          &:hover {
            text-decoration: underline;
          }
        `;
      case 'default':
      default:
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.primaryForeground};
          &:hover {
            filter: brightness(0.9);
          }
        `;
    }
  }}
`;
'use client';

import * as TogglePrimitive from '@radix-ui/react-toggle';
import styled, { css } from 'styled-components';

export interface StyledToggleProps {
  $variant?: 'default' | 'outline';
  $size?: 'default' | 'sm' | 'lg';
}

export const ToggleRoot = styled(TogglePrimitive.Root)<StyledToggleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[8]};
  border-radius: 6px;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid transparent;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.foreground};
  transition: color 0.2s, background-color 0.2s, box-shadow 0.2s;
  outline: none;

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  
  &:hover {
    background-color: ${({ theme }) => theme.colors.muted};
    color: ${({ theme }) => theme.colors.mutedForeground};
  }

  
  &[data-state='on'] {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentForeground};
  }

  
  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.ring};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.ring}80;
  }

  &[aria-invalid='true'] {
    border-color: ${({ theme }) => theme.colors.destructive};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.destructive}33;
  }

  
  & svg {
    flex-shrink: 0;
    pointer-events: none;
    width: 1rem; 
    height: 1rem;
  }

  
  ${({ $variant, theme }) =>
    $variant === 'outline' &&
    css`
      border-color: ${theme.colors.input};
      box-shadow: ${theme.shadows.shadow1};
      &:hover {
        background-color: ${theme.colors.accent};
        color: ${theme.colors.accentForeground};
      }
    `}

  
  ${({ $size, theme }) => {
    switch ($size) {
      case 'sm':
        return css`
          height: 2rem; 
          padding: 0 ${theme.spacing[6]}; 
          min-width: 2rem;
        `;
      case 'lg':
        return css`
          height: 2.5rem; 
          padding: 0 ${theme.spacing[10]}; 
          min-width: 2.5rem;
        `;
      default:
        return css`
          height: 2.25rem; 
          padding: 0 ${theme.spacing[8]}; 
          min-width: 2.25rem;
        `;
    }
  }}
`;
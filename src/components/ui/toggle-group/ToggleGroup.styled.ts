'use client';

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import styled, { css } from 'styled-components';

export const ToggleGroupRoot = styled(ToggleGroupPrimitive.Root)`
  display: flex;
  width: fit-content;
  align-items: center;
  border-radius: 6px; 

  &[data-variant='outline'] {
    box-shadow: ${({ theme }) => theme.shadows.shadow1};
  }
`;

export interface StyledItemProps {
  $variant?: 'default' | 'outline';
  $size?: 'default' | 'sm' | 'lg';
}

export const ToggleGroupItemRoot = styled(ToggleGroupPrimitive.Item)<StyledItemProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  flex: 1;
  flex-shrink: 0;
  border-radius: 0;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  outline: none;

  
  ${({ $variant, theme }) =>
    $variant === 'outline'
      ? css`
          border: 1px solid ${theme.colors.border};
          border-left-width: 0;
          &:first-child {
            border-left-width: 1px;
          }
        `
      : css`
          &:hover {
            background-color: ${theme.colors.muted};
            color: ${theme.colors.mutedForeground};
          }
        `}

  
  ${({ $size, theme }) => {
    switch ($size) {
      case 'sm':
        return css`
          height: 2rem; 
          padding: 0 ${theme.spacing[12]}; 
        `;
      case 'lg':
        return css`
          height: 2.75rem; 
          padding: 0 ${theme.spacing[20]}; 
        `;
      default:
        return css`
          height: 2.25rem; 
          padding: 0 ${theme.spacing[12]};
        `;
    }
  }}

  
  &[data-state='on'] {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentForeground};
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &:focus-visible {
    z-index: 10;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.background},
                0 0 0 4px ${({ theme }) => theme.colors.ring};
  }

  
  &:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  &:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;
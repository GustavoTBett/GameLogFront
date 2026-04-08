'use client';

import styled, { css } from 'styled-components';

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

export interface BadgeRootProps {
  $variant?: BadgeVariant;
}

export const BadgeRoot = styled.span<BadgeRootProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid transparent;
  
  
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[8]}`};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  
  width: fit-content;
  white-space: nowrap;
  flex-shrink: 0;
  gap: ${({ theme }) => theme.spacing[4]};
  overflow: hidden;
  transition: color 0.2s, box-shadow 0.2s, background-color 0.2s;

  
  & > svg {
    width: ${({ theme }) => theme.spacing[12]};
    height: ${({ theme }) => theme.spacing[12]};
    pointer-events: none;
  }

  
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.ring}80; 
  }

  &[aria-invalid="true"] {
    border-color: ${({ theme }) => theme.colors.destructive};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.destructive}33; 
  }

  
  ${({ theme, $variant }) => {
    switch ($variant) {
      case 'secondary':
        return css`
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.secondaryForeground};
          &:is(a):hover {
            opacity: 0.9;
          }
        `;
      case 'destructive':
        return css`
          background-color: ${theme.colors.destructive};
          color: ${theme.colors.destructiveForeground};
          &:is(a):hover {
            opacity: 0.9;
          }
        `;
      case 'outline':
        return css`
          border-color: ${theme.colors.border};
          color: ${theme.colors.foreground};
          &:is(a):hover {
            background-color: ${theme.colors.accent};
            color: ${theme.colors.accentForeground};
          }
        `;
      case 'default':
      default:
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.primaryForeground};
          &:is(a):hover {
            opacity: 0.9;
          }
        `;
    }
  }}
`;
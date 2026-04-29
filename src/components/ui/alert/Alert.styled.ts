'use client';

import styled, { css } from 'styled-components';

export type AlertVariant = 'default' | 'destructive';

export interface AlertRootProps {
  $variant?: AlertVariant;
}

export const AlertRoot = styled.div<AlertRootProps>`
  position: relative;
  width: 100%;
  border-radius: 8px;
  padding: ${({ theme }) => `${theme.spacing[12]} ${theme.spacing[16]}`};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  
  
  display: grid;
  grid-template-columns: 0 1fr;
  row-gap: ${({ theme }) => theme.spacing[2]};
  align-items: flex-start;

  
  &:has(> svg) {
    grid-template-columns: ${({ theme }) => theme.spacing[16]} 1fr;
    column-gap: ${({ theme }) => theme.spacing[12]};
  }

  
  & > svg {
    width: ${({ theme }) => theme.spacing[16]};
    height: ${({ theme }) => theme.spacing[16]};
    transform: translateY(2px);
    color: currentColor;
  }

  
  background-color: ${({ theme }) => theme.colors.card};
  
  ${({ theme, $variant }) =>
    $variant === 'destructive'
      ? css`
          border: 1px solid ${theme.colors.destructive};
          color: ${theme.colors.destructive};

          
          & [data-slot='alert-description'] {
            color: ${theme.colors.destructive};
            opacity: 0.9;
          }
        `
      : css`
          border: 1px solid ${theme.colors.border};
          color: ${theme.colors.cardForeground};
        `}
`;

export const AlertTitle = styled.div`
  grid-column-start: 2;
  min-height: 1rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: -0.015em; 
  
  
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const AlertDescription = styled.div`
  grid-column-start: 2;
  display: grid;
  justify-items: flex-start;
  gap: ${({ theme }) => theme.spacing[4]}; 
  font-size: ${({ theme }) => theme.fontSizes[14]};
  color: ${({ theme }) => theme.colors.mutedForeground};

  & p {
    line-height: ${({ theme }) => theme.lineHeights.normal}; 
  }
`;
'use client';

import styled, { css } from 'styled-components';

export const EmptyRoot = styled.div`
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[24]}; 
  border-radius: 8px; 
  
  border: 1px dashed ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing[24]}; 
  text-align: center;
  text-wrap: balance;

  ${({ theme }) => theme.media.tablet} {
    padding: ${({ theme }) => theme.spacing[48]}; 
  }
`;

export const EmptyHeaderRoot = styled.div`
  display: flex;
  max-width: 24rem; 
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]}; 
  text-align: center;
`;

export type EmptyMediaVariant = 'default' | 'icon';

export interface EmptyMediaRootProps {
  $variant?: EmptyMediaVariant;
}

export const EmptyMediaRoot = styled.div<EmptyMediaRootProps>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing[8]}; 

  
  & svg {
    pointer-events: none;
    flex-shrink: 0;
  }

  
  ${({ theme, $variant }) => {
    if ($variant === 'icon') {
      return css`
        background-color: ${theme.colors.muted};
        color: ${theme.colors.foreground};
        width: 2.5rem; 
        height: 2.5rem;
        border-radius: 8px; 

        
        & svg:not([class*='size-']) {
          width: 1.5rem; 
          height: 1.5rem;
        }
      `;
    }

    return css`
      background-color: transparent;
    `;
  }}
`;

export const EmptyTitleRoot = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[18]}; 
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: -0.015em; 
`;

export const EmptyDescriptionRoot = styled.p`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[14]}; 
  line-height: 1.625; 

  
  & > a {
    text-decoration: underline;
    text-underline-offset: 4px;
    transition: color 0.2s;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const EmptyContentRoot = styled.div`
  display: flex;
  width: 100%;
  max-width: 24rem; 
  min-width: 0;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[16]}; 
  font-size: ${({ theme }) => theme.fontSizes[14]};
  text-wrap: balance;
`;
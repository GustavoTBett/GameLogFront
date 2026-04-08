'use client';

import styled, { css } from 'styled-components';
import { Separator } from '@/components/ui/separator/Separator';

export const ItemGroupRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ItemSeparatorRoot = styled(Separator)`
  margin: 0;
`;

export type ItemVariant = 'default' | 'outline' | 'muted';
export type ItemSize = 'default' | 'sm';

export const ItemRoot = styled.div<{ $variant?: ItemVariant; $size?: ItemSize }>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 6px;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  border: 1px solid transparent;
  transition: background-color 0.1s, border-color 0.1s, color 0.1s;
  outline: none;

  
  &:is(a):hover {
    background-color: ${({ theme }) => theme.colors.accent}80; 
  }

  
  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.ring};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.ring}80;
  }

  
  ${({ theme, $variant }) => {
    switch ($variant) {
      case 'outline':
        return css`
          border-color: ${theme.colors.border};
        `;
      case 'muted':
        return css`
          background-color: ${theme.colors.muted}80; 
        `;
      case 'default':
      default:
        return css`
          background-color: transparent;
        `;
    }
  }}

  
  ${({ theme, $size }) => {
    switch ($size) {
      case 'sm':
        return css`
          padding: ${theme.spacing[12]} ${theme.spacing[16]}; 
          gap: 0.625rem; 
        `;
      case 'default':
      default:
        return css`
          padding: ${theme.spacing[16]}; 
          gap: ${theme.spacing[16]}; 
        `;
    }
  }}
`;

export type ItemMediaVariant = 'default' | 'icon' | 'image';

export const ItemMediaRoot = styled.div<{ $variant?: ItemMediaVariant }>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[8]};

  
  [data-slot='item']:has([data-slot='item-description']) > & {
    align-self: flex-start;
    transform: translateY(0.125rem); 
  }

  & svg {
    pointer-events: none;
  }

  
  ${({ theme, $variant }) => {
    switch ($variant) {
      case 'icon':
        return css`
          width: 2rem; 
          height: 2rem;
          border-radius: 2px; 
          border: 1px solid ${theme.colors.border};
          background-color: ${theme.colors.muted};

          & svg:not([class*='size-']) {
            width: 1rem; 
            height: 1rem;
          }
        `;
      case 'image':
        return css`
          width: 2.5rem; 
          height: 2.5rem;
          border-radius: 2px;
          overflow: hidden;

          & img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `;
      case 'default':
      default:
        return css`
          background-color: transparent;
        `;
    }
  }}
`;

export const ItemContentRoot = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]}; 

  
  & + &[data-slot='item-content'] {
    flex: none;
  }
`;

export const ItemTitleRoot = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  line-height: 1.375; 
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const ItemDescriptionRoot = styled.p`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  line-height: 1.5; 
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  text-wrap: balance;
  margin: 0;

  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  
  & > a {
    text-decoration: underline;
    text-underline-offset: 4px;
    transition: color 0.2s;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const ItemActionsRoot = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
`;

export const ItemHeaderRoot = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[8]};
`;

export const ItemFooterRoot = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[8]};
`;
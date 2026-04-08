'use client';

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import styled, { css } from 'styled-components';

export const ScrollAreaRoot = styled(ScrollAreaPrimitive.Root)`
  position: relative;
  overflow: hidden;
`;

export const ScrollAreaViewport = styled(ScrollAreaPrimitive.Viewport)`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  outline: none;
  transition: box-shadow 0.2s;

  &:focus-visible {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.ring}80; 
  }
`;

export const ScrollBarRoot = styled(ScrollAreaPrimitive.ScrollAreaScrollbar)<{
  $orientation: 'vertical' | 'horizontal';
}>`
  display: flex;
  user-select: none;
  touch-action: none;
  padding: 1px;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent}1A; 
  }

  ${({ $orientation }) =>
    $orientation === 'vertical'
      ? css`
          width: 0.625rem; 
          height: 100%;
          border-left: 1px solid transparent;
        `
      : css`
          height: 0.625rem; 
          flex-direction: column;
          border-top: 1px solid transparent;
        `}
`;

export const ScrollAreaThumb = styled(ScrollAreaPrimitive.ScrollAreaThumb)`
  position: relative;
  flex: 1;
  border-radius: 9999px; 
  background-color: ${({ theme }) => theme.colors.border};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.mutedForeground};
  }

  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    min-width: 44px;
    min-height: 44px;
  }
`;

export const ScrollAreaCorner = styled(ScrollAreaPrimitive.Corner)``;
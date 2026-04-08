'use client';

import * as SheetPrimitive from '@radix-ui/react-dialog';
import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const fadeOut = keyframes`from { opacity: 1; } to { opacity: 0; }`;

const slideIn = {
  top: keyframes`from { transform: translateY(-100%); } to { transform: translateY(0); }`,
  bottom: keyframes`from { transform: translateY(100%); } to { transform: translateY(0); }`,
  left: keyframes`from { transform: translateX(-100%); } to { transform: translateX(0); }`,
  right: keyframes`from { transform: translateX(100%); } to { transform: translateX(0); }`,
};

const slideOut = {
  top: keyframes`from { transform: translateY(0); } to { transform: translateY(-100%); }`,
  bottom: keyframes`from { transform: translateY(0); } to { transform: translateY(100%); }`,
  left: keyframes`from { transform: translateX(0); } to { transform: translateX(-100%); }`,
  right: keyframes`from { transform: translateX(0); } to { transform: translateX(100%); }`,
};

export const SheetOverlayRoot = styled(SheetPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.5);

  &[data-state='open'] { animation: ${fadeIn} 0.2s ease-out; }
  &[data-state='closed'] { animation: ${fadeOut} 0.2s ease-in; }
`;

export type SheetSide = 'top' | 'right' | 'bottom' | 'left';

export const SheetContentRoot = styled(SheetPrimitive.Content)<{ $side: SheetSide }>`
  position: fixed;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[16]};
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.shadow3};
  transition: transform 0.3s ease-in-out;
  outline: none;

  
  ${({ $side, theme }) => {
    switch ($side) {
      case 'top':
        return css`
          inset: 0 0 auto 0;
          border-bottom: 1px solid ${theme.colors.border};
          &[data-state='open'] { animation: ${slideIn.top} 0.4s ease-out; }
          &[data-state='closed'] { animation: ${slideOut.top} 0.3s ease-in; }
        `;
      case 'bottom':
        return css`
          inset: auto 0 0 0;
          border-top: 1px solid ${theme.colors.border};
          &[data-state='open'] { animation: ${slideIn.bottom} 0.4s ease-out; }
          &[data-state='closed'] { animation: ${slideOut.bottom} 0.3s ease-in; }
        `;
      case 'left':
        return css`
          inset: 0 auto 0 0;
          height: 100%;
          width: 75%;
          border-right: 1px solid ${theme.colors.border};
          ${theme.media.tablet} { max-width: 24rem; }
          &[data-state='open'] { animation: ${slideIn.left} 0.4s ease-out; }
          &[data-state='closed'] { animation: ${slideOut.left} 0.3s ease-in; }
        `;
      case 'right':
      default:
        return css`
          inset: 0 0 0 auto;
          height: 100%;
          width: 75%;
          border-left: 1px solid ${theme.colors.border};
          ${theme.media.tablet} { max-width: 24rem; }
          &[data-state='open'] { animation: ${slideIn.right} 0.4s ease-out; }
          &[data-state='closed'] { animation: ${slideOut.right} 0.3s ease-in; }
        `;
    }
  }}
`;

export const SheetCloseButton = styled(SheetPrimitive.Close)`
  position: absolute;
  top: ${({ theme }) => theme.spacing[16]};
  right: ${({ theme }) => theme.spacing[16]};
  border-radius: 2px;
  opacity: 0.7;
  transition: opacity 0.2s;
  background: transparent;
  border: none;
  cursor: pointer;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover { opacity: 1; }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.background}, 
                0 0 0 4px ${({ theme }) => theme.colors.ring};
  }
  &[data-state='open'] { background-color: ${({ theme }) => theme.colors.secondary}; }
  & svg { width: 1rem; height: 1rem; }
`;

export const SheetHeaderRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => theme.spacing[16]};
`;

export const SheetFooterRoot = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
  padding: ${({ theme }) => theme.spacing[16]};
`;

export const SheetTitleRoot = styled(SheetPrimitive.Title)`
  color: ${({ theme }) => theme.colors.foreground};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin: 0;
`;

export const SheetDescriptionRoot = styled(SheetPrimitive.Description)`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  margin: 0;
`;
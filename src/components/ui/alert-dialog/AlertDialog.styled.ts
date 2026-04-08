'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const contentShow = keyframes`
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.95); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

export const Overlay = styled(AlertDialogPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px); 

  &[data-state='open'] {
    animation: ${fadeIn} 200ms ease-out;
  }
  &[data-state='closed'] {
    animation: ${fadeOut} 200ms ease-in;
  }
`;

export const Content = styled(AlertDialogPrimitive.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 50;
  transform: translate(-50%, -50%);
  
  width: calc(100% - 2rem);
  max-width: 512px;
  padding: ${({ theme }) => theme.spacing[24]};
  
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.shadow3};
  
  display: grid;
  gap: ${({ theme }) => theme.spacing[24]};
  outline: none;

  &[data-state='open'] {
    animation: ${contentShow} 200ms cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
  text-align: center;

  ${({ theme }) => theme.media.tablet} {
    text-align: left;
  }
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: ${({ theme }) => theme.spacing[8]};

  ${({ theme }) => theme.media.tablet} {
    flex-direction: row;
    justify-content: flex-end;
  }
`;

export const Title = styled(AlertDialogPrimitive.Title)`
  font-size: ${({ theme }) => theme.fontSizes[18]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.foreground};
  margin: 0;
`;

export const Description = styled(AlertDialogPrimitive.Description)`
  font-size: ${({ theme }) => theme.fontSizes[14]};
  color: ${({ theme }) => theme.colors.mutedForeground};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  margin: 0;
`;



const BaseButtonStyles = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  padding: 0 1rem;
  height: 40px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  outline: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Action = styled(AlertDialogPrimitive.Action)`
  ${BaseButtonStyles}
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};

  &:hover {
    filter: brightness(0.9);
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.background}, 0 0 0 4px ${({ theme }) => theme.colors.ring};
  }
`;

export const Cancel = styled(AlertDialogPrimitive.Cancel)`
  ${BaseButtonStyles}
  background-color: transparent;
  border-color: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.foreground};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.secondaryForeground};
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.background}, 0 0 0 4px ${({ theme }) => theme.colors.ring};
  }
`;
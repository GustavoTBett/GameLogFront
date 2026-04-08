'use client';
import * as ToastPrimitives from '@radix-ui/react-toast';
import styled, { keyframes, css } from 'styled-components';

const slideIn = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const hide = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

export const ToastViewportRoot = styled(ToastPrimitives.Viewport)`
  position: fixed;
  top: 0;
  z-index: 100;
  display: flex;
  max-height: 100vh;
  width: 100%;
  flex-direction: column-reverse;
  padding: ${({ theme }) => theme.spacing[16]};

  ${({ theme }) => theme.media.tablet} {
    bottom: 0;
    right: 0;
    top: auto;
    flex-direction: column;
    max-width: 420px;
  }
`;

export const ToastRootStyled = styled(ToastPrimitives.Root)<{ $variant?: 'default' | 'destructive' }>`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.shadows.shadow3};
  padding: ${({ theme }) => theme.spacing[24]};
  padding-right: ${({ theme }) => theme.spacing[32]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[16]};
  overflow: hidden;
  position: relative;
  pointer-events: auto;
  transition: all 0.2s;

  &[data-state='open'] {
    animation: ${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  &[data-state='closed'] {
    animation: ${hide} 100ms ease-in;
  }

  ${({ $variant, theme }) =>
    $variant === 'destructive' &&
    css`
      border-color: ${theme.colors.destructive};
      background-color: ${theme.colors.destructive};
      color: ${theme.colors.destructiveForeground};
    `}
`;

export const ToastActionStyled = styled(ToastPrimitives.Action)`
  display: inline-flex;
  height: 2rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: transparent;
  padding: 0 ${({ theme }) => theme.spacing[12]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: colors 0.2s;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const ToastCloseStyled = styled(ToastPrimitives.Close)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  border-radius: 6px;
  padding: 4px;
  color: ${({ theme }) => theme.colors.foreground}80;
  opacity: 0;
  transition: opacity 0.2s;
  background: transparent;
  border: none;
  cursor: pointer;

  ${ToastRootStyled}:hover & {
    opacity: 1;
  }
`;

export const ToastTitleStyled = styled(ToastPrimitives.Title)`
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const ToastDescriptionStyled = styled(ToastPrimitives.Description)`
  font-size: ${({ theme }) => theme.fontSizes[14]};
  opacity: 0.9;
`;
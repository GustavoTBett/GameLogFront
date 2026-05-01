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
  bottom: 16px;
  left: 16px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[12]};
  max-height: calc(100vh - 32px);
  width: auto;
  padding: 0;

  ${({ theme }) => theme.media.tablet} {
    left: 16px;
    bottom: 16px;
    max-width: 420px;
  }
`;

export const ToastRootStyled = styled(ToastPrimitives.Root)<{ $variant?: 'default' | 'destructive' }>`
  background-color: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(2,6,23,0.15);
  padding: ${({ theme }) => `${theme.spacing[16]} ${theme.spacing[20]}`};
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[12]};
  overflow: hidden;
  position: relative;
  pointer-events: auto;
  transition: transform 160ms ease, box-shadow 160ms ease, opacity 120ms ease;

  &[data-state='open'] {
    animation: ${slideIn} 180ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  &[data-state='closed'] {
    animation: ${hide} 100ms ease-in;
  }

  ${({ $variant, theme }) =>
    $variant === 'destructive' &&
    css`
      border-color: ${theme.colors.destructive};
      background: linear-gradient(90deg, ${theme.colors.destructive}10, ${theme.colors.card});
      box-shadow: 0 12px 28px rgba(239,68,68,0.12);
      color: ${theme.colors.destructiveForeground};

      & ${ToastTitleStyled} {
        color: ${theme.colors.destructiveForeground};
      }

      /* subtle left accent */
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 6px;
        background: ${theme.colors.destructive};
      }
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
  color: ${({ theme }) => theme.colors.foreground}CC;
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
  font-size: ${({ theme }) => theme.fontSizes[16]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

export const ToastDescriptionStyled = styled(ToastPrimitives.Description)`
  font-size: ${({ theme }) => theme.fontSizes[14]};
  opacity: 0.95;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.foreground};
`;
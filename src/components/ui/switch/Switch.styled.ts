'use client';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import styled from 'styled-components';

export const SwitchRoot = styled(SwitchPrimitive.Root)`
  display: inline-flex;
  height: 1.15rem;
  width: 2rem;
  shrink: 0;
  cursor: pointer;
  align-items: center;
  border-radius: 9999px;
  border: 1px solid transparent;
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
  transition: all 0.2s;
  outline: none;

  background-color: ${({ theme }) => theme.colors.input};
  &[data-state='checked'] {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.ring};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.ring}80;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const SwitchThumb = styled(SwitchPrimitive.Thumb)`
  pointer-events: none;
  display: block;
  width: 1rem;
  height: 1rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.background};
  transition: transform 0.2s, background-color 0.2s;

  &[data-state='checked'] {
    transform: translateX(calc(100% - 2px));
    background-color: ${({ theme }) => theme.colors.primaryForeground || theme.colors.background};
  }

  &[data-state='unchecked'] {
    transform: translateX(0);
    ${({ theme }) => theme.title === 'dark' && `
      background-color: ${theme.colors.foreground};
    `}
  }
`;
'use client';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import styled from 'styled-components';

export const TabsRoot = styled(TabsPrimitive.Root)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
`;

export const TabsListRoot = styled(TabsPrimitive.List)`
  display: inline-flex;
  height: 2.25rem;
  width: fit-content;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.muted};
  color: ${({ theme }) => theme.colors.mutedForeground};
  padding: 3px;
`;

export const TabsTriggerRoot = styled(TabsPrimitive.Trigger)`
  display: inline-flex;
  flex: 1;
  height: calc(100% - 1px);
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[6]};
  border-radius: 6px;
  border: 1px solid transparent;
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[8]}`};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  white-space: nowrap;
  transition: all 0.2s;
  background: transparent;
  color: ${({ theme }) => theme.colors.mutedForeground};
  cursor: pointer;
  outline: none;

  &[data-state='active'] {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
    box-shadow: ${({ theme }) => theme.shadows.shadow1};

    ${({ theme }) => theme.title === 'dark' && `
      background-color: ${theme.colors.input}4D;
      border-color: ${theme.colors.input};
      color: ${theme.colors.foreground};
    `}
  }

  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.ring};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.ring}80;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  & svg {
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
  }
`;

export const TabsContentRoot = styled(TabsPrimitive.Content)`
  flex: 1;
  outline: none;
`;
'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import styled, { css, keyframes } from 'styled-components';

const contentShow = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const contentHide = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
`;

export const SelectTriggerRoot = styled(SelectPrimitive.Trigger)<{ $size?: 'sm' | 'default' }>`
  display: flex;
  width: fit-content;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[8]};
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.input};
  background-color: transparent;
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[12]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  white-space: nowrap;
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
  transition: color 0.2s, box-shadow 0.2s, border-color 0.2s;
  outline: none;

  
  height: ${({ $size }) => ($size === 'sm' ? '2rem' : '2.25rem')};

  &[data-placeholder] {
    color: ${({ theme }) => theme.colors.mutedForeground};
  }

  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.ring};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.ring}80;
  }

  &[aria-invalid='true'] {
    border-color: ${({ theme }) => theme.colors.destructive};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.destructive}33;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  
  & [data-slot='select-value'] {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[8]};
    
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  & svg {
    flex-shrink: 0;
    pointer-events: none;
    width: ${({ theme }) => theme.spacing[16]};
    height: ${({ theme }) => theme.spacing[16]};
  }
`;

export const SelectContentRoot = styled(SelectPrimitive.Content)`
  position: relative;
  z-index: 50;
  min-width: 8rem;
  max-height: var(--radix-select-content-available-height);
  overflow: hidden;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.popover};
  color: ${({ theme }) => theme.colors.popoverForeground};
  box-shadow: ${({ theme }) => theme.shadows.shadow2};
  transform-origin: var(--radix-select-content-transform-origin);

  &[data-state='open'] {
    animation: ${contentShow} 0.15s ease-out;
  }
  &[data-state='closed'] {
    animation: ${contentHide} 0.1s ease-in;
  }

  
  &[data-side='bottom'] { translate: 0 4px; }
  &[data-side='top'] { translate: 0 -4px; }
  &[data-side='left'] { translate: -4px 0; }
  &[data-side='right'] { translate: 4px 0; }
`;

export const SelectViewport = styled(SelectPrimitive.Viewport)<{ $isPopper?: boolean }>`
  padding: ${({ theme }) => theme.spacing[4]};

  ${({ $isPopper }) =>
    $isPopper &&
    css`
      height: var(--radix-select-trigger-height);
      width: 100%;
      min-width: var(--radix-select-trigger-width);
      scroll-margin: ${({ theme }) => theme.spacing[4]} 0;
    `}
`;

export const SelectItemRoot = styled(SelectPrimitive.Item)`
  position: relative;
  display: flex;
  width: 100%;
  cursor: default;
  user-select: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  border-radius: 2px;
  padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[32]} ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[8]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  outline: none;

  &:focus {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentForeground};
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  & [span]:last-child {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[8]};
  }
`;

export const ItemIndicatorWrapper = styled.span`
  position: absolute;
  right: ${({ theme }) => theme.spacing[8]};
  display: flex;
  height: ${({ theme }) => theme.spacing[12]};
  width: ${({ theme }) => theme.spacing[12]};
  align-items: center;
  justify-content: center;
`;

export const SelectLabelRoot = styled(SelectPrimitive.Label)`
  padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[8]};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

export const SelectSeparatorRoot = styled(SelectPrimitive.Separator)`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing[4]} -${({ theme }) => theme.spacing[4]};
  pointer-events: none;
`;

const ScrollButtonStyles = css`
  display: flex;
  cursor: default;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[4]} 0;

  & svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const SelectScrollUpButtonRoot = styled(SelectPrimitive.ScrollUpButton)`
  ${ScrollButtonStyles}
`;

export const SelectScrollDownButtonRoot = styled(SelectPrimitive.ScrollDownButton)`
  ${ScrollButtonStyles}
`;
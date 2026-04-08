'use client';

import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import styled, { css, keyframes } from 'styled-components';

const zoomIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const zoomOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
`;

const ContentBaseStyles = css`
  z-index: 50;
  min-width: 8rem;
  overflow: hidden;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.popover};
  color: ${({ theme }) => theme.colors.popoverForeground};
  padding: ${({ theme }) => theme.spacing[4]};
  box-shadow: ${({ theme }) => theme.shadows.shadow2};
  transform-origin: var(--radix-context-menu-content-transform-origin);

  &[data-state='open'] {
    animation: ${zoomIn} 0.15s ease-out;
  }
  &[data-state='closed'] {
    animation: ${zoomOut} 0.1s ease-in;
  }
`;


const ItemBaseStyles = css`
  position: relative;
  display: flex;
  cursor: default;
  user-select: none;
  align-items: center;
  border-radius: 2px;
  padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[8]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  outline: none;
  gap: ${({ theme }) => theme.spacing[8]};

  
  & > svg {
    flex-shrink: 0;
    pointer-events: none;
    width: ${({ theme }) => theme.spacing[16]};
    height: ${({ theme }) => theme.spacing[16]};
  }

  
  & > svg:not([class*='text-']) {
    color: ${({ theme }) => theme.colors.mutedForeground};
  }

  
  &[data-highlighted] {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentForeground};
  }

  
  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  
  &[data-inset='true'] {
    padding-left: ${({ theme }) => theme.spacing[32]};
  }
`;

export const ContextMenuRoot = styled(ContextMenuPrimitive.Root)``;
export const ContextMenuTrigger = styled(ContextMenuPrimitive.Trigger)``;
export const ContextMenuGroup = styled(ContextMenuPrimitive.Group)``;
export const ContextMenuPortal = styled(ContextMenuPrimitive.Portal)``;
export const ContextMenuSub = styled(ContextMenuPrimitive.Sub)``;
export const ContextMenuRadioGroup = styled(ContextMenuPrimitive.RadioGroup)``;

export const ContextMenuSubTrigger = styled(ContextMenuPrimitive.SubTrigger)`
  ${ItemBaseStyles}

  &[data-state='open'] {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentForeground};
  }

  & > svg:last-child {
    margin-left: auto;
  }
`;

export const ContextMenuSubContent = styled(ContextMenuPrimitive.SubContent)`
  ${ContentBaseStyles}
`;

export const ContextMenuContent = styled(ContextMenuPrimitive.Content)`
  ${ContentBaseStyles}
  overflow-x: hidden;
  overflow-y: auto;
  max-height: var(--radix-context-menu-content-available-height);
`;

export const ContextMenuItem = styled(ContextMenuPrimitive.Item)`
  ${ItemBaseStyles}

  
  &[data-variant='destructive'] {
    color: ${({ theme }) => theme.colors.destructive};
    
    &[data-highlighted] {
      background-color: ${({ theme }) => theme.colors.destructive}1A; 
      color: ${({ theme }) => theme.colors.destructive};
      
      & > svg {
        color: ${({ theme }) => theme.colors.destructive} !important;
      }
    }
  }
`;

export const ContextMenuCheckboxItem = styled(ContextMenuPrimitive.CheckboxItem)`
  ${ItemBaseStyles}
  padding-left: ${({ theme }) => theme.spacing[32]};
  padding-right: ${({ theme }) => theme.spacing[8]};
`;

export const ContextMenuRadioItem = styled(ContextMenuPrimitive.RadioItem)`
  ${ItemBaseStyles}
  padding-left: ${({ theme }) => theme.spacing[32]};
  padding-right: ${({ theme }) => theme.spacing[8]};
`;

export const ItemIndicatorWrapper = styled.span`
  position: absolute;
  left: ${({ theme }) => theme.spacing[8]};
  display: flex;
  height: ${({ theme }) => theme.spacing[12]};
  width: ${({ theme }) => theme.spacing[12]};
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

export const ContextMenuLabel = styled(ContextMenuPrimitive.Label)`
  padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[8]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.foreground};

  &[data-inset='true'] {
    padding-left: ${({ theme }) => theme.spacing[32]};
  }
`;

export const ContextMenuSeparator = styled(ContextMenuPrimitive.Separator)`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing[4]} -${({ theme }) => theme.spacing[4]};
`;

export const ContextMenuShortcut = styled.span`
  margin-left: auto;
  font-size: ${({ theme }) => theme.fontSizes[12]};
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.mutedForeground};
`;
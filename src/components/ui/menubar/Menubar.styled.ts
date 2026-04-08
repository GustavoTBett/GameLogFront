'use client';

import * as MenubarPrimitive from '@radix-ui/react-menubar';
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
  min-width: 12rem; 
  overflow: hidden;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.popover};
  color: ${({ theme }) => theme.colors.popoverForeground};
  padding: ${({ theme }) => theme.spacing[4]}; 
  box-shadow: ${({ theme }) => theme.shadows.shadow2}; 
  transform-origin: var(--radix-menubar-content-transform-origin);

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

  
  &:focus,
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

export const MenubarRoot = styled(MenubarPrimitive.Root)`
  display: flex;
  height: 2.25rem; 
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]}; 
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing[4]}; 
  box-shadow: ${({ theme }) => theme.shadows.shadow1}; 
`;

export const MenubarMenu = styled(MenubarPrimitive.Menu)``;
export const MenubarGroup = styled(MenubarPrimitive.Group)``;
export const MenubarPortal = styled(MenubarPrimitive.Portal)``;
export const MenubarRadioGroup = styled(MenubarPrimitive.RadioGroup)``;
export const MenubarSub = styled(MenubarPrimitive.Sub)``;

export const MenubarTrigger = styled(MenubarPrimitive.Trigger)`
  display: flex;
  align-items: center;
  border-radius: 2px;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[8]}; 
  font-size: ${({ theme }) => theme.fontSizes[14]}; 
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  outline: none;
  user-select: none;
  background-color: transparent;
  color: inherit;
  border: none;
  cursor: default;

  &:focus,
  &[data-state='open'] {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentForeground};
  }
`;

export const MenubarContent = styled(MenubarPrimitive.Content)`
  ${ContentBaseStyles}
`;

export const MenubarSubContent = styled(MenubarPrimitive.SubContent)`
  ${ContentBaseStyles}
  min-width: 8rem; 
  box-shadow: ${({ theme }) => theme.shadows.shadow3}; 
`;

export const MenubarItem = styled(MenubarPrimitive.Item)`
  ${ItemBaseStyles}

  
  &[data-variant='destructive'] {
    color: ${({ theme }) => theme.colors.destructive};
    
    &:focus,
    &[data-highlighted] {
      background-color: ${({ theme }) => theme.colors.destructive}1A; 
      color: ${({ theme }) => theme.colors.destructive};
      
      & > svg {
        color: ${({ theme }) => theme.colors.destructive} !important;
      }
    }
  }
`;

export const MenubarCheckboxItem = styled(MenubarPrimitive.CheckboxItem)`
  ${ItemBaseStyles}
  padding-left: ${({ theme }) => theme.spacing[32]}; 
  padding-right: ${({ theme }) => theme.spacing[8]}; 
`;

export const MenubarRadioItem = styled(MenubarPrimitive.RadioItem)`
  ${ItemBaseStyles}
  padding-left: ${({ theme }) => theme.spacing[32]};
  padding-right: ${({ theme }) => theme.spacing[8]};
`;

export const ItemIndicatorWrapper = styled.span`
  position: absolute;
  left: ${({ theme }) => theme.spacing[8]}; 
  display: flex;
  height: 0.875rem; 
  width: 0.875rem;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

export const MenubarLabel = styled(MenubarPrimitive.Label)`
  padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[8]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.foreground};

  &[data-inset='true'] {
    padding-left: ${({ theme }) => theme.spacing[32]};
  }
`;

export const MenubarSeparator = styled(MenubarPrimitive.Separator)`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing[4]} -${({ theme }) => theme.spacing[4]}; 
`;

export const MenubarShortcut = styled.span`
  margin-left: auto;
  font-size: ${({ theme }) => theme.fontSizes[12]};
  letter-spacing: 0.1em; 
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

export const MenubarSubTrigger = styled(MenubarPrimitive.SubTrigger)`
  ${ItemBaseStyles}

  &[data-state='open'] {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentForeground};
  }

  & > svg:last-child {
    margin-left: auto;
  }
`;
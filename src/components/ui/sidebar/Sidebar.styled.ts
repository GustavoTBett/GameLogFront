'use client';

import styled, { css } from 'styled-components';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { Separator } from '@/components/ui/separator/Separator';

export const VARS = {
  width: '16rem',
  widthMobile: '18rem',
  widthIcon: '3rem',
};

export const SidebarWrapper = styled.div`
  display: flex;
  min-height: 100svh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};

  &:has([data-variant='inset']) {
    background-color: ${({ theme }) => theme.colors.sidebar};
  }
`;

export const SidebarRoot = styled.div`
  display: none;
  color: ${({ theme }) => theme.colors.sidebarForeground};
  
  ${({ theme }) => theme.media.tablet} {
    display: block;
  }
`;

export const SidebarGap = styled.div`
  position: relative;
  width: ${VARS.width};
  background-color: transparent;
  transition: width 0.2s linear;

  [data-collapsible='offcanvas'] & { width: 0; }
  [data-side='right'] & { transform: rotate(180deg); }

  [data-collapsible='icon'] & {
    width: ${VARS.widthIcon};
    [data-variant='floating'] &, [data-variant='inset'] & {
       width: calc(${VARS.widthIcon} + ${({ theme }) => theme.spacing[16]}); 
    }
  }
`;

export const SidebarContainer = styled.div`
  position: fixed;
  inset-y: 0;
  z-index: 10;
  display: none;
  height: 100svh;
  width: ${VARS.width};
  transition: left 0.2s, right 0.2s, width 0.2s linear;

  ${({ theme }) => theme.media.tablet} {
    display: flex;
  }

  [data-side='left'] & {
    left: 0;
    [data-collapsible='offcanvas'] & { left: calc(${VARS.width} * -1); }
  }

  [data-side='right'] & {
    right: 0;
    [data-collapsible='offcanvas'] & { right: calc(${VARS.width} * -1); }
  }

  [data-variant='floating'] &, [data-variant='inset'] & {
    padding: ${({ theme }) => theme.spacing[8]};
    [data-collapsible='icon'] & { 
        width: calc(${VARS.widthIcon} + ${({ theme }) => theme.spacing[16]} + 2px); 
    }
  }

  [data-collapsible='icon'] & {
    width: ${VARS.widthIcon};
    [data-side='left'] & { border-right: 1px solid ${({ theme }) => theme.colors.sidebarBorder}; }
    [data-side='right'] & { border-left: 1px solid ${({ theme }) => theme.colors.sidebarBorder}; }
  }
`;

export const SidebarInner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.sidebar};

  [data-variant='floating'] & {
    border: 1px solid ${({ theme }) => theme.colors.sidebarBorder};
    border-radius: 8px; 
    box-shadow: ${({ theme }) => theme.shadows.shadow1};
  }
`;

export const SidebarHeaderRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
  padding: ${({ theme }) => theme.spacing[8]};
`;

export const SidebarFooterRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
  padding: ${({ theme }) => theme.spacing[8]};
`;

export const SidebarContentRoot = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
  overflow: auto;
  min-height: 0;

  [data-collapsible='icon'] & { overflow: hidden; }
`;

export const SidebarGroupRoot = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  padding: ${({ theme }) => theme.spacing[8]};
`;

export const SidebarGroupLabelRoot = styled.div`
  display: flex;
  height: 2rem; 
  flex-shrink: 0;
  align-items: center;
  border-radius: 6px;
  padding: 0 ${({ theme }) => theme.spacing[8]};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.sidebarForeground};
  opacity: 0.7;
  outline: none;
  transition: margin 0.2s linear, opacity 0.2s linear;

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.sidebarRing};
  }

  & > svg {
    width: ${({ theme }) => theme.spacing[16]};
    height: ${({ theme }) => theme.spacing[16]};
    flex-shrink: 0;
  }

  [data-collapsible='icon'] & {
    opacity: 0;
    margin-top: -2rem; 
  }
`;

export const SidebarGroupActionRoot = styled.button`
  position: absolute;
  top: 0.875rem; 
  right: 0.75rem; 
  display: flex;
  aspect-ratio: 1 / 1;
  width: 1.25rem; 
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.sidebarForeground};
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.sidebarAccent};
    color: ${({ theme }) => theme.colors.sidebarAccentForeground};
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.sidebarRing};
  }

  & > svg {
    width: ${({ theme }) => theme.spacing[16]};
    height: ${({ theme }) => theme.spacing[16]};
    flex-shrink: 0;
  }

  
  &::after {
    content: '';
    position: absolute;
    inset: -0.5rem; 
    ${({ theme }) => theme.media.tablet} { display: none; }
  }

  [data-collapsible='icon'] & { display: none; }
`;

export const SidebarGroupContentRoot = styled.div`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes[14]};
`;

export const SidebarTriggerRoot = styled(Button)`
  width: 1.75rem; 
  height: 1.75rem;
`;

export const SidebarRailRoot = styled.button`
  position: absolute;
  inset-y: 0;
  z-index: 20;
  display: none; 
  width: 1rem; 
  transform: translateX(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s linear;

  ${({ theme }) => theme.media.tablet} { display: flex; }

  &::after {
    content: '';
    position: absolute;
    inset-y: 0;
    left: 50%;
    width: 2px;
    transition: background-color 0.2s;
  }

  &:hover::after { background-color: ${({ theme }) => theme.colors.sidebarBorder}; }

  [data-side='left'] & { right: -1rem; cursor: w-resize; }
  [data-side='right'] & { left: 0; cursor: e-resize; }
  
  [data-state='collapsed'][data-side='left'] & { cursor: e-resize; }
  [data-state='collapsed'][data-side='right'] & { cursor: w-resize; }

  
  [data-collapsible='offcanvas'] & { transform: translateX(0); }
  [data-collapsible='offcanvas'] &::after { left: 100%; }
  &:hover { [data-collapsible='offcanvas'] & { background-color: ${({ theme }) => theme.colors.sidebar}; } }
  
  [data-collapsible='offcanvas'][data-side='left'] & { right: -0.5rem; }
  [data-collapsible='offcanvas'][data-side='right'] & { left: -0.5rem; }
`;

export const SidebarInsetRoot = styled.main`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};

  [data-variant='inset'] ~ & {
    ${({ theme }) => theme.media.tablet} {
      margin: ${({ theme }) => theme.spacing[8]};
      margin-left: 0;
      border-radius: 12px;
      box-shadow: ${({ theme }) => theme.shadows.shadow1};
    }
  }
  
  [data-state='collapsed'][data-variant='inset'] ~ & {
    ${({ theme }) => theme.media.tablet} { margin-left: ${({ theme }) => theme.spacing[8]}; }
  }
`;

export const SidebarInputRoot = styled(Input)`
  height: 2rem; 
  width: 100%;
  box-shadow: none;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const SidebarSeparatorRoot = styled(Separator)`
  margin: 0 ${({ theme }) => theme.spacing[8]};
  width: auto;
  background-color: ${({ theme }) => theme.colors.sidebarBorder};
`;

export const SidebarMenuRoot = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]}; 
  width: 100%;
  min-width: 0;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SidebarMenuItemRoot = styled.li`
  position: relative;
`;

export const SidebarMenuButtonRoot = styled.button<{ $variant?: 'default' | 'outline'; $size?: 'sm' | 'default' | 'lg'; $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  width: 100%;
  overflow: hidden;
  border-radius: 6px;
  text-align: left;
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: width 0.2s, height 0.2s, padding 0.2s, background-color 0.2s, color 0.2s;
  color: ${({ theme }) => theme.colors.sidebarForeground};

  &:disabled, &[aria-disabled='true'] {
    pointer-events: none;
    opacity: 0.5;
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.sidebarRing};
  }

  & > svg {
    width: ${({ theme }) => theme.spacing[16]};
    height: ${({ theme }) => theme.spacing[16]};
    flex-shrink: 0;
  }

  & > span:last-child {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  
  ${({ $size, theme }) => {
    switch ($size) {
      case 'sm':
        return css`
          height: 1.75rem; 
          padding: ${theme.spacing[8]};
          font-size: ${theme.fontSizes[12]};
        `;
      case 'lg':
        return css`
          height: 3rem; 
          padding: ${theme.spacing[8]};
          font-size: ${theme.fontSizes[14]};
        `;
      case 'default':
      default:
        return css`
          height: 2rem; 
          padding: ${theme.spacing[8]};
          font-size: ${theme.fontSizes[14]};
        `;
    }
  }}

  
  ${({ $variant, theme }) => {
    if ($variant === 'outline') {
      return css`
        background-color: ${theme.colors.background};
        box-shadow: 0 0 0 1px ${theme.colors.sidebarBorder};
        &:hover {
          background-color: ${theme.colors.sidebarAccent};
          color: ${theme.colors.sidebarAccentForeground};
          box-shadow: 0 0 0 1px ${theme.colors.sidebarAccent};
        }
      `;
    }
    
    return css`
      &:hover, &:active, &[data-state='open']:hover {
        background-color: ${theme.colors.sidebarAccent};
        color: ${theme.colors.sidebarAccentForeground};
      }
    `;
  }}

  
  ${({ $isActive, theme }) => $isActive && css`
    background-color: ${theme.colors.sidebarAccent};
    color: ${theme.colors.sidebarAccentForeground};
    font-weight: ${theme.fontWeights.medium};
  `}

  
  [data-sidebar='menu-item']:has([data-sidebar='menu-action']) & {
    padding-right: 2rem; 
  }

  
  [data-collapsible='icon'] & {
    width: 2rem !important; 
    height: 2rem !important;
    padding: ${({ theme }) => theme.spacing[8]} !important; 
    justify-content: center;
    
    & > span:last-child { display: none; }
    &[data-size='lg'] { padding: 0 !important; }
  }
`;

export const SidebarMenuActionRoot = styled.button<{ $showOnHover?: boolean }>`
  position: absolute;
  right: 0.25rem; 
  display: flex;
  aspect-ratio: 1 / 1;
  width: 1.25rem; 
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.sidebarForeground};
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.sidebarAccent};
    color: ${({ theme }) => theme.colors.sidebarAccentForeground};
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.sidebarRing};
  }

  & > svg {
    width: ${({ theme }) => theme.spacing[16]};
    height: ${({ theme }) => theme.spacing[16]};
    flex-shrink: 0;
  }

  
  [data-size='sm'] ~ & { top: 0.25rem; }
  [data-size='default'] ~ & { top: 0.375rem; } 
  [data-size='lg'] ~ & { top: 0.625rem; } 

  
  &::after {
    content: '';
    position: absolute;
    inset: -0.5rem;
    ${({ theme }) => theme.media.tablet} { display: none; }
  }

  [data-collapsible='icon'] & { display: none; }

  
  ${({ $showOnHover }) => $showOnHover && css`
    opacity: 0;
    ${({ theme }) => theme.media.tablet} { opacity: 0; }
    
    
    [data-active='true'] ~ &,
    [data-sidebar='menu-item']:focus-within &,
    [data-sidebar='menu-item']:hover &,
    [data-state='open'] & {
      opacity: 1;
    }
  `}
`;

export const SidebarMenuBadgeRoot = styled.div`
  position: absolute;
  right: 0.25rem; 
  display: flex;
  height: 1.25rem; 
  min-width: 1.25rem;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  padding: 0 ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-variant-numeric: tabular-nums;
  pointer-events: none;
  user-select: none;
  color: ${({ theme }) => theme.colors.sidebarForeground};

  [data-size='sm'] ~ & { top: 0.25rem; }
  [data-size='default'] ~ & { top: 0.375rem; }
  [data-size='lg'] ~ & { top: 0.625rem; }

  [data-collapsible='icon'] & { display: none; }

  
  button:hover ~ &, [data-active='true'] ~ & {
    color: ${({ theme }) => theme.colors.sidebarAccentForeground};
  }
`;

export const SidebarMenuSkeletonRoot = styled.div`
  display: flex;
  height: 2rem; 
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  border-radius: 6px;
  padding: 0 ${({ theme }) => theme.spacing[8]};
`;

export const SidebarMenuSubRoot = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]}; 
  min-width: 0;
  transform: translateX(1px);
  border-left: 1px solid ${({ theme }) => theme.colors.sidebarBorder};
  margin: 0 0.875rem; 
  padding: 0.125rem 0.625rem; 
  list-style: none;

  [data-collapsible='icon'] & { display: none; }
`;

export const SidebarMenuSubItemRoot = styled.li`
  position: relative;
`;

export const SidebarMenuSubButtonRoot = styled.a<{ $size?: 'sm' | 'md'; $isActive?: boolean }>`
  display: flex;
  height: 1.75rem; 
  min-width: 0;
  transform: translateX(-1px);
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  overflow: hidden;
  border-radius: 6px;
  padding: 0 ${({ theme }) => theme.spacing[8]};
  outline: none;
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.sidebarForeground};

  
  font-size: ${({ $size, theme }) => ($size === 'sm' ? theme.fontSizes[12] : theme.fontSizes[14])};

  &:hover, &:active {
    background-color: ${({ theme }) => theme.colors.sidebarAccent};
    color: ${({ theme }) => theme.colors.sidebarAccentForeground};
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.sidebarRing};
  }

  &:disabled, &[aria-disabled='true'] {
    pointer-events: none;
    opacity: 0.5;
  }

  & > svg {
    width: ${({ theme }) => theme.spacing[16]};
    height: ${({ theme }) => theme.spacing[16]};
    flex-shrink: 0;
  }

  & > span:last-child {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${({ $isActive, theme }) => $isActive && css`
    background-color: ${theme.colors.sidebarAccent};
    color: ${theme.colors.sidebarAccentForeground};
  `}

  [data-collapsible='icon'] & { display: none; }
`;
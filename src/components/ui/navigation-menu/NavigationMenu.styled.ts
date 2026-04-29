'use client';

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const zoomIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const zoomOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
`;

const zoomIn90 = keyframes`
  from { opacity: 0; transform: scale(0.90); }
  to { opacity: 1; transform: scale(1); }
`;

const slideInFromRight = keyframes`
  from { transform: translateX(13rem); }
  to { transform: translateX(0); }
`;

const slideInFromLeft = keyframes`
  from { transform: translateX(-13rem); }
  to { transform: translateX(0); }
`;

const slideOutToRight = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(13rem); }
`;

const slideOutToLeft = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-13rem); }
`;

export const navigationMenuTriggerStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.25rem; 
  width: max-content;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[16]}; 
  font-size: ${({ theme }) => theme.fontSizes[14]}; 
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  outline: none;
  border: none;
  transition: color 0.2s, background-color 0.2s, box-shadow 0.2s;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.foreground};

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentForeground};
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &[data-state='open'] {
    background-color: ${({ theme }) => theme.colors.accent}80; 
    color: ${({ theme }) => theme.colors.accentForeground};
    
    &:hover,
    &:focus {
      background-color: ${({ theme }) => theme.colors.accent};
    }
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.ring}80; 
  }
`;

export const NavigationMenuRoot = styled(NavigationMenuPrimitive.Root)`
  position: relative;
  display: flex;
  max-width: max-content;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const NavigationMenuListRoot = styled(NavigationMenuPrimitive.List)`
  display: flex;
  flex: 1;
  list-style: none;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[4]}; 
  margin: 0;
  padding: 0;
`;

export const NavigationMenuItemRoot = styled(NavigationMenuPrimitive.Item)`
  position: relative;
`;

export const NavigationMenuTriggerRoot = styled(NavigationMenuPrimitive.Trigger)`
  ${navigationMenuTriggerStyles}
  
  
  & > svg {
    position: relative;
    top: 1px;
    margin-left: ${({ theme }) => theme.spacing[4]}; 
    width: 0.75rem; 
    height: 0.75rem;
    transition: transform 0.3s ease;
  }

  &[data-state='open'] > svg {
    transform: rotate(180deg);
  }
`;

export const NavigationMenuContentRoot = styled(NavigationMenuPrimitive.Content)`
  top: 0;
  left: 0;
  width: 100%;
  padding: ${({ theme }) => theme.spacing[8]}; 
  padding-right: 0.625rem; 

  ${({ theme }) => theme.media.tablet} {
    position: absolute;
    width: auto;
  }

  
  &[data-motion='from-start'] { animation: ${slideInFromLeft} 0.2s ease, ${fadeIn} 0.2s ease; }
  &[data-motion='from-end'] { animation: ${slideInFromRight} 0.2s ease, ${fadeIn} 0.2s ease; }
  &[data-motion='to-start'] { animation: ${slideOutToLeft} 0.2s ease, ${fadeOut} 0.2s ease; }
  &[data-motion='to-end'] { animation: ${slideOutToRight} 0.2s ease, ${fadeOut} 0.2s ease; }

  
  [data-viewport='false'] & {
    background-color: ${({ theme }) => theme.colors.popover};
    color: ${({ theme }) => theme.colors.popoverForeground};
    top: 100%; 
    margin-top: 0.375rem; 
    overflow: hidden;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: ${({ theme }) => theme.shadows.shadow1}; 
    
    &[data-state='open'] {
      animation: ${zoomIn} 0.2s ease-out forwards;
    }
    
    &[data-state='closed'] {
      animation: ${zoomOut} 0.2s ease-in forwards;
    }
  }

  
  [data-viewport='false'] & [data-slot='navigation-menu-link']:focus {
    box-shadow: none;
    outline: none;
  }
`;

export const ViewportPositioner = styled.div`
  position: absolute;
  top: 100%; 
  left: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  
  isolation: isolate; 
`;

export const NavigationMenuViewportRoot = styled(NavigationMenuPrimitive.Viewport)`
  position: relative;
  margin-top: 0.375rem; 
  width: 100%;
  height: var(--radix-navigation-menu-viewport-height);
  overflow: hidden;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.popover};
  color: ${({ theme }) => theme.colors.popoverForeground};
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
  transform-origin: top center;
  transition: width 0.2s ease, height 0.2s ease;

  ${({ theme }) => theme.media.tablet} {
    width: var(--radix-navigation-menu-viewport-width);
  }

  &[data-state='open'] {
    animation: ${zoomIn90} 0.2s ease-out forwards;
  }
  
  &[data-state='closed'] {
    animation: ${zoomOut} 0.2s ease-in forwards;
  }
`;

export const NavigationMenuLinkRoot = styled(NavigationMenuPrimitive.Link)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]}; 
  border-radius: 4px; 
  padding: ${({ theme }) => theme.spacing[8]}; 
  font-size: ${({ theme }) => theme.fontSizes[14]}; 
  outline: none;
  transition: all 0.2s ease;
  text-decoration: none;
  color: inherit;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentForeground};
  }

  &[data-active='true'] {
    background-color: ${({ theme }) => theme.colors.accent}80; 
    color: ${({ theme }) => theme.colors.accentForeground};
    
    &:hover,
    &:focus {
      background-color: ${({ theme }) => theme.colors.accent};
    }
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.ring}80;
  }

  & svg:not([class*='text-']) {
    color: ${({ theme }) => theme.colors.mutedForeground};
  }

  & svg:not([class*='size-']) {
    width: 1rem; 
    height: 1rem;
  }
`;

export const NavigationMenuIndicatorRoot = styled(NavigationMenuPrimitive.Indicator)`
  position: absolute;
  top: 100%; 
  z-index: 1;
  display: flex;
  height: 0.375rem; 
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;

  &[data-state='visible'] {
    animation: ${fadeIn} 0.2s ease forwards;
  }
  &[data-state='hidden'] {
    animation: ${fadeOut} 0.2s ease forwards;
  }
`;

export const IndicatorArrow = styled.div`
  position: relative;
  top: 60%;
  width: 0.5rem; 
  height: 0.5rem; 
  transform: rotate(45deg);
  border-top-left-radius: 2px; 
  background-color: ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.shadow2}; 
`;
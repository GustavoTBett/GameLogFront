'use client';

import { Drawer as DrawerPrimitive } from 'vaul';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

export const DrawerRoot = styled(DrawerPrimitive.Root)``;
export const DrawerTrigger = styled(DrawerPrimitive.Trigger)``;
export const DrawerPortal = styled(DrawerPrimitive.Portal)``;
export const DrawerClose = styled(DrawerPrimitive.Close)``;

export const DrawerOverlayRoot = styled(DrawerPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.5);

  &[data-state='open'] {
    animation: ${fadeIn} 0.2s ease-out forwards;
  }
  &[data-state='closed'] {
    animation: ${fadeOut} 0.2s ease-in forwards;
  }
`;

export const DrawerContentRoot = styled(DrawerPrimitive.Content)`
  position: fixed;
  z-index: 50;
  display: flex;
  height: auto;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  outline: none;

  
  &[data-vaul-drawer-direction='top'] {
    left: 0;
    right: 0;
    top: 0;
    margin-bottom: ${({ theme }) => theme.spacing[64]}; 
    max-height: 80vh;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  
  &[data-vaul-drawer-direction='bottom'] {
    left: 0;
    right: 0;
    bottom: 0;
    margin-top: ${({ theme }) => theme.spacing[64]}; 
    max-height: 80vh;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }

  
  &[data-vaul-drawer-direction='right'] {
    top: 0;
    bottom: 0;
    right: 0;
    width: 75%;
    border-left: 1px solid ${({ theme }) => theme.colors.border};
    
    ${({ theme }) => theme.media.tablet} {
      max-width: 24rem; 
    }
  }

  
  &[data-vaul-drawer-direction='left'] {
    top: 0;
    bottom: 0;
    left: 0;
    width: 75%;
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    
    ${({ theme }) => theme.media.tablet} {
      max-width: 24rem; 
    }
  }
`;

export const DrawerHandle = styled.div`
  background-color: ${({ theme }) => theme.colors.muted};
  margin: ${({ theme }) => theme.spacing[16]} auto 0; 
  height: ${({ theme }) => theme.spacing[8]}; 
  width: 100px;
  flex-shrink: 0;
  border-radius: 9999px;
  display: none;

  
  [data-vaul-drawer-direction='bottom'] & {
    display: block;
  }
`;

export const DrawerHeaderRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]}; 
  padding: ${({ theme }) => theme.spacing[16]}; 

  
  [data-vaul-drawer-direction='bottom'] &,
  [data-vaul-drawer-direction='top'] & {
    text-align: center;
  }

  
  ${({ theme }) => theme.media.tablet} {
    gap: ${({ theme }) => theme.spacing[6]}; 
    
    [data-vaul-drawer-direction='bottom'] &,
    [data-vaul-drawer-direction='top'] & {
      text-align: left;
    }
  }
`;

export const DrawerFooterRoot = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]}; 
  padding: ${({ theme }) => theme.spacing[16]}; 
`;

export const DrawerTitleRoot = styled(DrawerPrimitive.Title)`
  color: ${({ theme }) => theme.colors.foreground};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin: 0;
`;

export const DrawerDescriptionRoot = styled(DrawerPrimitive.Description)`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  margin: 0;
`;
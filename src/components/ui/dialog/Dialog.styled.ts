'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const contentShow = keyframes`
  from { 
    opacity: 0; 
    transform: translate(-50%, -48%) scale(0.95); 
  }
  to { 
    opacity: 1; 
    transform: translate(-50%, -50%) scale(1); 
  }
`;

const contentHide = keyframes`
  from { 
    opacity: 1; 
    transform: translate(-50%, -50%) scale(1); 
  }
  to { 
    opacity: 0; 
    transform: translate(-50%, -48%) scale(0.95); 
  }
`;

export const DialogRoot = styled(DialogPrimitive.Root)``;
export const DialogTrigger = styled(DialogPrimitive.Trigger)``;
export const DialogPortal = styled(DialogPrimitive.Portal)``;
export const DialogClose = styled(DialogPrimitive.Close)``;

export const DialogOverlayRoot = styled(DialogPrimitive.Overlay)`
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

export const DialogContentRoot = styled(DialogPrimitive.Content)`
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 50;
  transform: translate(-50%, -50%);
  
  display: grid;
  width: calc(100% - 2rem);
  max-width: 32rem; 
  gap: ${({ theme }) => theme.spacing[16]}; 
  padding: ${({ theme }) => theme.spacing[24]}; 
  
  border-radius: 8px; 
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.shadow3}; 
  
  outline: none;

  &[data-state='open'] {
    animation: ${contentShow} 0.2s ease-out forwards;
  }
  &[data-state='closed'] {
    animation: ${contentHide} 0.2s ease-in forwards;
  }
`;

export const DialogCloseButton = styled(DialogPrimitive.Close)`
  position: absolute;
  right: ${({ theme }) => theme.spacing[16]}; 
  top: ${({ theme }) => theme.spacing[16]}; 
  border-radius: 2px; 
  opacity: 0.7;
  transition: opacity 0.2s;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 1;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.background}, 
                0 0 0 4px ${({ theme }) => theme.colors.ring};
  }

  &:disabled {
    pointer-events: none;
  }

  & > svg {
    width: ${({ theme }) => theme.spacing[16]}; 
    height: ${({ theme }) => theme.spacing[16]};
    pointer-events: none;
    flex-shrink: 0;
  }

  &[data-state='open'] {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.mutedForeground};
  }
`;

export const DialogHeaderRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]}; 
  text-align: center;

  ${({ theme }) => theme.media.tablet} {
    text-align: left;
  }
`;

export const DialogFooterRoot = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: ${({ theme }) => theme.spacing[8]}; 

  ${({ theme }) => theme.media.tablet} {
    flex-direction: row;
    justify-content: flex-end;
  }
`;

export const DialogTitleRoot = styled(DialogPrimitive.Title)`
  font-size: ${({ theme }) => theme.fontSizes[18]}; 
  font-weight: ${({ theme }) => theme.fontWeights.bold}; 
  line-height: 1; 
  margin: 0;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const DialogDescriptionRoot = styled(DialogPrimitive.Description)`
  font-size: ${({ theme }) => theme.fontSizes[14]}; 
  color: ${({ theme }) => theme.colors.mutedForeground};
  margin: 0;
`;

export const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;
'use client';

import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import styled, { keyframes } from 'styled-components';

const contentShow = keyframes`
  from { 
    opacity: 0; 
    transform: scale(0.95); 
  }
  to { 
    opacity: 1; 
    transform: scale(1); 
  }
`;

const contentHide = keyframes`
  from { 
    opacity: 1; 
    transform: scale(1); 
  }
  to { 
    opacity: 0; 
    transform: scale(0.95); 
  }
`;

export const HoverCardContentRoot = styled(HoverCardPrimitive.Content)`
  z-index: 50;
  width: 16rem; 
  border-radius: 6px; 
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing[16]}; 
  
  background-color: ${({ theme }) => theme.colors.popover};
  color: ${({ theme }) => theme.colors.popoverForeground};
  box-shadow: ${({ theme }) => theme.shadows.shadow2}; 
  outline: none;
  
  
  transform-origin: var(--radix-hover-card-content-transform-origin);

  &[data-state='open'] {
    animation: ${contentShow} 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  &[data-state='closed'] {
    animation: ${contentHide} 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
`;
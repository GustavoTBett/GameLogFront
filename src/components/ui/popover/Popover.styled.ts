'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import styled, { keyframes } from 'styled-components';

const contentShow = keyframes`
  from { 
    opacity: 0; 
    transform: scale(0.95) translateY(2px); 
  }
  to { 
    opacity: 1; 
    transform: scale(1) translateY(0); 
  }
`;

const contentHide = keyframes`
  from { 
    opacity: 1; 
    transform: scale(1) translateY(0); 
  }
  to { 
    opacity: 0; 
    transform: scale(0.95) translateY(2px); 
  }
`;

export const PopoverContentRoot = styled(PopoverPrimitive.Content)`
  z-index: 50;
  width: 18rem; 
  border-radius: 6px; 
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.popover};
  color: ${({ theme }) => theme.colors.popoverForeground};
  padding: ${({ theme }) => theme.spacing[16]}; 
  box-shadow: ${({ theme }) => theme.shadows.shadow2}; 
  outline: none;

  
  transform-origin: var(--radix-popover-content-transform-origin);

  &[data-state='open'] {
    animation: ${contentShow} 0.2s ease-out forwards;
  }

  &[data-state='closed'] {
    animation: ${contentHide} 0.2s ease-in forwards;
  }
`;
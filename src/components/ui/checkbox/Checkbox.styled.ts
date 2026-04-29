'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import styled from 'styled-components';

export const CheckboxRoot = styled(CheckboxPrimitive.Root)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  
  width: ${({ theme }) => theme.spacing[16]};
  height: ${({ theme }) => theme.spacing[16]};
  border-radius: 4px;
  
  
  border: 1px solid ${({ theme }) => theme.colors.input};
  background-color: transparent;
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
  
  outline: none;
  cursor: pointer;
  transition: box-shadow 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;

  
  &[data-state='checked'] {
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primaryForeground};
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
`;

export const CheckboxIndicator = styled(CheckboxPrimitive.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: currentColor;
  
  
  & > svg {
    width: 0.875rem;
    height: 0.875rem;
  }
`;
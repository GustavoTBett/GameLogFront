'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import styled from 'styled-components';

export const RadioGroupRoot = styled(RadioGroupPrimitive.Root)`
  display: grid;
  gap: ${({ theme }) => theme.spacing[12]}; 
`;

export const RadioGroupItemRoot = styled(RadioGroupPrimitive.Item)`
  aspect-ratio: 1 / 1;
  width: 1rem; 
  height: 1rem;
  flex-shrink: 0;
  border-radius: 9999px; 
  border: 1px solid ${({ theme }) => theme.colors.input};
  background-color: transparent;
  box-shadow: ${({ theme }) => theme.shadows.shadow1}; 
  transition: color 0.2s, box-shadow 0.2s, border-color 0.2s;
  outline: none;
  cursor: pointer;

  
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

export const RadioGroupIndicator = styled(RadioGroupPrimitive.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;

  & > svg {
    width: 0.5rem; 
    height: 0.5rem;
    fill: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;
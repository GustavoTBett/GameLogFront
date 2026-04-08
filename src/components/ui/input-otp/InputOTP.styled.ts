'use client';

import styled, { keyframes } from 'styled-components';

const caretBlink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

export const CaretContainer = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CaretBlink = styled.div`
  background-color: ${({ theme }) => theme.colors.foreground};
  height: 1rem; 
  width: 1px; 
  
  animation: ${caretBlink} 1s step-end infinite;
`;

export const InputOTPWrapper = styled.div`
  
  & > [data-input-otp-container] {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[8]};
  }

  
  &:has(input:disabled) > [data-input-otp-container] {
    opacity: 0.5;
  }

  
  input:disabled {
    cursor: not-allowed;
  }
`;

export const InputOTPGroupRoot = styled.div`
  display: flex;
  align-items: center;
`;

export const InputOTPSeparatorRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  
  & > svg {
    width: ${({ theme }) => theme.spacing[16]};
    height: ${({ theme }) => theme.spacing[16]};
    color: ${({ theme }) => theme.colors.mutedForeground};
  }
`;

export const InputOTPSlotRoot = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.25rem; 
  width: 2.25rem; 
  font-size: ${({ theme }) => theme.fontSizes[14]}; 
  box-shadow: ${({ theme }) => theme.shadows.shadow1}; 
  transition: all 0.2s ease-in-out;
  outline: none;
  
  background-color: transparent;

  
  border-top: 1px solid ${({ theme }) => theme.colors.input};
  border-bottom: 1px solid ${({ theme }) => theme.colors.input};
  border-right: 1px solid ${({ theme }) => theme.colors.input};
  border-left: none;

  &:first-child {
    border-left: 1px solid ${({ theme }) => theme.colors.input};
    border-top-left-radius: 6px; 
    border-bottom-left-radius: 6px;
  }

  &:last-child {
    border-top-right-radius: 6px; 
    border-bottom-right-radius: 6px;
  }

  
  &[aria-invalid='true'] {
    border-color: ${({ theme }) => theme.colors.destructive};
  }

  
  &[data-active='true'] {
    z-index: 10;
    border-color: ${({ theme }) => theme.colors.ring};
    
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.ring}80;

    
    &[aria-invalid='true'] {
      border-color: ${({ theme }) => theme.colors.destructive};
      
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.destructive}33;
    }
  }
`;
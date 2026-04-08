'use client';

import styled from 'styled-components';

export const InputRoot = styled.input`
  display: flex;
  width: 100%;
  min-width: 0;
  height: 2.25rem; 
  border-radius: 6px; 
  border: 1px solid ${({ theme }) => theme.colors.input};
  background-color: transparent;
  
  
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[12]}; 
  
  
  font-size: ${({ theme }) => theme.fontSizes[16]};
  ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fontSizes[14]};
  }

  box-shadow: ${({ theme }) => theme.shadows.shadow1}; 
  transition: color 0.2s, box-shadow 0.2s, border-color 0.2s;
  outline: none;

  
  &::placeholder {
    color: ${({ theme }) => theme.colors.mutedForeground};
  }

  
  &::selection {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primaryForeground};
  }

  
  &::file-selector-button {
    display: inline-flex;
    height: 1.75rem; 
    border: 0;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.foreground};
    font-size: ${({ theme }) => theme.fontSizes[14]};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    cursor: pointer;
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
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
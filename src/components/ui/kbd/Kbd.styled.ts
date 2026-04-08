'use client';

import styled from 'styled-components';

export const KbdRoot = styled.kbd`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[4]}; 
  width: fit-content;
  min-width: 1.25rem; 
  height: 1.25rem; 
  padding: 0 ${({ theme }) => theme.spacing[4]}; 
  border-radius: 4px; 
  
  background-color: ${({ theme }) => theme.colors.muted};
  color: ${({ theme }) => theme.colors.mutedForeground};
  
  font-size: ${({ theme }) => theme.fontSizes[12]}; 
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  
  pointer-events: none;
  user-select: none;

  
  & svg:not([class*='size-']) {
    width: 0.75rem; 
    height: 0.75rem;
  }

  
  [data-slot='tooltip-content'] & {
    
    background-color: ${({ theme }) => theme.colors.background}33; 
    color: ${({ theme }) => theme.colors.background};
  }
`;

export const KbdGroupRoot = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]}; 
`;
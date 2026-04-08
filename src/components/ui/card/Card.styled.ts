'use client';

import styled from 'styled-components';

export const CardRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[24]};
  border-radius: 12px; 
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing[24]} 0;
  
  background-color: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.cardForeground};
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
`;

export const CardHeader = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  grid-template-rows: auto auto;
  align-items: start;
  gap: ${({ theme }) => theme.spacing[8]};
  padding: 0 ${({ theme }) => theme.spacing[24]};

  
  &:has([data-slot="card-action"]) {
    grid-template-columns: 1fr auto;
  }
`;

export const CardTitle = styled.div`
  line-height: 1; 
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes[18]};
`;

export const CardDescription = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[14]};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

export const CardAction = styled.div`
  grid-column-start: 2;
  grid-row: 1 / span 2;
  align-self: start;
  justify-self: end;
`;

export const CardContent = styled.div`
  padding: 0 ${({ theme }) => theme.spacing[24]};
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing[24]};
`;
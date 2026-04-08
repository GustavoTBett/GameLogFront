'use client';

import styled from 'styled-components';
import { Toaster as Sonner } from 'sonner';

export const StyledToaster = styled(Sonner)`
  &.toaster.group {
    
    --normal-bg: ${({ theme }) => theme.colors.sidebar}; 
    --normal-text: ${({ theme }) => theme.colors.foreground};
    --normal-border: ${({ theme }) => theme.colors.border};
    
    
    --success-bg: ${({ theme }) => theme.colors.success};
    --success-text: ${({ theme }) => theme.colors.primaryForeground};
    --error-bg: ${({ theme }) => theme.colors.destructive};
    --error-text: ${({ theme }) => theme.colors.destructiveForeground};
    
    
    font-family: inherit;
  }

  & .toast {
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: ${({ theme }) => theme.shadows.shadow2};
  }
`;
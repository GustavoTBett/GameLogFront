'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import styled from 'styled-components';

export const LabelRoot = styled(LabelPrimitive.Root)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]}; 
  font-size: ${({ theme }) => theme.fontSizes[14]}; 
  line-height: 1; 
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  user-select: none;

  
  [data-disabled='true'] & {
    pointer-events: none;
    opacity: 0.5;
  }

  :disabled ~ &,
  [data-disabled] ~ & {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
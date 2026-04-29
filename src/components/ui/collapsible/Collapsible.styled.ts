'use client';

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import styled, { keyframes } from 'styled-components';

export const CollapsibleRoot = styled(CollapsiblePrimitive.Root)``;

export const CollapsibleTrigger = styled(CollapsiblePrimitive.CollapsibleTrigger)`
`;


const slideDown = keyframes`
  from {
    height: 0;
  }
  to {
    height: var(--radix-collapsible-content-height);
  }
`;

const slideUp = keyframes`
  from {
    height: var(--radix-collapsible-content-height);
  }
  to {
    height: 0;
  }
`;

export const CollapsibleContent = styled(CollapsiblePrimitive.CollapsibleContent)`
  overflow: hidden;

  &[data-state='open'] {
    animation: ${slideDown} 0.2s ease-out;
  }
  
  &[data-state='closed'] {
    animation: ${slideUp} 0.2s ease-out;
  }
`;
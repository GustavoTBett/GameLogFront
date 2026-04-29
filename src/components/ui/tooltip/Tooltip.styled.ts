'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import styled, { keyframes } from 'styled-components';

const slideUpAndFade = keyframes`
  from { opacity: 0; transform: translateY(2px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const slideDownAndFade = keyframes`
  from { opacity: 0; transform: translateY(-2px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const slideLeftAndFade = keyframes`
  from { opacity: 0; transform: translateX(2px) scale(0.95); }
  to { opacity: 1; transform: translateX(0) scale(1); }
`;

const slideRightAndFade = keyframes`
  from { opacity: 0; transform: translateX(-2px) scale(0.95); }
  to { opacity: 1; transform: translateX(0) scale(1); }
`;

export const TooltipContentRoot = styled(TooltipPrimitive.Content)`
  z-index: 50;
  width: max-content;
  max-width: 20rem;
  border-radius: 6px;
  
  background-color: ${({ theme }) => theme.colors.foreground};
  color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => `${theme.spacing[6]} ${theme.spacing[12]}`}; 
  font-size: ${({ theme }) => theme.fontSizes[12]};
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
  user-select: none;
  text-wrap: balance;
  
  transform-origin: var(--radix-tooltip-content-transform-origin);

  &[data-state='delayed-open'] {
    &[data-side='top'] { animation: ${slideDownAndFade} 0.2s ease-out; }
    &[data-side='right'] { animation: ${slideLeftAndFade} 0.2s ease-out; }
    &[data-side='bottom'] { animation: ${slideUpAndFade} 0.2s ease-out; }
    &[data-side='left'] { animation: ${slideRightAndFade} 0.2s ease-out; }
  }
`;

export const TooltipArrowStyled = styled(TooltipPrimitive.Arrow)`
  fill: ${({ theme }) => theme.colors.foreground};
  width: 10px;
  height: 5px;
`;
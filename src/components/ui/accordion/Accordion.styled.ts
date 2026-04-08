'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import styled, { keyframes } from 'styled-components';

const slideDown = keyframes`
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
`;

const slideUp = keyframes`
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
`;

export const AccordionRoot = styled(AccordionPrimitive.Root)`
  width: 100%;
`;

export const AccordionItem = styled(AccordionPrimitive.Item)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: 0;
  }
`;

export const AccordionHeader = styled(AccordionPrimitive.Header)`
  display: flex;
  margin: 0;
`;

export const AccordionTrigger = styled(AccordionPrimitive.Trigger)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  
  
  gap: ${({ theme }) => theme.spacing[16]};
  padding: ${({ theme }) => theme.spacing[16]} 0;
  
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.foreground};
  
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    border-radius: 4px;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.ring};
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  
  svg {
    color: ${({ theme }) => theme.colors.mutedForeground};
    width: ${({ theme }) => theme.spacing[16]};
    height: ${({ theme }) => theme.spacing[16]};
    flex-shrink: 0;
    transition: transform 250ms cubic-bezier(0.87, 0, 0.13, 1);
  }

  &[data-state='open'] svg {
    transform: rotate(180deg);
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const AccordionContent = styled(AccordionPrimitive.Content)`
  overflow: hidden;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  color: ${({ theme }) => theme.colors.mutedForeground};
  background-color: transparent;

  &[data-state='open'] {
    animation: ${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }
  &[data-state='closed'] {
    animation: ${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }
`;

export const ContentInner = styled.div`
  
  padding-top: ${({ theme }) => theme.spacing[4]};
  padding-bottom: ${({ theme }) => theme.spacing[16]};
  line-height: ${({ theme }) => theme.lineHeights.tall};
`;
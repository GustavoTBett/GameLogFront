'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import styled from 'styled-components';

export const ProgressRoot = styled(ProgressPrimitive.Root)`
  position: relative;
  height: 0.5rem; 
  width: 100%;
  overflow: hidden;
  border-radius: 9999px; 
  background-color: ${({ theme }) => theme.colors.primary}33; 
`;

export const ProgressIndicator = styled(ProgressPrimitive.Indicator)`
  background-color: ${({ theme }) => theme.colors.primary};
  height: 100%;
  width: 100%;
  flex: 1;
  transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1);
`;
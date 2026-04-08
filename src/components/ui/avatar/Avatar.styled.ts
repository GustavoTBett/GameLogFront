'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import styled from 'styled-components';

export const AvatarRoot = styled(AvatarPrimitive.Root)`
  position: relative;
  display: flex;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 9999px; 
  
  
  width: ${({ theme }) => theme.spacing[32]};
  height: ${({ theme }) => theme.spacing[32]};
`;

export const AvatarImage = styled(AvatarPrimitive.Image)`
  aspect-ratio: 1 / 1;
  width: 100%;
  height: 100%;
  object-fit: cover; 
`;

export const AvatarFallback = styled(AvatarPrimitive.Fallback)`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  
  
  background-color: ${({ theme }) => theme.colors.muted};
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;
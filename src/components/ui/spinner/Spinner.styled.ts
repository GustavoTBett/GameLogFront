'use client';
import styled, { keyframes } from 'styled-components';
import { Loader2Icon } from 'lucide-react';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const StyledSpinner = styled(Loader2Icon)`
  width: ${({ theme }) => theme.spacing[16]};
  height: ${({ theme }) => theme.spacing[16]};
  animation: ${spin} 1s linear infinite;
  color: inherit;
`;
'use client';

import styled from 'styled-components';
import { Label } from '@/components/ui/label/Label';

export const FormItemRoot = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[8]}; 
`;

export const FormLabelRoot = styled(Label)`
  
  &[data-error='true'] {
    color: ${({ theme }) => theme.colors.destructive};
  }
`;

export const FormDescriptionRoot = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[14]}; 
  color: ${({ theme }) => theme.colors.mutedForeground};
  margin: 0;
`;

export const FormMessageRoot = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[14]}; 
  color: ${({ theme }) => theme.colors.destructive};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin: 0;
`;
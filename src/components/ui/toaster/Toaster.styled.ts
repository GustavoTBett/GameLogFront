'use client';
import styled from 'styled-components';

export const ToastGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
`;
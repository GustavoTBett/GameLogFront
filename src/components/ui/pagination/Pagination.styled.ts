'use client';

import styled from 'styled-components';
import { Button } from '@/components/ui/button/Button';

export const PaginationRoot = styled.nav`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 0 auto;
`;

export const PaginationContentRoot = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]}; 
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const PaginationItemRoot = styled.li`
  
`;

export const PaginationDirectionButton = styled(Button)`
  gap: ${({ theme }) => theme.spacing[4]}; 
  padding-left: ${({ theme }) => theme.spacing[10]}; 
  padding-right: ${({ theme }) => theme.spacing[10]};

  ${({ theme }) => theme.media.tablet} {
    padding-left: ${({ theme }) => theme.spacing[10]};
    padding-right: ${({ theme }) => theme.spacing[10]};
  }
`;

export const ResponsiveText = styled.span`
  display: none; 

  ${({ theme }) => theme.media.tablet} {
    display: block; 
  }
`;

export const PaginationEllipsisRoot = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem; 
  height: 2.25rem;

  & > svg {
    width: 1rem; 
    height: 1rem;
  }
`;

export const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;
'use client';

import styled from 'styled-components';

export const BreadcrumbRoot = styled.nav``;

export const BreadcrumbList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  word-break: break-word;
  
  
  gap: ${({ theme }) => theme.spacing[6]}; 
  font-size: ${({ theme }) => theme.fontSizes[14]};
  color: ${({ theme }) => theme.colors.mutedForeground};

  
  ${({ theme }) => theme.media.tablet} {
    gap: ${({ theme }) => theme.spacing[12]}; 
  }
`;

export const BreadcrumbItem = styled.li`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};
`;

export const BreadcrumbLink = styled.a`
  transition: color 0.2s ease-in-out;
  color: inherit;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

export const BreadcrumbPage = styled.span`
  color: ${({ theme }) => theme.colors.foreground};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

export const BreadcrumbSeparator = styled.li`
  display: flex;
  align-items: center;
  
  & > svg {
    
    width: 0.875rem;
    height: 0.875rem;
  }
`;

export const BreadcrumbEllipsis = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  
  
  width: 2.25rem;
  height: 2.25rem;

  & > svg {
    
    width: ${({ theme }) => theme.spacing[16]};
    height: ${({ theme }) => theme.spacing[16]};
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
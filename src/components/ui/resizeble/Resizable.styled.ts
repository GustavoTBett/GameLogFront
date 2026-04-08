'use client';

import { Group, Separator } from 'react-resizable-panels';
import styled from 'styled-components';

export const StyledPanelGroup = styled(Group)`
  display: flex;
  height: 100%;
  width: 100%;

  &[data-panel-group-direction='vertical'],
  &[data-orientation='vertical'],
  &[aria-orientation='vertical'] {
    flex-direction: column;
  }
`;

export const StyledSeparator = styled(Separator)`
  position: relative;
  display: flex;
  width: 1px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.border};
  outline: none;
  transition: box-shadow 0.2s;

  &::after {
    content: '';
    position: absolute;
    inset: 0 calc(-1 * ${({ theme }) => theme.spacing[4]}); 
    z-index: 10;
  }

  &:focus-visible {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.ring};
  }

  &[data-panel-group-direction='vertical'],
  &[data-orientation='vertical'],
  &[aria-orientation='vertical'] {
    width: 100%;
    height: 1px;

    &::after {
      inset: calc(-1 * ${({ theme }) => theme.spacing[4]}) 0;
    }

    & > div {
      transform: rotate(90deg);
    }
  }
`;

export const HandleIconWrapper = styled.div`
  z-index: 20;
  display: flex;
  height: 1rem; 
  width: 0.75rem; 
  align-items: center;
  justify-content: center;
  border-radius: 2px; 
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.border};

  & > svg {
    width: 0.625rem; 
    height: 0.625rem;
    color: ${({ theme }) => theme.colors.foreground};
  }
`;
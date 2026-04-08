'use client';

import { Command as CommandPrimitive } from 'cmdk';
import styled from 'styled-components';

export const CommandRoot = styled(CommandPrimitive)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.popover};
  color: ${({ theme }) => theme.colors.popoverForeground};
`;

export const DialogCommandRoot = styled(CommandRoot)`
  
  
  & [cmdk-group-heading] {
    color: ${({ theme }) => theme.colors.mutedForeground};
    padding: 0 ${({ theme }) => theme.spacing[8]};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  & [data-slot='command-input-wrapper'] {
    height: 3rem; 
  }

  & [cmdk-input-wrapper] svg {
    width: 1.25rem; 
    height: 1.25rem;
  }

  & [cmdk-input] {
    height: 3rem; 
  }

  & [cmdk-group] {
    padding: 0 ${({ theme }) => theme.spacing[8]};
  }

  & [cmdk-group]:not([hidden]) ~ [cmdk-group] {
    padding-top: 0;
  }

  & [cmdk-item] {
    padding: ${({ theme }) => theme.spacing[12]} ${({ theme }) => theme.spacing[8]}; 
    
    & svg {
      width: 1.25rem; 
      height: 1.25rem;
    }
  }
`;

export const CommandInputWrapper = styled.div`
  display: flex;
  height: 2.25rem; 
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0 ${({ theme }) => theme.spacing[12]};

  & > svg {
    width: ${({ theme }) => theme.spacing[16]};
    height: ${({ theme }) => theme.spacing[16]};
    flex-shrink: 0;
    opacity: 0.5;
  }
`;

export const CommandInputPrimitive = styled(CommandPrimitive.Input)`
  display: flex;
  height: 2.5rem; 
  width: 100%;
  border-radius: 6px;
  background: transparent;
  padding: ${({ theme }) => theme.spacing[12]} 0;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  border: none;
  outline: none;
  color: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.colors.mutedForeground};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const CommandListRoot = styled(CommandPrimitive.List)`
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-padding-block: ${({ theme }) => theme.spacing[4]}; 
`;

export const CommandEmptyRoot = styled(CommandPrimitive.Empty)`
  padding: ${({ theme }) => theme.spacing[24]} 0;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[14]};
`;

export const CommandGroupRoot = styled(CommandPrimitive.Group)`
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.foreground};

  & [cmdk-group-heading] {
    padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[8]};
    font-size: ${({ theme }) => theme.fontSizes[12]};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.mutedForeground};
  }
`;

export const CommandSeparatorRoot = styled(CommandPrimitive.Separator)`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: 0 -${({ theme }) => theme.spacing[4]}; 
`;

export const CommandItemRoot = styled(CommandPrimitive.Item)`
  position: relative;
  display: flex;
  cursor: default;
  user-select: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  border-radius: 4px; 
  padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[8]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  outline: none;

  
  & svg {
    pointer-events: none;
    flex-shrink: 0;
    width: ${({ theme }) => theme.spacing[16]};
    height: ${({ theme }) => theme.spacing[16]};
  }

  
  & svg:not([class*='text-']) {
    color: ${({ theme }) => theme.colors.mutedForeground};
  }

  
  &[data-selected='true'] {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentForeground};
  }

  
  &[data-disabled='true'] {
    pointer-events: none;
    opacity: 0.5;
  }
`;

export const CommandShortcutRoot = styled.span`
  margin-left: auto;
  font-size: ${({ theme }) => theme.fontSizes[12]};
  letter-spacing: 0.1em; 
  color: ${({ theme }) => theme.colors.mutedForeground};
`;


export const SrOnly = styled.div`
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
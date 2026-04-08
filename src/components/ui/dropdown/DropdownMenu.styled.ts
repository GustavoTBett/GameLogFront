import styled, { keyframes } from 'styled-components'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`

const fadeOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
`

export const Content = styled(DropdownMenuPrimitive.Content)`
  z-index: 50;
  min-width: 8rem;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.popover};
  padding: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.popoverForeground};
  box-shadow: ${({ theme }) => theme.shadows.shadow3};
  transform-origin: var(--radix-dropdown-menu-content-transform-origin);

  &[data-state='open'] {
    animation: ${fadeIn} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  &[data-state='closed'] {
    animation: ${fadeOut} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
`

export const Item = styled(DropdownMenuPrimitive.Item)`
  position: relative;
  display: flex;
  cursor: pointer;
  user-select: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[12]}`};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  outline: none;
  transition: all 0.2s;

  &[data-inset='true'] {
    padding-left: ${({ theme }) => theme.spacing[32]};
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  &[data-highlighted] {
    background-color: ${({ theme }) => theme.colors.accent}; 
    color: ${({ theme }) => theme.colors.accentForeground};
  }

  &[data-variant='destructive'] {
    color: ${({ theme }) => theme.colors.destructive};
    svg {
      color: ${({ theme }) => theme.colors.destructive};
    }
    &[data-highlighted] {
      background-color: ${({ theme }) => theme.colors.border};
    }
  }

  svg {
    width: ${({ theme }) => theme.spacing[16]};
    height: ${({ theme }) => theme.spacing[16]};
    flex-shrink: 0;
    pointer-events: none;
    color: ${({ theme }) => theme.colors.mutedForeground};
  }
`

export const CheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem)`
  position: relative;
  display: flex;
  cursor: pointer;
  user-select: none;
  align-items: center;
  border-radius: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[12]} ${theme.spacing[8]} ${theme.spacing[32]}`};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  outline: none;

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  &[data-highlighted] {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentForeground};
  }
`

export const RadioItem = styled(DropdownMenuPrimitive.RadioItem)`
  position: relative;
  display: flex;
  cursor: pointer;
  user-select: none;
  align-items: center;
  border-radius: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[12]} ${theme.spacing[8]} ${theme.spacing[32]}`};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  outline: none;

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  &[data-highlighted] {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentForeground};
  }
`

export const IndicatorWrapper = styled.span`
  position: absolute;
  left: ${({ theme }) => theme.spacing[8]};
  display: flex;
  height: ${({ theme }) => theme.spacing[16]};
  width: ${({ theme }) => theme.spacing[16]};
  align-items: center;
  justify-content: center;
`

export const Label = styled(DropdownMenuPrimitive.Label)`
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[12]}`};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.mutedForeground};

  &[data-inset='true'] {
    padding-left: ${({ theme }) => theme.spacing[32]};
  }
`

export const Separator = styled(DropdownMenuPrimitive.Separator)`
  margin: ${({ theme }) => `${theme.spacing[4]} -${theme.spacing[4]}`};
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
`

export const Shortcut = styled.span`
  margin-left: auto;
  font-size: ${({ theme }) => theme.fontSizes[12]};
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const SubTrigger = styled(DropdownMenuPrimitive.SubTrigger)`
  position: relative;
  display: flex;
  cursor: pointer;
  user-select: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[12]}`};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  outline: none;

  &[data-inset='true'] {
    padding-left: ${({ theme }) => theme.spacing[32]};
  }

  &[data-state='open'], &[data-highlighted] {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentForeground};
  }

  > svg {
    margin-left: auto;
  }
`
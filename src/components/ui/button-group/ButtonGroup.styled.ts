'use client'

import styled, { css } from 'styled-components'

export type ButtonGroupOrientation = 'horizontal' | 'vertical'

interface StyledGroupProps {
  $orientation?: ButtonGroupOrientation
}

export const Group = styled.div<StyledGroupProps>`
  display: flex;
  width: fit-content;
  align-items: stretch;

  & > * {
    &:focus-visible {
      z-index: 10;
      position: relative;
    }
  }

  & > input { flex: 1; }
  & [data-slot="select-trigger"]:not([class*='w-']) { width: fit-content; }

  &:has(> [data-slot="button-group"]) {
    gap: ${({ theme }) => theme.spacing[8]};
  }

  ${({ $orientation }) =>
    $orientation === 'horizontal' &&
    css`
      flex-direction: row;
      & > *:not(:first-child) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-left: 0;
      }
      & > *:not(:last-child) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    `}

  ${({ $orientation }) =>
    $orientation === 'vertical' &&
    css`
      flex-direction: col-reverse;
      flex-direction: column;
      & > *:not(:first-child) {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-top: 0;
      }
      & > *:not(:last-child) {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    `}
`

export const Text = styled.div`
  background-color: ${({ theme }) => theme.colors.muted};
  color: ${({ theme }) => theme.colors.foreground};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  padding: 0 ${({ theme }) => theme.spacing[16]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);

  & svg {
    pointer-events: none;
    width: 1rem;
    height: 1rem;
  }
`
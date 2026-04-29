'use client';

import styled, { css } from 'styled-components';

export const CalendarRoot = styled.div`
  padding: ${({ theme }) => theme.spacing[12]};
  background-color: ${({ theme }) => theme.colors.background};
  width: fit-content;

  
  --cell-size: 32px;

  
  .rdp-months {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[16]};
    position: relative;

    ${({ theme }) => theme.media.tablet} {
      flex-direction: row;
    }
  }

  .rdp-month {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: ${({ theme }) => theme.spacing[16]};
  }

  .rdp-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing[4]};
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  
  .rdp-button_previous,
  .rdp-button_next {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--cell-size);
    height: var(--cell-size);
    border-radius: 6px;
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.foreground};
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${({ theme }) => theme.colors.accent};
      color: ${({ theme }) => theme.colors.accentForeground};
    }

    &[aria-disabled='true'] {
      opacity: 0.5;
      pointer-events: none;
    }

    & > svg {
      width: ${({ theme }) => theme.spacing[16]};
      height: ${({ theme }) => theme.spacing[16]};
    }
  }

  
  [dir='rtl'] & .rdp-button_next > svg,
  [dir='rtl'] & .rdp-button_previous > svg {
    transform: rotate(180deg);
  }

  .rdp-month_caption {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--cell-size);
    width: 100%;
    padding: 0 var(--cell-size);
  }

  .rdp-caption_label {
    font-size: ${({ theme }) => theme.fontSizes[14]};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    user-select: none;
  }

  
  .rdp-dropdowns {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: var(--cell-size);
    gap: ${({ theme }) => theme.spacing[6]};
    font-size: ${({ theme }) => theme.fontSizes[14]};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  .rdp-dropdown_root {
    position: relative;
    border: 1px solid ${({ theme }) => theme.colors.input};
    border-radius: 6px;
    box-shadow: ${({ theme }) => theme.shadows.shadow1};

    &:focus-within {
      border-color: ${({ theme }) => theme.colors.ring};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.ring}80;
    }
  }

  .rdp-dropdown {
    position: absolute;
    inset: 0;
    opacity: 0;
    width: 100%;
    cursor: pointer;
  }

  
  .rdp-table {
    width: 100%;
    border-collapse: collapse;
  }

  .rdp-weekdays {
    display: flex;
  }

  .rdp-weekday {
    color: ${({ theme }) => theme.colors.mutedForeground};
    border-radius: 6px;
    flex: 1;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    font-size: 0.8rem;
    user-select: none;
    text-align: center;
  }

  .rdp-week {
    display: flex;
    width: 100%;
    margin-top: ${({ theme }) => theme.spacing[8]};
  }

  .rdp-day {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    text-align: center;
    aspect-ratio: 1 / 1;
    user-select: none;
  }
`;

export const WeekNumberInner = styled.div`
  display: flex;
  width: var(--cell-size);
  height: var(--cell-size);
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.mutedForeground};
`;



export interface StyledDayButtonProps {
  $selectedSingle?: boolean;
  $rangeStart?: boolean;
  $rangeEnd?: boolean;
  $rangeMiddle?: boolean;
  $focused?: boolean;
  $disabled?: boolean;
  $outside?: boolean;
  $today?: boolean;
}

export const StyledDayButton = styled.button<StyledDayButtonProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[4]};
  width: 100%;
  min-width: var(--cell-size);
  aspect-ratio: 1 / 1;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  border-radius: 6px;
  cursor: pointer;
  line-height: 1;
  transition: background-color 0.2s, color 0.2s;

  & > span {
    font-size: ${({ theme }) => theme.fontSizes[12]};
    opacity: 0.7;
  }

  
  ${({ $disabled, $outside, theme }) =>
    !$disabled &&
    !$outside &&
    css`
      &:hover {
        background-color: ${theme.colors.accent};
        color: ${theme.colors.accentForeground};
      }
    `}

  ${({ $outside, theme }) =>
    $outside &&
    css`
      color: ${theme.colors.mutedForeground};
    `}

  ${({ $disabled, theme }) =>
    $disabled &&
    css`
      color: ${theme.colors.mutedForeground};
      opacity: 0.5;
      cursor: not-allowed;
    `}

  ${({ $today, theme }) =>
    $today &&
    css`
      background-color: ${theme.colors.accent};
      color: ${theme.colors.accentForeground};
    `}

  
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.ring}80;
    position: relative;
    z-index: 10;
  }

  ${({ $focused, theme }) =>
    $focused &&
    css`
      box-shadow: 0 0 0 3px ${theme.colors.ring}80;
      position: relative;
      z-index: 10;
    `}

  
  ${({ $selectedSingle, theme }) =>
    $selectedSingle &&
    css`
      background-color: ${theme.colors.primary} !important;
      color: ${theme.colors.primaryForeground} !important;
    `}

  
  ${({ $rangeStart, theme }) =>
    $rangeStart &&
    css`
      background-color: ${theme.colors.primary} !important;
      color: ${theme.colors.primaryForeground} !important;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    `}

  ${({ $rangeEnd, theme }) =>
    $rangeEnd &&
    css`
      background-color: ${theme.colors.primary} !important;
      color: ${theme.colors.primaryForeground} !important;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    `}

  ${({ $rangeMiddle, theme }) =>
    $rangeMiddle &&
    css`
      background-color: ${theme.colors.accent} !important;
      color: ${theme.colors.accentForeground} !important;
      border-radius: 0;
    `}
`;
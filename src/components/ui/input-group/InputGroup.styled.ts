'use client';

import styled, { css } from 'styled-components';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { Textarea } from '@/components/ui/textarea/Textarea';

export const InputGroupRoot = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
  transition: color 0.2s, box-shadow 0.2s, border-color 0.2s;
  outline: none;

  
  height: 2.25rem;

  
  &:has(> textarea) {
    height: auto;
  }

  
  &:has(> [data-align='inline-start']) > input {
    padding-left: ${({ theme }) => theme.spacing[8]}; 
  }
  
  &:has(> [data-align='inline-end']) > input {
    padding-right: ${({ theme }) => theme.spacing[8]}; 
  }
  
  &:has(> [data-align='block-start']) {
    height: auto;
    flex-direction: column;
    & > input {
      padding-bottom: ${({ theme }) => theme.spacing[12]}; 
    }
  }
  
  &:has(> [data-align='block-end']) {
    height: auto;
    flex-direction: column;
    & > input {
      padding-top: ${({ theme }) => theme.spacing[12]}; 
    }
  }

  
  &:has([data-slot='input-group-control']:focus-visible) {
    border-color: ${({ theme }) => theme.colors.ring};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.ring}80; 
  }

  
  &:has([data-slot][aria-invalid='true']) {
    border-color: ${({ theme }) => theme.colors.destructive};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.destructive}33; 
  }
`;

export type InputGroupAddonAlign = 'inline-start' | 'inline-end' | 'block-start' | 'block-end';

export const InputGroupAddonRoot = styled.div<{ $align: InputGroupAddonAlign }>`
  display: flex;
  height: auto;
  cursor: text;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[8]};
  padding: ${({ theme }) => theme.spacing[6]} 0; 
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.mutedForeground};
  user-select: none;

  & > svg:not([class*='size-']) {
    width: ${({ theme }) => theme.spacing[16]};
    height: ${({ theme }) => theme.spacing[16]};
  }

  & > kbd {
    border-radius: 3px; 
  }

  [data-disabled='true'] > & {
    opacity: 0.5;
  }

  ${({ theme, $align }) => {
    switch ($align) {
      case 'inline-start':
        return css`
          order: -1;
          padding-left: ${theme.spacing[12]};
          &:has(> button) {
            margin-left: -0.45rem;
          }
          &:has(> kbd) {
            margin-left: -0.35rem;
          }
        `;
      case 'inline-end':
        return css`
          order: 1;
          padding-right: ${theme.spacing[12]};
          &:has(> button) {
            margin-right: -0.4rem;
          }
          &:has(> kbd) {
            margin-right: -0.35rem;
          }
        `;
      case 'block-start':
        return css`
          order: -1;
          width: 100%;
          justify-content: flex-start;
          padding-left: ${theme.spacing[12]};
          padding-right: ${theme.spacing[12]};
          padding-top: ${theme.spacing[12]};

          .border-b & {
            padding-bottom: ${theme.spacing[12]};
          }
          
          [data-slot='input-group']:has(> input) > & {
            padding-top: 0.625rem;
          }
        `;
      case 'block-end':
        return css`
          order: 1;
          width: 100%;
          justify-content: flex-start;
          padding-left: ${theme.spacing[12]};
          padding-right: ${theme.spacing[12]};
          padding-bottom: ${theme.spacing[12]};

          .border-t & {
            padding-top: ${theme.spacing[12]};
          }
          [data-slot='input-group']:has(> input) > & {
            padding-bottom: 0.625rem;
          }
        `;
    }
  }}
`;

export type InputGroupButtonSize = 'xs' | 'sm' | 'icon-xs' | 'icon-sm';


export const InputGroupButtonRoot = styled(Button)<{ $size: InputGroupButtonSize }>`
  box-shadow: none;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  font-size: ${({ theme }) => theme.fontSizes[14]};

  ${({ theme, $size }) => {
    switch ($size) {
      case 'xs':
        return css`
          height: 1.5rem; 
          gap: ${theme.spacing[4]};
          padding: 0 ${theme.spacing[8]};
          border-radius: 3px;
          & > svg:not([class*='size-']) {
            width: 0.875rem; 
            height: 0.875rem;
          }
        `;
      case 'sm':
        return css`
          height: 2rem; 
          padding: 0 0.625rem; 
          gap: ${theme.spacing[6]}; 
          border-radius: 6px;
        `;
      case 'icon-xs':
        return css`
          width: 1.5rem;
          height: 1.5rem;
          padding: 0;
          border-radius: 3px;
        `;
      case 'icon-sm':
        return css`
          width: 2rem;
          height: 2rem;
          padding: 0;
        `;
    }
  }}
`;

export const InputGroupTextRoot = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  color: ${({ theme }) => theme.colors.mutedForeground};

  & svg {
    pointer-events: none;
  }
  
  & svg:not([class*='size-']) {
    width: ${({ theme }) => theme.spacing[16]};
    height: ${({ theme }) => theme.spacing[16]};
  }
`;

export const InputGroupInputRoot = styled(Input)`
  flex: 1;
  border-radius: 0;
  border: 0;
  background-color: transparent;
  box-shadow: none;

  &:focus-visible {
    box-shadow: none;
  }
`;

export const InputGroupTextareaRoot = styled(Textarea)`
  flex: 1;
  resize: none;
  border-radius: 0;
  border: 0;
  background-color: transparent;
  padding-top: ${({ theme }) => theme.spacing[12]};
  padding-bottom: ${({ theme }) => theme.spacing[12]};
  box-shadow: none;

  &:focus-visible {
    box-shadow: none;
  }
`;
'use client';

import styled, { css } from 'styled-components';
import { Label } from '@/components/ui/label/Label';
import { Separator } from '@/components/ui/separator/Separator';

export const FieldSetRoot = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[24]};
  border: none;
  padding: 0;
  margin: 0;

  
  &:has(> [data-slot='checkbox-group']),
  &:has(> [data-slot='radio-group']) {
    gap: ${({ theme }) => theme.spacing[12]};
  }
`;

export type FieldLegendVariant = 'legend' | 'label';

export const FieldLegendRoot = styled.legend<{ $variant?: FieldLegendVariant }>`
  margin-bottom: ${({ theme }) => theme.spacing[12]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  ${({ theme, $variant }) =>
    $variant === 'label'
      ? css`
          font-size: ${theme.fontSizes[14]};
        `
      : css`
          font-size: ${theme.fontSizes[16]};
        `}
`;

export const FieldGroupRoot = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[24]}; 

  &[data-slot='checkbox-group'] {
    gap: ${({ theme }) => theme.spacing[12]};
  }

  & > [data-slot='field-group'] {
    gap: ${({ theme }) => theme.spacing[16]};
  }
`;

export type FieldOrientation = 'vertical' | 'horizontal' | 'responsive';

export const FieldRoot = styled.div<{ $orientation?: FieldOrientation }>`
  display: flex;
  width: 100%;
  gap: ${({ theme }) => theme.spacing[12]};

  &[data-invalid='true'] {
    color: ${({ theme }) => theme.colors.destructive};
  }

  ${({ theme, $orientation }) => {
    const verticalStyles = css`
      flex-direction: column;
      & > * {
        width: 100%;
      }
      & > .sr-only {
        width: auto;
      }
    `;

    const horizontalStyles = css`
      flex-direction: row;
      align-items: center;

      & > [data-slot='field-label'] {
        flex: 1 1 auto;
      }

      &:has(> [data-slot='field-content']) {
        align-items: flex-start;

        & > [role='checkbox'],
        & > [role='radio'] {
          margin-top: 1px;
        }
      }
    `;

    switch ($orientation) {
      case 'horizontal':
        return horizontalStyles;
      case 'responsive':
        return css`
          ${verticalStyles}
          ${theme.media.tablet} {
            ${horizontalStyles}
            & > * {
              width: auto;
            }
          }
        `;
      case 'vertical':
      default:
        return verticalStyles;
    }
  }}
`;

export const FieldContentRoot = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]}; 
  line-height: 1.375; 
`;

export const FieldLabelRoot = styled(Label)`
  display: flex;
  width: fit-content;
  gap: ${({ theme }) => theme.spacing[8]};
  line-height: 1.375;
  transition: opacity 0.2s;

  [data-disabled='true'] > & {
    opacity: 0.5;
  }

  
  &:has(> [data-slot='field']) {
    width: 100%;
    flex-direction: column;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    
    & > *[data-slot='field'] {
      padding: ${({ theme }) => theme.spacing[16]};
    }
  }

  
  &:has([data-state='checked']) {
    background-color: ${({ theme }) => theme.colors.primary}0D; 
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const FieldTitleRoot = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  line-height: 1.375;
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  [data-disabled='true'] > & {
    opacity: 0.5;
  }
`;

export const FieldDescriptionRoot = styled.p`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  line-height: 1.5; 
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  margin: 0;

  
  [data-orientation='horizontal'] > & {
    text-wrap: balance;
  }

  
  &:last-child {
    margin-top: 0;
  }
  &:nth-last-child(2) {
    margin-top: -${({ theme }) => theme.spacing[4]};
  }
  [data-variant='legend'] + & {
    margin-top: -${({ theme }) => theme.spacing[6]};
  }

  
  & > a {
    text-decoration: underline;
    text-underline-offset: 4px;
    transition: color 0.2s;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const FieldSeparatorRoot = styled.div<{ $hasContent: boolean }>`
  position: relative;
  height: 1.25rem; 
  margin: -${({ theme }) => theme.spacing[8]} 0; 
  font-size: ${({ theme }) => theme.fontSizes[14]};

  
  [data-variant='outline'] > & {
    margin-bottom: -${({ theme }) => theme.spacing[8]};
  }
`;

export const FieldSeparatorLine = styled(Separator)`
  position: absolute;
  inset: 0;
  top: 50%;
`;

export const FieldSeparatorContent = styled.span`
  position: relative;
  display: block;
  width: fit-content;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[8]};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

export const FieldErrorRoot = styled.div`
  color: ${({ theme }) => theme.colors.destructive};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

export const FieldErrorList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-left: ${({ theme }) => theme.spacing[16]};
  list-style-type: disc;
`;
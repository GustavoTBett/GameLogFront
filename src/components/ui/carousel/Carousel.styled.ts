'use client';

import styled, { css } from 'styled-components';
import { Button } from '@/components/ui/button/Button';

export type CarouselOrientation = 'horizontal' | 'vertical';

export const CarouselRoot = styled.div`
  position: relative;
`;

export const CarouselViewport = styled.div`
  overflow: hidden;
`;

export const CarouselContainer = styled.div<{ $orientation: CarouselOrientation }>`
  display: flex;

  
  ${({ theme, $orientation }) =>
    $orientation === 'horizontal'
      ? css`
          margin-left: -${theme.spacing[16]};
        `
      : css`
          flex-direction: column;
          margin-top: -${theme.spacing[16]};
        `}
`;

export const CarouselItemRoot = styled.div<{ $orientation: CarouselOrientation }>`
  min-width: 0;
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: 100%;

  
  ${({ theme, $orientation }) =>
    $orientation === 'horizontal'
      ? css`
          padding-left: ${theme.spacing[16]};
        `
      : css`
          padding-top: ${theme.spacing[16]};
        `}
`;


const CarouselNavButtonBase = styled(Button)`
  position: absolute;
  border-radius: 9999px;
  
  
  width: ${({ theme }) => theme.spacing[32]};
  height: ${({ theme }) => theme.spacing[32]};
  padding: 0;
`;

export const CarouselPrevButton = styled(CarouselNavButtonBase)<{ $orientation: CarouselOrientation }>`
  ${({ theme, $orientation }) =>
    $orientation === 'horizontal'
      ? css`
          top: 50%;
          
          left: -${theme.spacing[48]};
          transform: translateY(-50%);
        `
      : css`
          
          top: -${theme.spacing[48]};
          left: 50%;
          transform: translateX(-50%) rotate(90deg);
        `}
`;

export const CarouselNextButton = styled(CarouselNavButtonBase)<{ $orientation: CarouselOrientation }>`
  ${({ theme, $orientation }) =>
    $orientation === 'horizontal'
      ? css`
          top: 50%;
          
          right: -${theme.spacing[48]};
          transform: translateY(-50%);
        `
      : css`
          
          bottom: -${theme.spacing[48]};
          left: 50%;
          transform: translateX(-50%) rotate(90deg);
        `}
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
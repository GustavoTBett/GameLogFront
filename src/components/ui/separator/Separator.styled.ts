'use client';

import * as SeparatorPrimitive from '@radix-ui/react-separator';
import styled, { css } from 'styled-components';

export interface SeparatorRootProps {
  $orientation: 'horizontal' | 'vertical';
}

export const SeparatorRoot = styled(SeparatorPrimitive.Root)<SeparatorRootProps>`
  background-color: ${({ theme }) => theme.colors.border};
  flex-shrink: 0;

  ${({ $orientation }) =>
    $orientation === 'horizontal'
      ? css`
          height: 1px;
          width: 100%;
        `
      : css`
          height: 100%;
          width: 1px;
        `}
`;
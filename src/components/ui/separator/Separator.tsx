'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as S from './Separator.styled';

function Separator({
  orientation = 'horizontal',
  decorative = true,
  ...props
}: Omit<React.ComponentProps<typeof SeparatorPrimitive.Root>, 'className'>) {
  return (
    <S.SeparatorRoot
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      $orientation={orientation as 'horizontal' | 'vertical'}
      {...props}
    />
  );
}

export { Separator };
'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as S from './Label.styled';


function Label({ ...props }: Omit<React.ComponentProps<typeof LabelPrimitive.Root>, 'className'>) {
  return (
    <S.LabelRoot
      data-slot="label"
      {...props}
    />
  );
}

export { Label };
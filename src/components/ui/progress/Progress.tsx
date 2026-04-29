'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as S from './Progress.styled';

function Progress({
  value,
  ...props
}: Omit<React.ComponentProps<typeof ProgressPrimitive.Root>, 'className'>) {
  return (
    <S.ProgressRoot data-slot="progress" {...props}>
      <S.ProgressIndicator
        data-slot="progress-indicator"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </S.ProgressRoot>
  );
}

export { Progress };
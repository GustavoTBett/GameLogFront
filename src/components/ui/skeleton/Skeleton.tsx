'use client';

import * as React from 'react';
import * as S from './Skeleton.styled';

function Skeleton({ ...props }: Omit<React.ComponentProps<'div'>, 'className'>) {
  return (
    <S.SkeletonRoot 
      data-slot="skeleton" 
      {...props} 
    />
  );
}

export { Skeleton };
'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import * as S from './Badge.styled';

export interface BadgeProps extends React.ComponentProps<'span'> {
  variant?: S.BadgeVariant;
  asChild?: boolean;
}

function Badge({
  className,
  variant = 'default',
  asChild = false,
  ...props
}: BadgeProps) {
  
  const Comp = asChild ? Slot : 'span';

  return (
    <S.BadgeRoot
      as={Comp}
      $variant={variant}
      data-slot="badge"
      className={className}
      {...props}
    />
  );
}

export { Badge };
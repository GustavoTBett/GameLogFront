'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import * as S from './Button.styled';

export interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: S.ButtonVariant;
  size?: S.ButtonSize;
  asChild?: boolean;
}

function Button({
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <S.ButtonRoot
      as={Comp}
      $variant={variant}
      $size={size}
      data-slot="button"
      {...props}
    />
  );
}

export { Button };
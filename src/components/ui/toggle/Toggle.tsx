'use client';

import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as S from './Toggle.styled';

export interface ToggleProps extends Omit<React.ComponentProps<typeof TogglePrimitive.Root>, 'className'> {
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
}

function Toggle({ variant = 'default', size = 'default', ...props }: ToggleProps) {
  return (
    <S.ToggleRoot
      data-slot="toggle"
      $variant={variant}
      $size={size}
      {...props}
    />
  );
}

export { Toggle };
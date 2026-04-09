'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import * as S from './Button.styled';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: S.ButtonVariant;
  size?: S.ButtonSize;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <S.ButtonRoot
        as={Comp as React.ElementType}
        $variant={variant}
        $size={size}
        data-slot="button"
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
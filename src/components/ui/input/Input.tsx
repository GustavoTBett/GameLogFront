'use client';

import * as React from 'react';
import * as S from './Input.styled';

function Input({ type, ...props }: Omit<React.ComponentProps<'input'>, 'className'>) {
  return (
    <S.InputRoot
      type={type}
      data-slot="input"
      {...props}
    />
  );
}

export { Input };
'use client';
import * as React from 'react';
import * as S from './Textarea.styled';

function Textarea({ ...props }: Omit<React.ComponentProps<'textarea'>, 'className'>) {
  return (
    <S.TextareaRoot
      data-slot="textarea"
      {...props}
    />
  );
}

export { Textarea };
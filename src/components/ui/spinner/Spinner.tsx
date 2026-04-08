'use client';
import * as React from 'react';
import * as S from './Spinner.styled';

function Spinner({ ...props }: Omit<React.ComponentProps<'svg'>, 'className'>) {
  return (
    <S.StyledSpinner
      role="status"
      aria-label="Loading"
      {...props}
    />
  );
}

export { Spinner };
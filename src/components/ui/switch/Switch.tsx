'use client';
import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as S from './Switch.styled';

function Switch({ ...props }: Omit<React.ComponentProps<typeof SwitchPrimitive.Root>, 'className'>) {
  return (
    <S.SwitchRoot data-slot="switch" {...props}>
      <S.SwitchThumb data-slot="switch-thumb" />
    </S.SwitchRoot>
  );
}

export { Switch };
'use client';

import * as React from 'react';
import * as S from './Kbd.styled';

function Kbd({ ...props }: Omit<React.ComponentProps<'kbd'>, 'className'>) {
  return <S.KbdRoot data-slot="kbd" {...props} />;
}

function KbdGroup({ ...props }: Omit<React.ComponentProps<'div'>, 'className'>) {
  return <S.KbdGroupRoot data-slot="kbd-group" {...props} />;
}

export { Kbd, KbdGroup };
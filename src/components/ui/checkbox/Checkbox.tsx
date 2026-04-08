'use client';

import * as React from 'react';
import { CheckIcon } from 'lucide-react';
import * as S from './Checkbox.styled';

function Checkbox({
  ...props
}: React.ComponentProps<typeof S.CheckboxRoot>) {
  return (
    <S.CheckboxRoot data-slot="checkbox" {...props}>
      <S.CheckboxIndicator data-slot="checkbox-indicator">
        <CheckIcon />
      </S.CheckboxIndicator>
    </S.CheckboxRoot>
  );
}

export { Checkbox };
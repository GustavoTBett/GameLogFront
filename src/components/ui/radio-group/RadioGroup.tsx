'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { CircleIcon } from 'lucide-react';
import * as S from './RadioGroup.styled';

function RadioGroup({
  ...props
}: Omit<React.ComponentProps<typeof RadioGroupPrimitive.Root>, 'className'>) {
  return (
    <S.RadioGroupRoot
      data-slot="radio-group"
      {...props}
    />
  );
}

function RadioGroupItem({
  ...props
}: Omit<React.ComponentProps<typeof RadioGroupPrimitive.Item>, 'className'>) {
  return (
    <S.RadioGroupItemRoot
      data-slot="radio-group-item"
      {...props}
    >
      <S.RadioGroupIndicator data-slot="radio-group-indicator">
        <CircleIcon />
      </S.RadioGroupIndicator>
    </S.RadioGroupItemRoot>
  );
}

export { RadioGroup, RadioGroupItem };
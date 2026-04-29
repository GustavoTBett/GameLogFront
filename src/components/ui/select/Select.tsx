'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import * as S from './Select.styled';

function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

export interface SelectTriggerProps extends Omit<React.ComponentProps<typeof SelectPrimitive.Trigger>, 'className'> {
  size?: 'sm' | 'default';
}

function SelectTrigger({ size = 'default', children, ...props }: SelectTriggerProps) {
  return (
    <S.SelectTriggerRoot
      data-slot="select-trigger"
      data-size={size}
      $size={size}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon style={{ opacity: 0.5 }} />
      </SelectPrimitive.Icon>
    </S.SelectTriggerRoot>
  );
}

function SelectContent({
  children,
  position = 'popper',
  ...props
}: Omit<React.ComponentProps<typeof SelectPrimitive.Content>, 'className'>) {
  return (
    <SelectPrimitive.Portal>
      <S.SelectContentRoot
        data-slot="select-content"
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <S.SelectViewport $isPopper={position === 'popper'}>
          {children}
        </S.SelectViewport>
        <SelectScrollDownButton />
      </S.SelectContentRoot>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ ...props }: Omit<React.ComponentProps<typeof SelectPrimitive.Label>, 'className'>) {
  return <S.SelectLabelRoot data-slot="select-label" {...props} />;
}

function SelectItem({ children, ...props }: Omit<React.ComponentProps<typeof SelectPrimitive.Item>, 'className'>) {
  return (
    <S.SelectItemRoot data-slot="select-item" {...props}>
      <S.ItemIndicatorWrapper>
        <SelectPrimitive.ItemIndicator>
          <CheckIcon style={{ width: '1rem', height: '1rem' }} />
        </SelectPrimitive.ItemIndicator>
      </S.ItemIndicatorWrapper>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </S.SelectItemRoot>
  );
}

function SelectSeparator({ ...props }: Omit<React.ComponentProps<typeof SelectPrimitive.Separator>, 'className'>) {
  return <S.SelectSeparatorRoot data-slot="select-separator" {...props} />;
}

function SelectScrollUpButton({ ...props }: Omit<React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>, 'className'>) {
  return (
    <S.SelectScrollUpButtonRoot data-slot="select-scroll-up-button" {...props}>
      <ChevronUpIcon />
    </S.SelectScrollUpButtonRoot>
  );
}

function SelectScrollDownButton({ ...props }: Omit<React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>, 'className'>) {
  return (
    <S.SelectScrollDownButtonRoot data-slot="select-scroll-down-button" {...props}>
      <ChevronDownIcon />
    </S.SelectScrollDownButtonRoot>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
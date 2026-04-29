'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button/Button';
import * as S from './InputGroup.styled';

function InputGroup({ ...props }: React.ComponentProps<'div'>) {
  return (
    <S.InputGroupRoot
      role="group"
      data-slot="input-group"
      {...props}
    />
  );
}

export interface InputGroupAddonProps extends React.ComponentProps<'div'> {
  align?: S.InputGroupAddonAlign;
}

function InputGroupAddon({ align = 'inline-start', ...props }: InputGroupAddonProps) {
  return (
    <S.InputGroupAddonRoot
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      $align={align}
      onClick={(e) => {
        
        if ((e.target as HTMLElement).closest('button')) {
          return;
        }
        e.currentTarget.parentElement?.querySelector('input')?.focus();
      }}
      {...props}
    />
  );
}



export interface InputGroupButtonProps extends Omit<React.ComponentProps<typeof Button>, 'size'> {
  size?: S.InputGroupButtonSize;
}

function InputGroupButton({
  type = 'button',
  variant = 'ghost',
  size = 'xs',
  ...props
}: InputGroupButtonProps) {
  return (
    <S.InputGroupButtonRoot
      type={type}
      data-size={size}
      variant={variant}
      $size={size}
      {...props}
    />
  );
}

function InputGroupText({ ...props }: React.ComponentProps<'span'>) {
  return <S.InputGroupTextRoot {...props} />;
}

function InputGroupInput({ ...props }: React.ComponentProps<'input'>) {
  return <S.InputGroupInputRoot data-slot="input-group-control" {...props} />;
}

function InputGroupTextarea({ ...props }: React.ComponentProps<'textarea'>) {
  return <S.InputGroupTextareaRoot data-slot="input-group-control" {...props} />;
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
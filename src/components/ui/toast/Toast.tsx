'use client';
import * as React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { X } from 'lucide-react';
import * as S from './Toast.styled';

const ToastProvider = ToastPrimitives.Provider;

function ToastViewport({ ...props }: React.ComponentProps<typeof ToastPrimitives.Viewport>) {
  return <S.ToastViewportRoot {...props} />;
}

function Toast({
  variant = 'default',
  ...props
}: React.ComponentProps<typeof ToastPrimitives.Root> & { variant?: 'default' | 'destructive' }) {
  return <S.ToastRootStyled $variant={variant} data-variant={variant} {...props} />;
}

function ToastAction({ ...props }: React.ComponentProps<typeof ToastPrimitives.Action>) {
  return <S.ToastActionStyled {...props} />;
}

function ToastClose({ ...props }: React.ComponentProps<typeof ToastPrimitives.Close>) {
  return (
    <S.ToastCloseStyled {...props}>
      <X size={16} />
    </S.ToastCloseStyled>
  );
}

function ToastTitle({ ...props }: React.ComponentProps<typeof ToastPrimitives.Title>) {
  return <S.ToastTitleStyled {...props} />;
}

function ToastDescription({ ...props }: React.ComponentProps<typeof ToastPrimitives.Description>) {
  return <S.ToastDescriptionStyled {...props} />;
}

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
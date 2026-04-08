'use client';

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as S from './Avatar.styled';

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <S.AvatarRoot
      data-slot="avatar"
      className={className}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <S.AvatarImage
      data-slot="avatar-image"
      className={className}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <S.AvatarFallback
      data-slot="avatar-fallback"
      className={className}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
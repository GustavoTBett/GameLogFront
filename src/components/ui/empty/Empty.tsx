'use client';

import * as React from 'react';
import * as S from './Empty.styled';

function Empty({ ...props }: React.ComponentProps<'div'>) {
  return <S.EmptyRoot data-slot="empty" {...props} />;
}

function EmptyHeader({ ...props }: React.ComponentProps<'div'>) {
  return <S.EmptyHeaderRoot data-slot="empty-header" {...props} />;
}

export interface EmptyMediaProps extends React.ComponentProps<'div'> {
  variant?: S.EmptyMediaVariant;
}

function EmptyMedia({ variant = 'default', ...props }: EmptyMediaProps) {
  return (
    <S.EmptyMediaRoot
      data-slot="empty-icon"
      data-variant={variant}
      $variant={variant}
      {...props}
    />
  );
}

function EmptyTitle({ ...props }: React.ComponentProps<'div'>) {
  return <S.EmptyTitleRoot data-slot="empty-title" {...props} />;
}

function EmptyDescription({ ...props }: React.ComponentProps<'p'>) {
  return <S.EmptyDescriptionRoot data-slot="empty-description" {...props} />;
}

function EmptyContent({ ...props }: React.ComponentProps<'div'>) {
  return <S.EmptyContentRoot data-slot="empty-content" {...props} />;
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
};
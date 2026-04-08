'use client';

import * as React from 'react';
import * as S from './Card.styled';

function Card({ ...props }: React.ComponentProps<'div'>) {
  return <S.CardRoot data-slot="card" {...props} />;
}

function CardHeader({ ...props }: React.ComponentProps<'div'>) {
  return <S.CardHeader data-slot="card-header" {...props} />;
}

function CardTitle({ ...props }: React.ComponentProps<'div'>) {
  return <S.CardTitle data-slot="card-title" {...props} />;
}

function CardDescription({ ...props }: React.ComponentProps<'div'>) {
  return <S.CardDescription data-slot="card-description" {...props} />;
}

function CardAction({ ...props }: React.ComponentProps<'div'>) {
  return <S.CardAction data-slot="card-action" {...props} />;
}

function CardContent({ ...props }: React.ComponentProps<'div'>) {
  return <S.CardContent data-slot="card-content" {...props} />;
}

function CardFooter({ ...props }: React.ComponentProps<'div'>) {
  return <S.CardFooter data-slot="card-footer" {...props} />;
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import * as S from './Breadcrumb.styled';

function Breadcrumb({ ...props }: React.ComponentProps<'nav'>) {
  return <S.BreadcrumbRoot aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({ ...props }: React.ComponentProps<'ol'>) {
  return <S.BreadcrumbList data-slot="breadcrumb-list" {...props} />;
}

function BreadcrumbItem({ ...props }: React.ComponentProps<'li'>) {
  return <S.BreadcrumbItem data-slot="breadcrumb-item" {...props} />;
}

export interface BreadcrumbLinkProps extends React.ComponentProps<'a'> {
  asChild?: boolean;
}

function BreadcrumbLink({
  asChild,
  ...props
}: BreadcrumbLinkProps) {
  const Comp = asChild ? Slot : 'a';

  return <S.BreadcrumbLink as={Comp} data-slot="breadcrumb-link" {...props} />;
}

function BreadcrumbPage({ ...props }: React.ComponentProps<'span'>) {
  return (
    <S.BreadcrumbPage
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      {...props}
    />
  );
}

function BreadcrumbSeparator({
  children,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <S.BreadcrumbSeparator
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      {...props}
    >
      {children ?? <ChevronRight />}
    </S.BreadcrumbSeparator>
  );
}

function BreadcrumbEllipsis({ ...props }: React.ComponentProps<'span'>) {
  return (
    <S.BreadcrumbEllipsis
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      {...props}
    >
      <MoreHorizontal aria-hidden="true" />
      <S.SrOnly>More</S.SrOnly>
    </S.BreadcrumbEllipsis>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
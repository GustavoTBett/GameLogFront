'use client';

import * as React from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button/Button';
import * as S from './Pagination.styled';

function Pagination({ ...props }: Omit<React.ComponentProps<'nav'>, 'className'>) {
  return (
    <S.PaginationRoot
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      {...props}
    />
  );
}

function PaginationContent({ ...props }: Omit<React.ComponentProps<'ul'>, 'className'>) {
  return <S.PaginationContentRoot data-slot="pagination-content" {...props} />;
}

function PaginationItem({ ...props }: Omit<React.ComponentProps<'li'>, 'className'>) {
  return <S.PaginationItemRoot data-slot="pagination-item" {...props} />;
}

export type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  Omit<React.ComponentProps<'a'>, 'className'>;

function PaginationLink({
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      variant={isActive ? 'outline' : 'ghost'}
      size={size}
      {...(props as React.ComponentProps<typeof Button>)}
    />
  );
}

function PaginationPrevious({ ...props }: PaginationLinkProps) {
  return (
    <S.PaginationDirectionButton
      aria-label="Go to previous page"
      size="default"
      variant="ghost"
      {...(props as React.ComponentProps<typeof S.PaginationDirectionButton>)}
    >
      <ChevronLeftIcon />
      <S.ResponsiveText>Previous</S.ResponsiveText>
    </S.PaginationDirectionButton>
  );
}

function PaginationNext({ ...props }: PaginationLinkProps) {
  return (
    <S.PaginationDirectionButton
      aria-label="Go to next page"
      size="default"
      variant="ghost"
      {...(props as React.ComponentProps<typeof S.PaginationDirectionButton>)}
    >
      <S.ResponsiveText>Next</S.ResponsiveText>
      <ChevronRightIcon />
    </S.PaginationDirectionButton>
  );
}

function PaginationEllipsis({ ...props }: Omit<React.ComponentProps<'span'>, 'className'>) {
  return (
    <S.PaginationEllipsisRoot
      aria-hidden
      data-slot="pagination-ellipsis"
      {...props}
    >
      <MoreHorizontalIcon />
      <S.SrOnly>More pages</S.SrOnly>
    </S.PaginationEllipsisRoot>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
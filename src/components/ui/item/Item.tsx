'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import * as S from './Item.styled';

function ItemGroup({ ...props }: React.ComponentProps<'div'>) {
  return <S.ItemGroupRoot role="list" data-slot="item-group" {...props} />;
}

function ItemSeparator({ ...props }: React.ComponentProps<typeof S.ItemSeparatorRoot>) {
  return (
    <S.ItemSeparatorRoot
      data-slot="item-separator"
      orientation="horizontal"
      {...props}
    />
  );
}

export interface ItemProps extends React.ComponentProps<'div'> {
  variant?: S.ItemVariant;
  size?: S.ItemSize;
  asChild?: boolean;
}

function Item({
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: ItemProps) {
  const Comp = asChild ? Slot : 'div';
  
  return (
    <S.ItemRoot
      as={Comp}
      data-slot="item"
      data-variant={variant}
      data-size={size}
      $variant={variant}
      $size={size}
      {...props}
    />
  );
}

export interface ItemMediaProps extends React.ComponentProps<'div'> {
  variant?: S.ItemMediaVariant;
}

function ItemMedia({ variant = 'default', ...props }: ItemMediaProps) {
  return (
    <S.ItemMediaRoot
      data-slot="item-media"
      data-variant={variant}
      $variant={variant}
      {...props}
    />
  );
}

function ItemContent({ ...props }: React.ComponentProps<'div'>) {
  return <S.ItemContentRoot data-slot="item-content" {...props} />;
}

function ItemTitle({ ...props }: React.ComponentProps<'div'>) {
  return <S.ItemTitleRoot data-slot="item-title" {...props} />;
}

function ItemDescription({ ...props }: React.ComponentProps<'p'>) {
  return <S.ItemDescriptionRoot data-slot="item-description" {...props} />;
}

function ItemActions({ ...props }: React.ComponentProps<'div'>) {
  return <S.ItemActionsRoot data-slot="item-actions" {...props} />;
}

function ItemHeader({ ...props }: React.ComponentProps<'div'>) {
  return <S.ItemHeaderRoot data-slot="item-header" {...props} />;
}

function ItemFooter({ ...props }: React.ComponentProps<'div'>) {
  return <S.ItemFooterRoot data-slot="item-footer" {...props} />;
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
};
'use client';

import * as React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';
import * as S from './ContextMenu.styled';

function ContextMenu({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {
  return <S.ContextMenuRoot data-slot="context-menu" {...props} />;
}

function ContextMenuTrigger({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
  return <S.ContextMenuTrigger data-slot="context-menu-trigger" {...props} />;
}

function ContextMenuGroup({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {
  return <S.ContextMenuGroup data-slot="context-menu-group" {...props} />;
}

function ContextMenuPortal({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {
  return <S.ContextMenuPortal data-slot="context-menu-portal" {...props} />;
}

function ContextMenuSub({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {
  return <S.ContextMenuSub data-slot="context-menu-sub" {...props} />;
}

function ContextMenuRadioGroup({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {
  return <S.ContextMenuRadioGroup data-slot="context-menu-radio-group" {...props} />;
}

export interface ContextMenuSubTriggerProps extends React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> {
  inset?: boolean;
}

function ContextMenuSubTrigger({ inset, children, ...props }: ContextMenuSubTriggerProps) {
  return (
    <S.ContextMenuSubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      {...props}
    >
      {children}
      <ChevronRightIcon />
    </S.ContextMenuSubTrigger>
  );
}

function ContextMenuSubContent({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
  return <S.ContextMenuSubContent data-slot="context-menu-sub-content" {...props} />;
}

function ContextMenuContent({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <S.ContextMenuContent data-slot="context-menu-content" {...props} />
    </ContextMenuPrimitive.Portal>
  );
}

export interface ContextMenuItemProps extends React.ComponentProps<typeof ContextMenuPrimitive.Item> {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}

function ContextMenuItem({ inset, variant = 'default', ...props }: ContextMenuItemProps) {
  return (
    <S.ContextMenuItem
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      {...props}
    />
  );
}

function ContextMenuCheckboxItem({
  children,
  checked,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
  return (
    <S.ContextMenuCheckboxItem
      data-slot="context-menu-checkbox-item"
      checked={checked}
      {...props}
    >
      <S.ItemIndicatorWrapper>
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon />
        </ContextMenuPrimitive.ItemIndicator>
      </S.ItemIndicatorWrapper>
      {children}
    </S.ContextMenuCheckboxItem>
  );
}

function ContextMenuRadioItem({
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
  return (
    <S.ContextMenuRadioItem data-slot="context-menu-radio-item" {...props}>
      <S.ItemIndicatorWrapper>
        <ContextMenuPrimitive.ItemIndicator>
          {}
          <CircleIcon style={{ fill: 'currentColor', width: '0.5rem', height: '0.5rem' }} />
        </ContextMenuPrimitive.ItemIndicator>
      </S.ItemIndicatorWrapper>
      {children}
    </S.ContextMenuRadioItem>
  );
}

export interface ContextMenuLabelProps extends React.ComponentProps<typeof ContextMenuPrimitive.Label> {
  inset?: boolean;
}

function ContextMenuLabel({ inset, ...props }: ContextMenuLabelProps) {
  return (
    <S.ContextMenuLabel
      data-slot="context-menu-label"
      data-inset={inset}
      {...props}
    />
  );
}

function ContextMenuSeparator({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return <S.ContextMenuSeparator data-slot="context-menu-separator" {...props} />;
}

function ContextMenuShortcut({ ...props }: React.ComponentProps<'span'>) {
  return <S.ContextMenuShortcut data-slot="context-menu-shortcut" {...props} />;
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
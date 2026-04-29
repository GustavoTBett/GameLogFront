'use client';

import * as React from 'react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';
import * as S from './Menubar.styled';

function Menubar({ ...props }: Omit<React.ComponentProps<typeof MenubarPrimitive.Root>, 'className'>) {
  return <S.MenubarRoot data-slot="menubar" {...props} />;
}

function MenubarMenu({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <S.MenubarMenu data-slot="menubar-menu" {...props} />;
}

function MenubarGroup({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <S.MenubarGroup data-slot="menubar-group" {...props} />;
}

function MenubarPortal({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <S.MenubarPortal data-slot="menubar-portal" {...props} />;
}

function MenubarRadioGroup({ ...props }: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return <S.MenubarRadioGroup data-slot="menubar-radio-group" {...props} />;
}

function MenubarTrigger({ ...props }: Omit<React.ComponentProps<typeof MenubarPrimitive.Trigger>, 'className'>) {
  return <S.MenubarTrigger data-slot="menubar-trigger" {...props} />;
}

export type MenubarContentProps = Omit<React.ComponentProps<typeof MenubarPrimitive.Content>, 'className'>;

function MenubarContent({
  align = 'start',
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: MenubarContentProps) {
  return (
    <MenubarPortal>
      <S.MenubarContent
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        {...props}
      />
    </MenubarPortal>
  );
}

export interface MenubarItemProps extends Omit<React.ComponentProps<typeof MenubarPrimitive.Item>, 'className'> {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}

function MenubarItem({ inset, variant = 'default', ...props }: MenubarItemProps) {
  return (
    <S.MenubarItem
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      {...props}
    />
  );
}

function MenubarCheckboxItem({
  children,
  checked,
  ...props
}: Omit<React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>, 'className'>) {
  return (
    <S.MenubarCheckboxItem
      data-slot="menubar-checkbox-item"
      checked={checked}
      {...props}
    >
      <S.ItemIndicatorWrapper>
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon />
        </MenubarPrimitive.ItemIndicator>
      </S.ItemIndicatorWrapper>
      {children}
    </S.MenubarCheckboxItem>
  );
}

function MenubarRadioItem({
  children,
  ...props
}: Omit<React.ComponentProps<typeof MenubarPrimitive.RadioItem>, 'className'>) {
  return (
    <S.MenubarRadioItem data-slot="menubar-radio-item" {...props}>
      <S.ItemIndicatorWrapper>
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon style={{ fill: 'currentColor', width: '0.5rem', height: '0.5rem' }} />
        </MenubarPrimitive.ItemIndicator>
      </S.ItemIndicatorWrapper>
      {children}
    </S.MenubarRadioItem>
  );
}

export interface MenubarLabelProps extends Omit<React.ComponentProps<typeof MenubarPrimitive.Label>, 'className'> {
  inset?: boolean;
}

function MenubarLabel({ inset, ...props }: MenubarLabelProps) {
  return (
    <S.MenubarLabel
      data-slot="menubar-label"
      data-inset={inset}
      {...props}
    />
  );
}

function MenubarSeparator({ ...props }: Omit<React.ComponentProps<typeof MenubarPrimitive.Separator>, 'className'>) {
  return <S.MenubarSeparator data-slot="menubar-separator" {...props} />;
}

function MenubarShortcut({ ...props }: Omit<React.ComponentProps<'span'>, 'className'>) {
  return <S.MenubarShortcut data-slot="menubar-shortcut" {...props} />;
}

function MenubarSub({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <S.MenubarSub data-slot="menubar-sub" {...props} />;
}

export interface MenubarSubTriggerProps extends Omit<React.ComponentProps<typeof MenubarPrimitive.SubTrigger>, 'className'> {
  inset?: boolean;
}

function MenubarSubTrigger({ inset, children, ...props }: MenubarSubTriggerProps) {
  return (
    <S.MenubarSubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      {...props}
    >
      {children}
      <ChevronRightIcon />
    </S.MenubarSubTrigger>
  );
}

function MenubarSubContent({ ...props }: Omit<React.ComponentProps<typeof MenubarPrimitive.SubContent>, 'className'>) {
  return <S.MenubarSubContent data-slot="menubar-sub-content" {...props} />;
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
};
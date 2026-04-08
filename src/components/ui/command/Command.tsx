'use client';

import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { SearchIcon } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog/Dialog';

import * as S from './Command.styled';

function Command({ ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return <S.CommandRoot data-slot="command" {...props} />;
}

export interface CommandDialogProps extends React.ComponentProps<typeof Dialog> {
  title?: string;
  description?: string;
  showCloseButton?: boolean;
}

function CommandDialog({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  showCloseButton = true,
  ...props
}: CommandDialogProps) {
  return (
    <Dialog {...props}>
      {}
      <S.SrOnly as={DialogHeader}>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </S.SrOnly>
      <DialogContent showCloseButton={showCloseButton}>
        {}
        <S.DialogCommandRoot>
          {children}
        </S.DialogCommandRoot>
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({ ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <S.CommandInputWrapper data-slot="command-input-wrapper">
      <SearchIcon />
      <S.CommandInputPrimitive data-slot="command-input" {...props} />
    </S.CommandInputWrapper>
  );
}

function CommandList({ ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return <S.CommandListRoot data-slot="command-list" {...props} />;
}

function CommandEmpty({ ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return <S.CommandEmptyRoot data-slot="command-empty" {...props} />;
}

function CommandGroup({ ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return <S.CommandGroupRoot data-slot="command-group" {...props} />;
}

function CommandSeparator({ ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return <S.CommandSeparatorRoot data-slot="command-separator" {...props} />;
}

function CommandItem({ ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return <S.CommandItemRoot data-slot="command-item" {...props} />;
}

function CommandShortcut({ ...props }: React.ComponentProps<'span'>) {
  return <S.CommandShortcutRoot data-slot="command-shortcut" {...props} />;
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
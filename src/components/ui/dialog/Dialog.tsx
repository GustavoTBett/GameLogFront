'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import * as S from './Dialog.styled';

function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <S.DialogRoot data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <S.DialogTrigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <S.DialogPortal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <S.DialogClose data-slot="dialog-close" {...props} />;
}

function DialogOverlay({ ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return <S.DialogOverlayRoot data-slot="dialog-overlay" {...props} />;
}

export interface DialogContentProps extends React.ComponentProps<typeof DialogPrimitive.Content> {
  showCloseButton?: boolean;
}

function DialogContent({ children, showCloseButton = true, ...props }: DialogContentProps) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <S.DialogContentRoot data-slot="dialog-content" {...props}>
        {children}
        {showCloseButton && (
          <S.DialogCloseButton data-slot="dialog-close">
            <XIcon />
            <S.SrOnly>Close</S.SrOnly>
          </S.DialogCloseButton>
        )}
      </S.DialogContentRoot>
    </DialogPortal>
  );
}

function DialogHeader({ ...props }: React.ComponentProps<'div'>) {
  return <S.DialogHeaderRoot data-slot="dialog-header" {...props} />;
}

function DialogFooter({ ...props }: React.ComponentProps<'div'>) {
  return <S.DialogFooterRoot data-slot="dialog-footer" {...props} />;
}

function DialogTitle({ ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return <S.DialogTitleRoot data-slot="dialog-title" {...props} />;
}

function DialogDescription({ ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return <S.DialogDescriptionRoot data-slot="dialog-description" {...props} />;
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
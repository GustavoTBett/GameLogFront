'use client';

import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import * as S from './Sheet.styled';

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({ ...props }: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({ ...props }: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({ ...props }: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({ ...props }: Omit<React.ComponentProps<typeof SheetPrimitive.Overlay>, 'className'>) {
  return <S.SheetOverlayRoot data-slot="sheet-overlay" {...props} />;
}

export interface SheetContentProps extends Omit<React.ComponentProps<typeof SheetPrimitive.Content>, 'className'> {
  side?: S.SheetSide;
}

function SheetContent({ children, side = 'right', ...props }: SheetContentProps) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <S.SheetContentRoot data-slot="sheet-content" $side={side} {...props}>
        {children}
        <S.SheetCloseButton>
          <XIcon />
          <span className="sr-only">Close</span>
        </S.SheetCloseButton>
      </S.SheetContentRoot>
    </SheetPortal>
  );
}

function SheetHeader({ ...props }: React.ComponentProps<'div'>) {
  return <S.SheetHeaderRoot data-slot="sheet-header" {...props} />;
}

function SheetFooter({ ...props }: React.ComponentProps<'div'>) {
  return <S.SheetFooterRoot data-slot="sheet-footer" {...props} />;
}

function SheetTitle({ ...props }: Omit<React.ComponentProps<typeof SheetPrimitive.Title>, 'className'>) {
  return <S.SheetTitleRoot data-slot="sheet-title" {...props} />;
}

function SheetDescription({ ...props }: Omit<React.ComponentProps<typeof SheetPrimitive.Description>, 'className'>) {
  return <S.SheetDescriptionRoot data-slot="sheet-description" {...props} />;
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
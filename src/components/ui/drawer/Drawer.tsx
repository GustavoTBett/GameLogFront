'use client';

import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import * as S from './Drawer.styled';

function Drawer({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <S.DrawerRoot data-slot="drawer" {...props} />;
}

function DrawerTrigger({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <S.DrawerTrigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <S.DrawerPortal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <S.DrawerClose data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return <S.DrawerOverlayRoot data-slot="drawer-overlay" {...props} />;
}

function DrawerContent({ children, ...props }: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <S.DrawerContentRoot data-slot="drawer-content" {...props}>
        <S.DrawerHandle />
        {children}
      </S.DrawerContentRoot>
    </DrawerPortal>
  );
}

function DrawerHeader({ ...props }: React.ComponentProps<'div'>) {
  return <S.DrawerHeaderRoot data-slot="drawer-header" {...props} />;
}

function DrawerFooter({ ...props }: React.ComponentProps<'div'>) {
  return <S.DrawerFooterRoot data-slot="drawer-footer" {...props} />;
}

function DrawerTitle({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return <S.DrawerTitleRoot data-slot="drawer-title" {...props} />;
}

function DrawerDescription({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return <S.DrawerDescriptionRoot data-slot="drawer-description" {...props} />;
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
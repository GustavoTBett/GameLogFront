'use client';

import * as React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ChevronDownIcon } from 'lucide-react';
import * as S from './NavigationMenu.styled';


export const navigationMenuTriggerStyle = S.navigationMenuTriggerStyles;

export interface NavigationMenuProps extends Omit<React.ComponentProps<typeof NavigationMenuPrimitive.Root>, 'className'> {
  viewport?: boolean;
}

function NavigationMenu({ children, viewport = true, ...props }: NavigationMenuProps) {
  return (
    <S.NavigationMenuRoot
      data-slot="navigation-menu"
      data-viewport={viewport}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </S.NavigationMenuRoot>
  );
}

function NavigationMenuList({ ...props }: Omit<React.ComponentProps<typeof NavigationMenuPrimitive.List>, 'className'>) {
  return <S.NavigationMenuListRoot data-slot="navigation-menu-list" {...props} />;
}

function NavigationMenuItem({ ...props }: Omit<React.ComponentProps<typeof NavigationMenuPrimitive.Item>, 'className'>) {
  return <S.NavigationMenuItemRoot data-slot="navigation-menu-item" {...props} />;
}

function NavigationMenuTrigger({ children, ...props }: Omit<React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>, 'className'>) {
  return (
    <S.NavigationMenuTriggerRoot data-slot="navigation-menu-trigger" {...props}>
      {children}
      <ChevronDownIcon aria-hidden="true" />
    </S.NavigationMenuTriggerRoot>
  );
}

function NavigationMenuContent({ ...props }: Omit<React.ComponentProps<typeof NavigationMenuPrimitive.Content>, 'className'>) {
  return <S.NavigationMenuContentRoot data-slot="navigation-menu-content" {...props} />;
}

function NavigationMenuViewport({ ...props }: Omit<React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>, 'className'>) {
  return (
    <S.ViewportPositioner>
      <S.NavigationMenuViewportRoot data-slot="navigation-menu-viewport" {...props} />
    </S.ViewportPositioner>
  );
}

function NavigationMenuLink({ ...props }: Omit<React.ComponentProps<typeof NavigationMenuPrimitive.Link>, 'className'>) {
  return <S.NavigationMenuLinkRoot data-slot="navigation-menu-link" {...props} />;
}

function NavigationMenuIndicator({ ...props }: Omit<React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>, 'className'>) {
  return (
    <S.NavigationMenuIndicatorRoot data-slot="navigation-menu-indicator" {...props}>
      <S.IndicatorArrow />
    </S.NavigationMenuIndicatorRoot>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
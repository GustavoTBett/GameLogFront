'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { PanelLeftIcon } from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { Separator } from '@/components/ui/separator/Separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet/Sheet';
import { Skeleton } from '@/components/ui/skeleton/Skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip/Tooltip';

import * as S from './Sidebar.styled';

const SIDEBAR_COOKIE_NAME = 'sidebar_state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

type SidebarContextProps = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) throw new Error('useSidebar must be used within a SidebarProvider.');
  return context;
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  style,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);

  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((v: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value;
      if (setOpenProp) setOpenProp(openState);
      else _setOpen(openState);
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((o) => !o) : setOpen((o) => !o);
  }, [isMobile, setOpen]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  const state = open ? 'expanded' : 'collapsed';

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({ state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar }),
    [state, open, setOpen, isMobile, openMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <S.SidebarWrapper data-slot="sidebar-wrapper" style={style} {...props}>
          {children}
        </S.SidebarWrapper>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

function Sidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  children,
  ...props
}: React.ComponentProps<'div'> & {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === 'none') {
    return (
      <S.SidebarRoot data-slot="sidebar" style={{ display: 'flex', flexDirection: 'column', width: S.VARS.width }} {...props}>
        {children}
      </S.SidebarRoot>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          side={side}
          style={{ width: S.VARS.widthMobile, padding: 0 }}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div style={{ display: 'flex', height: '100%', width: '100%', flexDirection: 'column' }}>{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <S.SidebarRoot
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      <S.SidebarGap data-slot="sidebar-gap" />
      <S.SidebarContainer data-slot="sidebar-container" {...props}>
        <S.SidebarInner data-sidebar="sidebar" data-slot="sidebar-inner">
          {children}
        </S.SidebarInner>
      </S.SidebarContainer>
    </S.SidebarRoot>
  );
}

function SidebarTrigger({ onClick, ...props }: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();
  return (
    <S.SidebarTriggerRoot
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      onClick={(e) => { onClick?.(e); toggleSidebar(); }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </S.SidebarTriggerRoot>
  );
}

function SidebarRail({ ...props }: React.ComponentProps<'button'>) {
  const { toggleSidebar } = useSidebar();
  return (
    <S.SidebarRailRoot
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      {...props}
    />
  );
}

function SidebarInset({ ...props }: React.ComponentProps<'main'>) {
  return <S.SidebarInsetRoot data-slot="sidebar-inset" {...props} />;
}

function SidebarInput({ ...props }: React.ComponentProps<typeof Input>) {
  return <S.SidebarInputRoot data-slot="sidebar-input" data-sidebar="input" {...props} />;
}

function SidebarSeparator({ ...props }: React.ComponentProps<typeof Separator>) {
  return <S.SidebarSeparatorRoot data-slot="sidebar-separator" data-sidebar="separator" {...props} />;
}

function SidebarHeader({ ...props }: React.ComponentProps<'div'>) {
  return <S.SidebarHeaderRoot data-slot="sidebar-header" data-sidebar="header" {...props} />;
}

function SidebarFooter({ ...props }: React.ComponentProps<'div'>) {
  return <S.SidebarFooterRoot data-slot="sidebar-footer" data-sidebar="footer" {...props} />;
}

function SidebarContent({ ...props }: React.ComponentProps<'div'>) {
  return <S.SidebarContentRoot data-slot="sidebar-content" data-sidebar="content" {...props} />;
}

function SidebarGroup({ ...props }: React.ComponentProps<'div'>) {
  return <S.SidebarGroupRoot data-slot="sidebar-group" data-sidebar="group" {...props} />;
}

function SidebarGroupLabel({ asChild = false, ...props }: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div';
  return <S.SidebarGroupLabelRoot as={Comp} data-slot="sidebar-group-label" data-sidebar="group-label" {...props} />;
}

function SidebarGroupAction({ asChild = false, ...props }: React.ComponentProps<'button'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button';
  return <S.SidebarGroupActionRoot as={Comp} data-slot="sidebar-group-action" data-sidebar="group-action" {...props} />;
}

function SidebarGroupContent({ ...props }: React.ComponentProps<'div'>) {
  return <S.SidebarGroupContentRoot data-slot="sidebar-group-content" data-sidebar="group-content" {...props} />;
}

function SidebarMenu({ ...props }: React.ComponentProps<'ul'>) {
  return <S.SidebarMenuRoot data-slot="sidebar-menu" data-sidebar="menu" {...props} />;
}

function SidebarMenuItem({ ...props }: React.ComponentProps<'li'>) {
  return <S.SidebarMenuItemRoot data-slot="sidebar-menu-item" data-sidebar="menu-item" {...props} />;
}

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = 'default',
  size = 'default',
  tooltip,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  isActive?: boolean;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
}) {
  const Comp = asChild ? Slot : 'button';
  const { isMobile, state } = useSidebar();

  const button = (
    <S.SidebarMenuButtonRoot
      as={Comp}
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      $variant={variant}
      $size={size}
      $isActive={isActive}
      {...props}
    />
  );

  if (!tooltip) return button;

  const tooltipProps = typeof tooltip === 'string' ? { children: tooltip } : tooltip;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right" align="center" hidden={state !== 'collapsed' || isMobile} {...tooltipProps} />
    </Tooltip>
  );
}

function SidebarMenuAction({
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<'button'> & { asChild?: boolean; showOnHover?: boolean }) {
  const Comp = asChild ? Slot : 'button';
  return (
    <S.SidebarMenuActionRoot
      as={Comp}
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      $showOnHover={showOnHover}
      {...props}
    />
  );
}

function SidebarMenuBadge({ ...props }: React.ComponentProps<'div'>) {
  return <S.SidebarMenuBadgeRoot data-slot="sidebar-menu-badge" data-sidebar="menu-badge" {...props} />;
}

function SidebarMenuSkeleton({ showIcon = false, ...props }: React.ComponentProps<'div'> & { showIcon?: boolean }) {
  
  const [width, setWidth] = React.useState('70%');

  React.useEffect(() => {
    
    const randomWidth = `${Math.floor(Math.random() * 40) + 50}%`;
    setWidth(randomWidth);
  }, []);

  return (
    <S.SidebarMenuSkeletonRoot data-slot="sidebar-menu-skeleton" data-sidebar="menu-skeleton" {...props}>
      {showIcon && (
        <Skeleton 
          style={{ width: '1rem', height: '1rem', borderRadius: '6px' }} 
          data-sidebar="menu-skeleton-icon" 
        />
      )}
      <Skeleton 
        style={{ height: '1rem', flex: 1, maxWidth: width }} 
        data-sidebar="menu-skeleton-text" 
      />
    </S.SidebarMenuSkeletonRoot>
  );
}

function SidebarMenuSub({ ...props }: React.ComponentProps<'ul'>) {
  return <S.SidebarMenuSubRoot data-slot="sidebar-menu-sub" data-sidebar="menu-sub" {...props} />;
}

function SidebarMenuSubItem({ ...props }: React.ComponentProps<'li'>) {
  return <S.SidebarMenuSubItemRoot data-slot="sidebar-menu-sub-item" data-sidebar="menu-sub-item" {...props} />;
}

function SidebarMenuSubButton({
  asChild = false,
  size = 'md',
  isActive = false,
  ...props
}: React.ComponentProps<'a'> & { asChild?: boolean; size?: 'sm' | 'md'; isActive?: boolean }) {
  const Comp = asChild ? Slot : 'a';
  return (
    <S.SidebarMenuSubButtonRoot
      as={Comp}
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      $size={size}
      $isActive={isActive}
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
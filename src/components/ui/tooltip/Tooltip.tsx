'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as S from './Tooltip.styled';

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  sideOffset = 4,
  children,
  ...props
}: Omit<React.ComponentProps<typeof TooltipPrimitive.Content>, 'className'>) {
  return (
    <TooltipPrimitive.Portal>
      <S.TooltipContentRoot
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        {...props}
      >
        {children}
        <S.TooltipArrowStyled data-slot="tooltip-arrow" />
      </S.TooltipContentRoot>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
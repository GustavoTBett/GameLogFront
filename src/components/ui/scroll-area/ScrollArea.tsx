'use client';

import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as S from './ScrollArea.styled';

function ScrollArea({
  children,
  ...props
}: Omit<React.ComponentProps<typeof ScrollAreaPrimitive.Root>, 'className'>) {
  return (
    <S.ScrollAreaRoot data-slot="scroll-area" {...props}>
      <S.ScrollAreaViewport data-slot="scroll-area-viewport">
        {children}
      </S.ScrollAreaViewport>
      <ScrollBar />
      <S.ScrollAreaCorner />
    </S.ScrollAreaRoot>
  );
}

function ScrollBar({
  orientation = 'vertical',
  ...props
}: Omit<React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>, 'className'>) {
  return (
    <S.ScrollBarRoot
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      $orientation={orientation}
      {...props}
    >
      <S.ScrollAreaThumb data-slot="scroll-area-thumb" />
    </S.ScrollBarRoot>
  );
}

export { ScrollArea, ScrollBar };
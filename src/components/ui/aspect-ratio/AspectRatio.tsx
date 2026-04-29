'use client';

import * as React from 'react';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import * as S from './AspectRatio.styled';

function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <S.AspectRatioRoot data-slot="aspect-ratio" {...props} />;
}

export { AspectRatio };
'use client';

import * as React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import * as S from './ToggleGroup.styled';

type ToggleGroupVariantContext = {
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
};

const ToggleGroupContext = React.createContext<ToggleGroupVariantContext>({
  size: 'default',
  variant: 'default',
});

function ToggleGroup({
  variant = 'default',
  size = 'default',
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> & ToggleGroupVariantContext) {
  return (
    <S.ToggleGroupRoot
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </S.ToggleGroupRoot>
  );
}

function ToggleGroupItem({
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & ToggleGroupVariantContext) {
  const context = React.useContext(ToggleGroupContext);

  const finalVariant = context.variant || variant || 'default';
  const finalSize = context.size || size || 'default';

  return (
    <S.ToggleGroupItemRoot
      data-slot="toggle-group-item"
      $variant={finalVariant}
      $size={finalSize}
      {...props}
    >
      {children}
    </S.ToggleGroupItemRoot>
  );
}

export { ToggleGroup, ToggleGroupItem };
'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { Separator } from '../separator/Separator'
import * as S from './ButtonGroup.styled'

export interface ButtonGroupProps extends React.ComponentProps<'div'> {
  orientation?: S.ButtonGroupOrientation
}

function ButtonGroup({
  orientation = 'horizontal',
  ...props
}: ButtonGroupProps) {
  return (
    <S.Group
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      $orientation={orientation}
      {...props}
    />
  )
}

function ButtonGroupText({
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : S.Text
  return <Comp {...props} />
}

function ButtonGroupSeparator({
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      {...props}
    />
  )
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText }
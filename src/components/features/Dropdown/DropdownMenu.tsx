'use client'

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'

import * as S from './DropdownMenu.styled'

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuGroup = DropdownMenuPrimitive.Group
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal
export const DropdownMenuSub = DropdownMenuPrimitive.Sub
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

export function DropdownMenuContent({ sideOffset = 4, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <S.Content sideOffset={sideOffset} {...props} />
    </DropdownMenuPrimitive.Portal>
  )
}

export function DropdownMenuItem({
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: 'default' | 'destructive'
}) {
  return <S.Item data-inset={inset} data-variant={variant} {...props} />
}

export function DropdownMenuCheckboxItem({
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <S.CheckboxItem checked={checked} {...props}>
      <S.IndicatorWrapper>
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon size={16} />
        </DropdownMenuPrimitive.ItemIndicator>
      </S.IndicatorWrapper>
      {children}
    </S.CheckboxItem>
  )
}

export function DropdownMenuRadioItem({
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <S.RadioItem {...props}>
      <S.IndicatorWrapper>
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon size={8} fill="currentColor" />
        </DropdownMenuPrimitive.ItemIndicator>
      </S.IndicatorWrapper>
      {children}
    </S.RadioItem>
  )
}

export function DropdownMenuLabel({
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return <S.Label data-inset={inset} {...props} />
}

export function DropdownMenuSeparator(props: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return <S.Separator {...props} />
}

export function DropdownMenuShortcut(props: React.ComponentProps<'span'>) {
  return <S.Shortcut {...props} />
}

export function DropdownMenuSubTrigger({
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <S.SubTrigger data-inset={inset} {...props}>
      {children}
      <ChevronRightIcon size={16} />
    </S.SubTrigger>
  )
}

export function DropdownMenuSubContent(props: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return <S.Content {...props} />
}
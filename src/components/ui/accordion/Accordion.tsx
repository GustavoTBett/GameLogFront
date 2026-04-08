'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';
import * as S from './Accordion.styled';

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <S.AccordionRoot {...props} />;
}

function AccordionItem({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <S.AccordionItem {...props} />;
}

function AccordionTrigger({
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <S.AccordionHeader>
      <S.AccordionTrigger {...props}>
        {children}
        <ChevronDownIcon aria-hidden="true" />
      </S.AccordionTrigger>
    </S.AccordionHeader>
  );
}

function AccordionContent({
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <S.AccordionContent {...props}>
      <S.ContentInner>{children}</S.ContentInner>
    </S.AccordionContent>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
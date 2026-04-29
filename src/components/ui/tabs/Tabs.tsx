'use client';
import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as S from './Tabs.styled';

function Tabs({ ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <S.TabsRoot data-slot="tabs" {...props} />;
}

function TabsList({ ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return <S.TabsListRoot data-slot="tabs-list" {...props} />;
}

function TabsTrigger({ ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return <S.TabsTriggerRoot data-slot="tabs-trigger" {...props} />;
}

function TabsContent({ ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <S.TabsContentRoot data-slot="tabs-content" {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
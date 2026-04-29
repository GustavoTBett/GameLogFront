'use client';

import * as React from 'react';
import { GripVerticalIcon } from 'lucide-react';
import { Panel, Separator, GroupProps, PanelProps } from 'react-resizable-panels';
import * as S from './Resizable.styled';

export interface ResizablePanelGroupProps extends GroupProps {
  direction?: 'horizontal' | 'vertical';
}

function ResizablePanelGroup({ direction, orientation, ...props }: ResizablePanelGroupProps) {
  return (
    <S.StyledPanelGroup
      data-slot="resizable-panel-group"
      orientation={orientation || direction || 'horizontal'}
      {...props}
    />
  );
}

function ResizablePanel(props: PanelProps) {
  return <Panel data-slot="resizable-panel" {...props} />;
}

export interface ResizableHandleProps extends React.ComponentProps<typeof Separator> {
  withHandle?: boolean;
}

function ResizableHandle({ withHandle, ...props }: ResizableHandleProps) {
  return (
    <S.StyledSeparator
      data-slot="resizable-handle"
      {...props}
    >
      {withHandle && (
        <S.HandleIconWrapper>
          <GripVerticalIcon />
        </S.HandleIconWrapper>
      )}
    </S.StyledSeparator>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
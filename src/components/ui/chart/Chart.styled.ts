'use client';

import styled, { css } from 'styled-components';

export const ChartContainerRoot = styled.div`
  display: flex;
  aspect-ratio: 16 / 9;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes[12]};
  
  .recharts-cartesian-axis-tick text {
    fill: ${({ theme }) => theme.colors.mutedForeground};
  }
  
  
  .recharts-cartesian-grid line[stroke='#ccc'] {
    stroke: ${({ theme }) => theme.colors.border};
    opacity: 0.5;
  }
  
  
  .recharts-curve.recharts-tooltip-cursor {
    stroke: ${({ theme }) => theme.colors.border};
  }
  .recharts-rectangle.recharts-tooltip-cursor {
    fill: ${({ theme }) => theme.colors.muted};
  }
  
  
  .recharts-polar-grid line[stroke='#ccc'] {
    stroke: ${({ theme }) => theme.colors.border};
  }
  .recharts-radial-bar-background-sector {
    fill: ${({ theme }) => theme.colors.muted};
  }
  
  
  .recharts-reference-line line[stroke='#ccc'] {
    stroke: ${({ theme }) => theme.colors.border};
  }
  
  
  .recharts-dot[stroke='#fff'],
  .recharts-sector[stroke='#fff'] {
    stroke: transparent;
  }
  
  .recharts-layer,
  .recharts-sector,
  .recharts-surface {
    outline: none;
  }
`;

export const TooltipWrapper = styled.div`
  display: grid;
  align-items: start;
  min-width: 8rem;
  gap: ${({ theme }) => theme.spacing[6]}; 
  border-radius: 8px; 
  
  
  padding: ${({ theme }) => theme.spacing[6]} 0.625rem; 
  font-size: ${({ theme }) => theme.fontSizes[12]};
  
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.shadow3}; 
`;

export const TooltipLabelWrapper = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const TooltipItemsGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[6]};
`;

export const TooltipItemRow = styled.div<{ $indicator: 'line' | 'dot' | 'dashed' }>`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: ${({ $indicator }) => ($indicator === 'dot' ? 'center' : 'stretch')};
  gap: ${({ theme }) => theme.spacing[8]};

  
  & > svg {
    color: ${({ theme }) => theme.colors.mutedForeground};
    width: 0.625rem; 
    height: 0.625rem;
  }
`;

export const TooltipIndicator = styled.div<{ 
  $indicator: 'line' | 'dot' | 'dashed', 
  $nestLabel: boolean,
  $color: string 
}>`
  flex-shrink: 0;
  border-radius: 2px;
  background-color: ${({ $color }) => $color};
  border-color: ${({ $color }) => $color};

  ${({ $indicator, $nestLabel }) => {
    switch ($indicator) {
      case 'dot':
        return css`
          width: 0.625rem;
          height: 0.625rem;
        `;
      case 'line':
        return css`
          width: 0.25rem; 
        `;
      case 'dashed':
        return css`
          width: 0;
          border-width: 1.5px;
          border-style: dashed;
          background-color: transparent;
          margin: ${$nestLabel ? '0.125rem 0' : '0'};
        `;
      default:
        return '';
    }
  }}
`;

export const TooltipItemContent = styled.div<{ $nestLabel: boolean }>`
  display: flex;
  flex: 1;
  justify-content: space-between;
  line-height: 1; 
  align-items: ${({ $nestLabel }) => ($nestLabel ? 'flex-end' : 'center')};
`;

export const TooltipItemTextGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[6]};

  & > span {
    color: ${({ theme }) => theme.colors.mutedForeground};
  }
`;

export const TooltipItemValue = styled.span`
  color: ${({ theme }) => theme.colors.foreground};
  font-family: monospace; 
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-variant-numeric: tabular-nums;
`;

export const LegendWrapper = styled.div<{ $verticalAlign: 'top' | 'bottom' | 'middle' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[16]};

  
  ${({ theme, $verticalAlign }) =>
    $verticalAlign === 'top'
      ? css`
          padding-bottom: ${theme.spacing[12]}; 
        `
      : css`
          padding-top: ${theme.spacing[12]}; 
        `}
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]}; 
  
  & > svg {
    color: ${({ theme }) => theme.colors.mutedForeground};
    width: 0.75rem; 
    height: 0.75rem;
  }
`;

export const LegendIconBox = styled.div<{ $color: string }>`
  width: 0.5rem; 
  height: 0.5rem;
  flex-shrink: 0;
  border-radius: 2px;
  background-color: ${({ $color }) => $color};
`;
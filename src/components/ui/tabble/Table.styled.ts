'use client';
import styled from 'styled-components';

export const TableContainer = styled.div`
  position: relative;
  width: 100%;
  overflow-x: auto;
`;

export const TableRoot = styled.table`
  width: 100%;
  caption-side: bottom;
  font-size: ${({ theme }) => theme.fontSizes[14]};
`;

export const TableHeaderRoot = styled.thead`
  & tr {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const TableBodyRoot = styled.tbody`
  & tr:last-child {
    border-0: none;
  }
`;

export const TableFooterRoot = styled.tfoot`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.muted}80;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  & > tr:last-child {
    border-bottom: none;
  }
`;

export const TableRowRoot = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.muted}80;
  }

  &[data-state='selected'] {
    background-color: ${({ theme }) => theme.colors.muted};
  }
`;

export const TableHeadRoot = styled.th`
  height: 2.5rem;
  padding: 0 ${({ theme }) => theme.spacing[8]};
  text-align: left;
  vertical-align: middle;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.foreground};
  white-space: nowrap;

  &:has([role='checkbox']) {
    padding-right: 0;
  }

  & > [role='checkbox'] {
    transform: translateY(2px);
  }
`;

export const TableCellRoot = styled.td`
  padding: ${({ theme }) => theme.spacing[8]};
  vertical-align: middle;
  white-space: nowrap;

  &:has([role='checkbox']) {
    padding-right: 0;
  }

  & > [role='checkbox'] {
    transform: translateY(2px);
  }
`;

export const TableCaptionRoot = styled.caption`
  margin-top: ${({ theme }) => theme.spacing[16]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;
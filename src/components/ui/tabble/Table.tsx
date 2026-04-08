'use client';
import * as React from 'react';
import * as S from './Table.styled';

function Table({ ...props }: React.ComponentProps<'table'>) {
  return (
    <S.TableContainer data-slot="table-container">
      <S.TableRoot data-slot="table" {...props} />
    </S.TableContainer>
  );
}

function TableHeader({ ...props }: React.ComponentProps<'thead'>) {
  return <S.TableHeaderRoot data-slot="table-header" {...props} />;
}

function TableBody({ ...props }: React.ComponentProps<'tbody'>) {
  return <S.TableBodyRoot data-slot="table-body" {...props} />;
}

function TableFooter({ ...props }: React.ComponentProps<'tfoot'>) {
  return <S.TableFooterRoot data-slot="table-footer" {...props} />;
}

function TableRow({ ...props }: React.ComponentProps<'tr'>) {
  return <S.TableRowRoot data-slot="table-row" {...props} />;
}

function TableHead({ ...props }: React.ComponentProps<'th'>) {
  return <S.TableHeadRoot data-slot="table-head" {...props} />;
}

function TableCell({ ...props }: React.ComponentProps<'td'>) {
  return <S.TableCellRoot data-slot="table-cell" {...props} />;
}

function TableCaption({ ...props }: React.ComponentProps<'caption'>) {
  return <S.TableCaptionRoot data-slot="table-caption" {...props} />;
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
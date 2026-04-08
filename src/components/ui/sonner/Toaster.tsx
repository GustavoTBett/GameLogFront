'use client';

import * as React from 'react';
import { ToasterProps } from 'sonner';
import { useTheme } from '@/lib/ThemeProvider';
import * as S from './Toaster.styled';

function Toaster({ ...props }: ToasterProps) {
  
  const { themeName } = useTheme();

  return (
    <S.StyledToaster
      theme={themeName}
      className="toaster group"
      
      {...props}
    />
  );
}

export { Toaster };
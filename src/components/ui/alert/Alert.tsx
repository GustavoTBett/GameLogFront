'use client';

import * as React from 'react';
import * as S from './Alert.styled';


export interface AlertProps extends React.ComponentProps<'div'> {
  variant?: S.AlertVariant;
}

function Alert({ className, variant = 'default', ...props }: AlertProps) {
  return (
    <S.AlertRoot
      $variant={variant}
      className={className}
      data-slot="alert"
      role="alert"
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <S.AlertTitle className={className} data-slot="alert-title" {...props} />;
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <S.AlertDescription
      className={className}
      data-slot="alert-description"
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
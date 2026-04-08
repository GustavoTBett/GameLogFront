'use client';

import * as React from 'react';
import { useMemo } from 'react';
import { Label } from '@/components/ui/label';
import * as S from './Field.styled';

function FieldSet({ ...props }: React.ComponentProps<'fieldset'>) {
  return <S.FieldSetRoot data-slot="field-set" {...props} />;
}

export interface FieldLegendProps extends React.ComponentProps<'legend'> {
  variant?: S.FieldLegendVariant;
}

function FieldLegend({ variant = 'legend', ...props }: FieldLegendProps) {
  return (
    <S.FieldLegendRoot
      data-slot="field-legend"
      data-variant={variant}
      $variant={variant}
      {...props}
    />
  );
}

function FieldGroup({ ...props }: React.ComponentProps<'div'>) {
  return <S.FieldGroupRoot data-slot="field-group" {...props} />;
}

export interface FieldProps extends React.ComponentProps<'div'> {
  orientation?: S.FieldOrientation;
}

function Field({ orientation = 'vertical', ...props }: FieldProps) {
  return (
    <S.FieldRoot
      role="group"
      data-slot="field"
      data-orientation={orientation}
      $orientation={orientation}
      {...props}
    />
  );
}

function FieldContent({ ...props }: React.ComponentProps<'div'>) {
  return <S.FieldContentRoot data-slot="field-content" {...props} />;
}

function FieldLabel({ ...props }: React.ComponentProps<typeof Label>) {
  return <S.FieldLabelRoot data-slot="field-label" {...props} />;
}

function FieldTitle({ ...props }: React.ComponentProps<'div'>) {
  return <S.FieldTitleRoot data-slot="field-label" {...props} />;
}

function FieldDescription({ ...props }: React.ComponentProps<'p'>) {
  return <S.FieldDescriptionRoot data-slot="field-description" {...props} />;
}

export interface FieldSeparatorProps extends React.ComponentProps<'div'> {
  children?: React.ReactNode;
}

function FieldSeparator({ children, ...props }: FieldSeparatorProps) {
  return (
    <S.FieldSeparatorRoot data-slot="field-separator" $hasContent={!!children} {...props}>
      <S.FieldSeparatorLine />
      {children && (
        <S.FieldSeparatorContent data-slot="field-separator-content">
          {children}
        </S.FieldSeparatorContent>
      )}
    </S.FieldSeparatorRoot>
  );
}

export interface FieldErrorProps extends React.ComponentProps<'div'> {
  errors?: Array<{ message?: string } | undefined>;
}

function FieldError({ children, errors, ...props }: FieldErrorProps) {
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors || errors.length === 0) {
      return null;
    }

    if (errors.length === 1 && errors[0]?.message) {
      return errors[0].message;
    }

    return (
      <S.FieldErrorList>
        {errors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </S.FieldErrorList>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }

  return (
    <S.FieldErrorRoot role="alert" data-slot="field-error" {...props}>
      {content}
    </S.FieldErrorRoot>
  );
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
};
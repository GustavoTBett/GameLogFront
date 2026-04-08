'use client';
import styled from 'styled-components';

export const TextareaRoot = styled.textarea`
  display: flex;
  field-sizing: content;
  min-height: 4rem;
  width: 100%;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: transparent;
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[12]}`};
  font-size: ${({ theme }) => theme.fontSizes[16]};
  color: ${({ theme }) => theme.colors.foreground};
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  resize: vertical;

  ${({ theme }) => theme.title === 'dark' && `
    background-color: ${theme.colors.input}4D;
  `}

  &::placeholder {
    color: ${({ theme }) => theme.colors.mutedForeground};
  }

  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.ring};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.ring}80;
  }

  &[aria-invalid='true'] {
    border-color: ${({ theme }) => theme.colors.destructive};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.destructive}33;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fontSizes[14]};
  }
`;
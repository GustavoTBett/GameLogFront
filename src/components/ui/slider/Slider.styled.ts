'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import styled from 'styled-components'

export const SliderRoot = styled(SliderPrimitive.Root)`
  position: relative;
  display: flex;
  width: 100%;
  touch-action: none;
  align-items: center;
  user-select: none;

  &[data-disabled] {
    opacity: 0.5;
  }

  &[data-orientation='vertical'] {
    flex-direction: column;
    width: auto;
    height: 100%;
    min-height: 11rem; 
  }
`

export const SliderTrack = styled(SliderPrimitive.Track)`
  position: relative;
  background-color: ${({ theme }) => theme.colors.muted};
  flex-grow: 1;
  overflow: hidden;
  border-radius: 9999px;

  &[data-orientation='horizontal'] {
    height: 0.375rem; 
    width: 100%;
  }

  &[data-orientation='vertical'] {
    width: 0.375rem; 
    height: 100%;
  }
`

export const SliderRange = styled(SliderPrimitive.Range)`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.primary};

  &[data-orientation='horizontal'] {
    height: 100%;
  }

  &[data-orientation='vertical'] {
    width: 100%;
  }
`

export const SliderThumb = styled(SliderPrimitive.Thumb)`
  display: block;
  width: 1rem; 
  height: 1rem;
  flex-shrink: 0;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: #ffffff; 
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
  transition: box-shadow 0.2s;
  outline: none;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.ring}80;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`
'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import * as S from './Slider.styled'

function Slider({
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: Omit<React.ComponentProps<typeof SliderPrimitive.Root>, 'className'>) {
  
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  )

  return (
    <S.SliderRoot
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      {...props}
    >
      <S.SliderTrack data-slot="slider-track">
        <S.SliderRange data-slot="slider-range" />
      </S.SliderTrack>
      {_values.map((_, index) => (
        <S.SliderThumb key={index} data-slot="slider-thumb" />
      ))}
    </S.SliderRoot>
  )
}

export { Slider }
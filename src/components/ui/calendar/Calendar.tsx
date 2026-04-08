'use client';

import * as React from 'react';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { DayButton, DayPicker } from 'react-day-picker';
import * as S from './Calendar.styled';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  showOutsideDays = true,
  captionLayout = 'label',
  formatters,
  components,
  ...props
}: CalendarProps) {
  return (
    <S.CalendarRoot>
      <DayPicker
        showOutsideDays={showOutsideDays}
        captionLayout={captionLayout}
        formatters={{
          formatMonthDropdown: (date) =>
            date.toLocaleString('default', { month: 'short' }),
          ...formatters,
        }}
        components={{
          Root: ({ rootRef, ...rootProps }) => (
            <div data-slot="calendar" ref={rootRef} {...rootProps} />
          ),
          Chevron: ({ orientation, ...chevronProps }) => {
            if (orientation === 'left') {
              return <ChevronLeftIcon {...chevronProps} />;
            }
            if (orientation === 'right') {
              return <ChevronRightIcon {...chevronProps} />;
            }
            return <ChevronDownIcon {...chevronProps} />;
          },
          DayButton: CalendarDayButton,
          WeekNumber: ({ children, ...weekProps }) => (
            <td {...weekProps}>
              <S.WeekNumberInner>{children}</S.WeekNumberInner>
            </td>
          ),
          ...components,
        }}
        {...props}
      />
    </S.CalendarRoot>
  );
}

function CalendarDayButton({
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <S.StyledDayButton
      ref={ref}
      data-day={day.date.toLocaleDateString()}
      $selectedSingle={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      $rangeStart={modifiers.range_start}
      $rangeEnd={modifiers.range_end}
      $rangeMiddle={modifiers.range_middle}
      $focused={modifiers.focused}
      $disabled={modifiers.disabled}
      $outside={modifiers.outside}
      $today={modifiers.today}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
import React, {forwardRef} from 'react';

import {ThemeProvider} from '@mui/material';
import FlexxIcon from '@components/FlexxIcon/FlexxIcon';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {calendarPickerTheme} from '@core/theme/overrides/calendar-picker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {
  DateCalendar,
  DateCalendarProps,
} from '@mui/x-date-pickers/DateCalendar';

interface AdvanceDateCalendarProps extends DateCalendarProps {
  fullWidth?: boolean;
}

const AdvanceDateCalendar = forwardRef<
  HTMLDivElement,
  AdvanceDateCalendarProps
>(({...props}, ref) => {
  return (
    <ThemeProvider theme={calendarPickerTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          ref={ref}
          {...props}
          slots={{
            leftArrowIcon: () => (
              <FlexxIcon icon='fluent--chevron-left-16-regular' />
            ),
            rightArrowIcon: () => (
              <FlexxIcon icon='fluent--chevron-right-16-regular' />
            ),
            switchViewIcon: () => (
              <FlexxIcon icon='fluent--chevron-down-16-regular' />
            ),
            ...props.slots,
          }}
          sx={{
            ...props.sx,
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
});

export default AdvanceDateCalendar;

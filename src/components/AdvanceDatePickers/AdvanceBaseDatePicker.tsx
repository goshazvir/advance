import React, {forwardRef} from 'react';

import FlexxIcon from '@components/FlexxIcon/FlexxIcon';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {calendarPickerTheme} from '@core/theme/overrides/calendar-picker';
import {DatePicker, DatePickerProps} from '@mui/x-date-pickers/DatePicker';
import {FormControl, Stack, ThemeProvider, Typography} from '@mui/material';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

interface AdvanceBaseDatePickerProps extends DatePickerProps {
  fullWidth?: boolean;
  maxWidth?: string;
  required?: boolean;
}

const AdvanceBaseDatePicker = forwardRef<
  HTMLDivElement,
  AdvanceBaseDatePickerProps
>(({fullWidth = false, maxWidth, label, required, ...props}, ref) => {
  const formattedLabel = required ? `${label} *` : label;

  return (
    <Stack>
      <Typography
        variant='subtitle1'
        color='text.secondary'
        paddingLeft={'0.875rem'}
      >
        {formattedLabel}
      </Typography>
      <ThemeProvider theme={calendarPickerTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <FormControl sx={{width: fullWidth ? '100%' : '12rem', maxWidth}}>
            <DatePicker
              ref={ref}
              {...props}
              label={undefined}
              slotProps={{
                textField: {
                  InputLabelProps: {shrink: true},
                  ...props.slotProps?.textField,
                },
                ...props.slotProps,
              }}
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
          </FormControl>
        </LocalizationProvider>
      </ThemeProvider>
    </Stack>
  );
});

export default AdvanceBaseDatePicker;

import {deepmerge} from '@mui/utils';
import datePicker from './date-picker';
import {createTheme} from '@mui/material/styles';

export const calendarPickerTheme = createTheme(
  deepmerge(createTheme({components: datePicker}), {
    typography: {
      fontFamily: 'Inter, sans-serif',
    },
    components: {
      MuiPickersDay: {
        styleOverrides: {
          root: {
            borderRadius: '4px',
            fontFamily: 'Inter, sans-serif',
            '&.MuiPickersDay-today': {
              border: '1px solid',
              borderColor: 'var(--mui-palette-primary-main)',
            },
            '&.Mui-selected': {
              borderRadius: '4px',
              backgroundColor: 'var(--mui-palette-primary-main)',
            },
            '&:nth-of-type(1), &:nth-of-type(7)': {
              color: 'var(--mui-palette-error-main)',
            },
          },
          dayOutsideMonth: {
            color: 'var(--mui-palette-text-disabled)',
          },
        },
      },
      MuiPickersCalendarHeader: {
        styleOverrides: {
          root: {
            padding: '0.5rem 0.5rem 1rem 0.5rem',
            fontFamily: 'Inter, sans-serif',
          },
          label: {
            border: '1px solid',
            borderColor: 'var(--mui-palette-divider)',
            borderRadius: '4px',
            padding: '6px 12px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Inter, sans-serif',
          },
          switchViewButton: {
            border: '1px solid',
            borderColor: 'var(--mui-palette-divider)',
            borderRadius: '4px',
            padding: '10rem',
            // height: '36px',
            // width: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
      },
      MuiPickersArrowSwitcher: {
        styleOverrides: {
          root: {
            gap: '0.5rem',
          },
          button: {
            border: '1px solid',
            borderColor: 'var(--mui-palette-divider)',
            borderRadius: '4px',
            height: '36px',
            width: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& > *': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          },
        },
      },
      MuiDayCalendar: {
        styleOverrides: {
          root: {
            paddingBottom: '1rem',
            fontFamily: 'Inter, sans-serif',
          },
          header: {
            justifyContent: 'space-around',
            padding: '0.5rem 0.5rem',
          },
          weekDayLabel: {
            fontSize: '0.75rem',
            width: '36px',
            margin: '0 auto',
            '&:nth-of-type(1), &:nth-of-type(7)': {
              color: 'var(--mui-palette-error-main)',
            },
          },
          weekContainer: {
            margin: '0 auto',
            padding: '0 0.5rem',
            justifyContent: 'space-around',
          },
        },
      },
      MuiYearCalendar: {
        styleOverrides: {
          root: {
            paddingBottom: '1rem',
            fontFamily: 'Inter, sans-serif',
            '& .MuiPickersYear-yearButton': {
              borderRadius: '4px',
              height: '36px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
              '&.Mui-selected': {
                backgroundColor: 'var(--mui-palette-primary-main)',
              },
            },
          },
        },
      },
      MuiMonthCalendar: {
        styleOverrides: {
          root: {
            paddingBottom: '1rem',
            fontFamily: 'Inter, sans-serif',
            '& .MuiPickersMonth-monthButton': {
              borderRadius: '4px',
              height: '36px',
              fontFamily: 'Inter, sans-serif',
              '&.Mui-selected': {
                backgroundColor: 'var(--mui-palette-primary-main)',
              },
            },
          },
        },
      },
    },
  }),
);

const switchOverrides = {
  MuiSwitch: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: ({theme, ownerState}) => ({
        ...(ownerState.size !== 'small'
          ? {
              width: 46,
              height: 36,
              padding: theme.spacing(2.25, 2),
            }
          : {
              width: 42,
              height: 30,
              padding: theme.spacing(1.75, 2),
              '& .MuiSwitch-thumb': {
                width: 12,
                height: 12,
              },
              '& .MuiSwitch-switchBase': {
                padding: 7,
                left: 3,
                '&.Mui-checked': {
                  left: -3,
                },
              },
            }),
      }),

      switchBase: {
        top: 2,
        left: 1,

        // Primary thumb color when checked
        '&.Mui-checked .MuiSwitch-thumb': {
          color: 'var(--mui-palette-primary-dark)',
        },
        '&:not(.Mui-checked) .MuiSwitch-thumb': {
          color: 'var(--mui-palette-secondary-dark)',
        },
        '&.Mui-disabled': {
          '& .MuiSwitch-thumb': {
            opacity: 0.4,
          },
          '& .MuiSwitch-track': {opacity: 0.7},
        },
      },
      thumb: {
        width: 14,
        height: 14,
        boxShadow: 'var(--mui-customShadows-xs)',
      },

      track: ({theme}) => ({
        opacity: 1,
        height: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: 'var(--mui-palette-action-focus)',
        boxShadow: `0 0 4px rgb(var(--mui-palette-common-${
          theme.palette.mode === 'light'
            ? 'onBackgroundChannel'
            : 'backgroundChannel'
        }) / 0.16) inset`,
      }),
    },
  },
};

export default switchOverrides;

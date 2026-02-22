// Config Imports
import themeConfig from '@configs/themeConfig';

const iconStyles = size => ({
  '& > *:nth-of-type(1)': {
    ...(size === 'small'
      ? {
          fontSize: '14px',
        }
      : {
          ...(size === 'medium'
            ? {
                fontSize: '16px',
              }
            : {
                fontSize: '20px',
              }),
        }),
  },
});

const button = {
  MuiButtonBase: {
    defaultProps: {
      disableRipple: themeConfig.disableRipple,
    },
  },
  MuiButton: {
    styleOverrides: {
      root: ({theme, ownerState}) => ({
        borderRadius: '4px',
        height: 'auto',
        '&:focus-visible': {
          outline: `3px solid var(--mui-palette-primary-main)`,
          outlineOffset: '2px',
        },
        ...(ownerState.variant === 'text'
          ? {
              ...(ownerState.size === 'small' && {
                padding: theme.spacing(2, 2.5),
              }),
              ...(ownerState.size === 'medium' && {
                padding: theme.spacing(2, 3.5),
              }),
              ...(ownerState.size === 'large' && {
                padding: theme.spacing(2, 4.5),
              }),
            }
          : {
              ...(ownerState.variant === 'outlined'
                ? {
                    ...(ownerState.size === 'small' && {
                      padding: theme.spacing(0.5, 3.25),
                    }),
                    ...(ownerState.size === 'medium' && {
                      padding: theme.spacing(1, 4.25),
                    }),
                    ...(ownerState.size === 'large' && {
                      padding: theme.spacing(1.75, 5.25),
                    }),
                  }
                : {
                    ...(ownerState.size === 'small' && {
                      padding: theme.spacing(1, 3.5),
                    }),
                    ...(ownerState.size === 'medium' && {
                      padding: theme.spacing(1.5, 4.5),
                    }),
                    ...(ownerState.size === 'large' && {
                      padding: theme.spacing(2, 5.5),
                    }),
                  }),
            }),
      }),
      contained: ({ownerState}) => ({
        boxShadow: 'none',
        ...(!ownerState.disabled && {
          '&:hover, &.Mui-focusVisible': {
            boxShadow: 'none',
            opacity: 0.9,
          },
          '&:active': {
            boxShadow: 'none',
          },
        }),
      }),
      sizeSmall: ({theme}) => ({
        lineHeight: 1.38462,
        fontSize: theme.typography.body2.fontSize,
        borderRadius: 'var(--mui-shape-customBorderRadius-sm)',
      }),
      sizeLarge: {
        fontSize: '1.0625rem',
        lineHeight: 1.529412,
        borderRadius: 'var(--mui-shape-customBorderRadius-lg)',
      },
      startIcon: ({theme, ownerState}) => ({
        ...(ownerState.size === 'small'
          ? {
              marginInlineEnd: theme.spacing(1.5),
            }
          : {
              ...(ownerState.size === 'medium'
                ? {
                    marginInlineEnd: theme.spacing(2),
                  }
                : {
                    marginInlineEnd: theme.spacing(2.5),
                  }),
            }),
        ...iconStyles(ownerState.size),
      }),
      endIcon: ({theme, ownerState}) => ({
        ...(ownerState.size === 'small'
          ? {
              marginInlineStart: theme.spacing(1.5),
            }
          : {
              ...(ownerState.size === 'medium'
                ? {
                    marginInlineStart: theme.spacing(2),
                  }
                : {
                    marginInlineStart: theme.spacing(2.5),
                  }),
            }),
        ...iconStyles(ownerState.size),
      }),
    },
  },
};

export default button;

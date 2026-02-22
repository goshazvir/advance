const dialog = skin => ({
  MuiDialog: {
    styleOverrides: {
      paper: {
        ...(skin !== 'bordered'
          ? {
              boxShadow: 'var(--mui-customShadows-xl)',
            }
          : {
              boxShadow: 'none',
            }),
      },
    },
  },
  MuiDialogTitle: {
    defaultProps: {
      variant: 'h3',
    },
    styleOverrides: {
      root: ({theme}) => ({
        padding: theme.spacing(5),
        '& + .MuiDialogActions-root': {
          paddingTop: 0,
        },
        '& .company-logo': {
          position: 'absolute',
          top: theme.spacing(8),
          left: theme.spacing(10),
        },

        '& .dialog-close-icon': {
          position: 'absolute',
          top: theme.spacing(5),
          right: theme.spacing(5),
          cursor: 'pointer',
        },
      }),
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: ({theme}) => ({
        padding: theme.spacing(5),
        '& + .MuiDialogContent-root, & + .MuiDialogActions-root': {
          paddingTop: 0,
        },
      }),
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: ({theme}) => ({
        padding: theme.spacing(5),
        '&:where(.dialog-actions-dense)': {
          padding: theme.spacing(2.5),
          '& .MuiButton-text': {
            paddingInline: theme.spacing(2.5),
          },
        },
      }),
    },
  },
});

export default dialog;

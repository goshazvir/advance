const popper = () => ({
  MuiPopper: {
    styleOverrides: {
      root: ({theme}) => ({
        '& .MuiPaper-root': {
          backgroundColor: `${theme.palette.background.paper} !important`,
          borderRadius: theme.shape.borderRadius,
          boxShadow:
            theme.palette.mode === 'light'
              ? '0 2px 4px rgba(0, 0, 0, 0.1)'
              : '0 2px 4px rgba(0, 0, 0, 0.2)',
        },
      }),
    },
  },
});

export default popper;

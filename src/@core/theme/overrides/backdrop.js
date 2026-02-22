const backdrop = {
  MuiBackdrop: {
    styleOverrides: {
      root: {
        '&:not(.MuiBackdrop-invisible)': {
          backgroundColor: 'var(--backdrop-color)',
          visibility: 'hidden',
        },
      },
    },
  },
};

export default backdrop;

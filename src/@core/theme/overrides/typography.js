const typography = {
  MuiTypography: {
    styleOverrides: {
      gutterBottom: ({theme}) => ({
        marginBottom: theme.spacing(2),
      }),
    },
    variants: [
      {
        props: {variant: 'overline'},
        style: {
          display: 'inline-block',
        },
      },
    ],
  },
};

export default typography;

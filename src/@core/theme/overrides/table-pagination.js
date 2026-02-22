const tablePagination = {
  MuiTablePagination: {
    styleOverrides: {
      toolbar: ({theme}) => ({
        minHeight: '32px !important',
        paddingTop: `${theme.spacing(0.5)} !important`,
        paddingInlineEnd: `${theme.spacing(1)} !important`,
      }),
      select: {
        '& ~ i, & ~ svg': {
          right: '2px !important',
        },
      },
    },
  },
};

export default tablePagination;

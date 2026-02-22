const tabs = () => ({
  MuiTabs: {
    defaultProps: {
      TabIndicatorProps: {
        style: {transition: 'none'},
      },
    },
    styleOverrides: {
      root: {
        '& .MuiTabs-indicator': {
          backgroundColor: 'var(--mui-palette-primary-main) !important',
        },
        '& .MuiTab-root': {
          color: 'var(--mui-palette-secondary-main) !important',
        },
        '& .MuiTab-root.Mui-selected': {
          color: 'var(--mui-palette-primary-main) !important',
        },
        '& .MuiTab-root:hover': {
          color: 'var(--mui-palette-primary-main) !important',
        },
      },
    },
  },
});

export default tabs;

const drawer = () => ({
  MuiDrawer: {
    defaultProps: {
      PaperProps: {
        elevation: 0, // Remove the default elevation (shadow)
      },
    },
    styleOverrides: {
      paper: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add a small box-shadow
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Add a small box-shadow
      },
    },
  },
});

export default drawer;

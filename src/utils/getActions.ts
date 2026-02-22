const getCloseAction = (handleClose: () => void) => {
  return {
    icon: 'fluent--dismiss-24-regular',
    onClick: handleClose,
  };
};

const getDownloadPDFAction = (url: string) => {
  return {
    icon: 'fluent--arrow-download-24-regular',
    onClick: () => {
      window.location.href = url;
    },
  };
};

const getRefreshAction = (handleRefresh: () => void) => {
  return {
    icon: 'fluent--arrow-clockwise-24-regular',
    onClick: handleRefresh,
  };
};

const getSettingsAction = (handleSettings: () => void) => {
  return {
    icon: 'fluent--settings-24-regular',
    onClick: handleSettings,
  };
};

export {
  getCloseAction,
  getRefreshAction,
  getSettingsAction,
  getDownloadPDFAction,
};

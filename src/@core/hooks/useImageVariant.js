// React Imports
import {useMemo} from 'react';

// Hook Imports
import {useSettings} from './useSettings';
// Third-party imports
import {useColorScheme} from '@mui/material';

export const useImageVariant = (
  mode,
  imgLight,
  imgDark,
  imgLightBordered,
  imgDarkBordered,
) => {
  // Hooks
  const {settings} = useSettings();
  const {mode: muiMode, systemMode: muiSystemMode} = useColorScheme();

  return useMemo(() => {
    const isServer = typeof window === 'undefined';

    const currentMode = (() => {
      if (isServer) return mode;

      return muiMode === 'system' ? muiSystemMode : muiMode;
    })();

    const isBordered = settings?.skin === 'bordered';
    const isDarkMode = currentMode === 'dark';

    if (isBordered && imgLightBordered && imgDarkBordered) {
      return isDarkMode ? imgDarkBordered : imgLightBordered;
    }

    return isDarkMode ? imgDark : imgLight;
  }, [mode, muiMode, muiSystemMode]);
};

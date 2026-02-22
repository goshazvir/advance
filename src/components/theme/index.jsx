'use client';

// React Imports
import {useMemo} from 'react';
// Third-party Imports
import {useMedia} from 'react-use';
import stylisRTLPlugin from 'stylis-plugin-rtl';

// MUI Imports
// Component Imports
import ModeChanger from './ModeChanger';
// Core Theme Imports
import defaultCoreTheme from '@core/theme';
// Config Imports
import themeConfig from '@configs/themeConfig';
import CssBaseline from '@mui/material/CssBaseline';
// Hook Imports
import {useSettings} from '@core/hooks/useSettings';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from '@mui/material/styles';

const ThemeProvider = props => {
  // Props
  const {children, direction, systemMode} = props;

  // Vars
  const isServer = typeof window === 'undefined';
  let currentMode;

  // Hooks
  const {settings} = useSettings();
  const isDark = useMedia('(prefers-color-scheme: dark)', false);

  if (isServer) {
    currentMode = systemMode;
  } else {
    if (settings.mode === 'system') {
      currentMode = isDark ? 'dark' : 'light';
    } else {
      currentMode = settings.mode;
    }
  }

  // Merge the primary color scheme override with the core theme
  const theme = useMemo(() => {
    const coreTheme = defaultCoreTheme(settings, currentMode, direction);

    return extendTheme(coreTheme);
  }, [settings.primaryColor, settings.skin, currentMode]);

  return (
    <AppRouterCacheProvider
      options={{
        prepend: true,
        ...(direction === 'rtl' && {
          key: 'rtl',
          stylisPlugins: [stylisRTLPlugin],
        }),
      }}
    >
      <CssVarsProvider
        theme={theme}
        defaultMode={systemMode}
        modeStorageKey={`${themeConfig.templateName
          .toLowerCase()
          .split(' ')
          .join('-')}-mui-template-mode`}
      >
        <>
          <ModeChanger />
          <CssBaseline />
          {children}
        </>
      </CssVarsProvider>
    </AppRouterCacheProvider>
  );
};

export default ThemeProvider;

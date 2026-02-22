'use client';

// React Imports
import {useEffect} from 'react';

import VerticalMenu from './VerticalMenu';
import {useSettings} from '@core/hooks/useSettings';
import Logo from '@components/FlexxLayout/shared/Logo';
// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav';
// Component Imports
import VerticalNav, {NavHeader} from '@menu/vertical-menu';
// MUI Imports
import {styled, useColorScheme, useTheme} from '@mui/material/styles';
// Style Imports
import navigationCustomStyles from '@core/styles/vertical/navigationCustomStyles';

const StyledVerticalMenuHeight = styled('div')(({}) => ({
  display: 'flex',
  height: '100%',
  '& > *': {
    display: 'flex',
  },
}));

const Navigation = props => {
  // Props
  const {dictionary, mode, systemMode, skin} = props;

  // Hooks
  const verticalNavOptions = useVerticalNav();
  const {settings} = useSettings();
  const {mode: muiMode, systemMode: muiSystemMode} = useColorScheme();
  const theme = useTheme();

  // Refs

  // Vars
  const {isCollapsed, collapseVerticalNav} = verticalNavOptions;
  const isServer = typeof window === 'undefined';
  const isSemiDark = settings.semiDark;
  let isDark, isSkinBordered;

  if (isServer) {
    isDark = mode === 'system' ? systemMode === 'dark' : mode === 'dark';
    isSkinBordered = skin === 'bordered';
  } else {
    isDark =
      muiMode === 'system' ? muiSystemMode === 'dark' : muiMode === 'dark';
  }

  useEffect(() => {
    if (settings.layout === 'collapsed') {
      collapseVerticalNav(true);
    } else {
      collapseVerticalNav(false);
    }
  }, [settings.layout]);

  return (
    // Sidebar Vertical Menu
    <VerticalNav
      customStyles={navigationCustomStyles(verticalNavOptions, theme)}
      collapsedWidth={68}
      backgroundColor={
        isSkinBordered
          ? 'var(--mui-palette-background-paper)'
          : 'var(--mui-palette-background-default)'
      }
      {...(isSemiDark &&
        !isDark && {
          'data-mui-color-scheme': 'dark',
        })}
    >
      <NavHeader>
        <Logo isCollapsed={isCollapsed} />
      </NavHeader>
      <StyledVerticalMenuHeight>
        <VerticalMenu dictionary={dictionary} />
      </StyledVerticalMenuHeight>
      {/* <Grids
        container
        justifyContent={isCollapsed ? 'center' : 'flex-end'}
        style={{padding: '0 8px 8px 0', bottom: '8px'}}
      >
        <Grid item>
          <StyledCollapseButton
            onClick={() =>
              updateSettings({layout: !isCollapsed ? 'collapsed' : 'vertical'})
            }
          >
            <NavCollapseIcons
              lockedIcon={<i className='ri-arrow-left-double-fill text-xxl' />}
              unlockedIcon={
                <i className='ri-arrow-right-double-fill text-xxl' />
              }
              closeIcon={<i className='ri-arrow-right-double-fill text-xxl' />}
              className='text-textSecondary'
            />
          </StyledCollapseButton>
        </Grid>
      </Grid> */}
    </VerticalNav>
  );
};

export default Navigation;

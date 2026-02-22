'use client';

// Third-party Imports
import classnames from 'classnames';

// MUI Imports
import {useTheme} from '@mui/material/styles';
// Config Imports
import themeConfig from '@configs/themeConfig';
// Hook Imports
import {useSettings} from '@core/hooks/useSettings';
// Styled Component Imports
import StyledHeader from '@layouts/styles/horizontal/StyledHeader';
// Util Imports
import {horizontalLayoutClasses} from '@layouts/utils/layoutClasses';

const Header = props => {
  // Props
  const {children, overrideStyles} = props;

  // Hooks
  const {settings} = useSettings();
  const theme = useTheme();

  // Vars
  const {navbarContentWidth} = settings;
  const headerFixed = themeConfig.navbar.type === 'fixed';
  const headerStatic = themeConfig.navbar.type === 'static';
  const headerBlur = themeConfig.navbar.blur === true;
  const headerContentCompact = navbarContentWidth === 'compact';
  const headerContentWide = navbarContentWidth === 'wide';

  return (
    <StyledHeader
      theme={theme}
      overrideStyles={overrideStyles}
      className={classnames(horizontalLayoutClasses.header, {
        [horizontalLayoutClasses.headerFixed]: headerFixed,
        [horizontalLayoutClasses.headerStatic]: headerStatic,
        [horizontalLayoutClasses.headerBlur]: headerBlur,
        [horizontalLayoutClasses.headerContentCompact]: headerContentCompact,
        [horizontalLayoutClasses.headerContentWide]: headerContentWide,
      })}
    >
      {children}
    </StyledHeader>
  );
};

export default Header;

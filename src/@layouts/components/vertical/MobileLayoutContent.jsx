'use client';

// Third-party Imports
import classnames from 'classnames';

// Hook Imports
import {useSettings} from '@core/hooks/useSettings';
// Styled Component Imports
import StyledMain from '@layouts/styles/shared/StyledMain';
// Util Imports
import {verticalLayoutClasses} from '@layouts/utils/layoutClasses';

const MobileLayoutContent = ({children}) => {
  // Hooks
  const {settings} = useSettings();

  // Vars
  const contentCompact = settings.contentWidth === 'compact';
  const contentWide = settings.contentWidth === 'wide';

  return (
    <StyledMain
      isContentCompact={contentCompact}
      className={classnames(verticalLayoutClasses.content, 'flex-auto', {
        [`${verticalLayoutClasses.contentCompact} is-full`]: contentCompact,
        [verticalLayoutClasses.contentWide]: contentWide,
      })}
      sx={{
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      {children}
    </StyledMain>
  );
};

export default MobileLayoutContent;

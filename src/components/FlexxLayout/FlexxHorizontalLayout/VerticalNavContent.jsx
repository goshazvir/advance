// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar';

import Logo from '@components/FlexxLayout/shared/Logo';
// Hook Imports
import useHorizontalNav from '@menu/hooks/useHorizontalNav';
// Component Imports
import NavHeader from '@menu/components/vertical-menu/NavHeader';
// Util Imports
import {mapHorizontalToVerticalMenu} from '@menu/utils/menuUtils';
import NavCollapseIcons from '@menu/components/vertical-menu/NavCollapseIcons';

const VerticalNavContent = ({children}) => {
  // Hooks
  const {isBreakpointReached} = useHorizontalNav();

  // Vars
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar;

  return (
    <>
      <NavHeader>
        <Logo />
        <NavCollapseIcons
          lockedIcon={<i className='ri-radio-button-line text-xl' />}
          unlockedIcon={<i className='ri-checkbox-blank-circle-line text-xl' />}
          closeIcon={<i className='ri-close-line text-xl' />}
          className='text-textSecondary'
        />
      </NavHeader>
      <ScrollWrapper
        {...(isBreakpointReached
          ? {className: 'bs-full overflow-y-auto overflow-x-hidden'}
          : {options: {wheelPropagation: false, suppressScrollX: true}})}
      >
        {mapHorizontalToVerticalMenu(children)}
      </ScrollWrapper>
    </>
  );
};

export default VerticalNavContent;

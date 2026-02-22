'use client';

// Icon Imports
import RadioCircleIcon from '../../svg/RadioCircle';
// Hook Imports
import useVerticalNav from '../../hooks/useVerticalNav';
import FlexxIcon from '@components/FlexxIcon/FlexxIcon';
import RadioCircleMarkedIcon from '../../svg/RadioCircleMarked';
const NavCollapseIcons = props => {
  // Props
  const {closeIcon, lockedIcon, unlockedIcon, onClick, onClose, ...rest} =
    props;

  // Hooks
  const {
    isCollapsed,
    collapseVerticalNav,
    isBreakpointReached,
    toggleVerticalNav,
  } = useVerticalNav();

  // Handle Lock / Unlock Icon Buttons click
  const handleClick = action => {
    // Setup the verticalNav to be locked or unlocked
    const collapse = action === 'lock' ? false : true;

    // Tell the verticalNav to lock or unlock
    collapseVerticalNav(collapse);

    // Call onClick function if passed
    if (onClick) onClick();
  };

  // Handle Close button click
  const handleClose = () => {
    // Close verticalNav using toggle verticalNav function
    toggleVerticalNav(false);

    // Call onClose function if passed
    if (onClose) onClose();
  };

  const renderIconButton = () => {
    const commonProps = {
      role: 'button',
      tabIndex: 0,
      style: {display: 'flex', cursor: 'pointer'},
      ...rest,
    };

    if (isBreakpointReached) {
      return (
        <span {...commonProps} onClick={handleClose}>
          {closeIcon ?? (
            <FlexxIcon
              width={24}
              height={24}
              icon='fluent--dismiss-24-regular'
            />
          )}
        </span>
      );
    }

    if (isCollapsed) {
      return (
        <span {...commonProps} onClick={() => handleClick('lock')}>
          {unlockedIcon ?? <RadioCircleIcon />}
        </span>
      );
    }

    return (
      <span {...commonProps} onClick={() => handleClick('unlock')}>
        {lockedIcon ?? <RadioCircleMarkedIcon />}
      </span>
    );
  };

  return <>{renderIconButton()}</>;
};

export default NavCollapseIcons;

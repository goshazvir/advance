'use client';

// React Imports
import {useRef, useState} from 'react';

// MUI Imports
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
// Hook Imports
import {useSettings} from '@core/hooks/useSettings';

const ModeDropdown = () => {
  // States
  const [open, setOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // Refs
  const anchorRef = useRef(null);

  // Hooks
  const {settings, updateSettings} = useSettings();

  const handleClose = () => {
    setOpen(false);
    setTooltipOpen(false);
  };

  const handleModeSwitch = mode => {
    handleClose();

    if (settings.mode !== mode) {
      updateSettings({mode: mode});
    }
  };

  const getModeIcon = () => {
    if (settings.mode === 'system') {
      return 'ri-computer-line';
    } else if (settings.mode === 'dark') {
      return 'ri-moon-clear-line';
    } else {
      return 'ri-sun-line';
    }
  };

  const getTooltipOpenState = (open, tooltipOpen) => {
    if (open) return false;
    return tooltipOpen;
  };

  return (
    <Tooltip
      title={settings.mode + ' Mode'}
      onOpen={() => setTooltipOpen(true)}
      onClose={() => setTooltipOpen(false)}
      open={getTooltipOpenState(open, tooltipOpen)}
      PopperProps={{className: 'capitalize'}}
    >
      <IconButton
        ref={anchorRef}
        onClick={() =>
          handleModeSwitch(settings.mode === 'light' ? 'dark' : 'light')
        }
        className='!text-textPrimary'
      >
        <i className={getModeIcon()} />
      </IconButton>
    </Tooltip>
  );
};

export default ModeDropdown;

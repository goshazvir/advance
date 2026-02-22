import React from 'react';

import {IconButton} from '@mui/material';
import FlexxIcon from '@components/FlexxIcon/FlexxIcon';

interface CloseButtonProps {
  onClick: () => void;
  absolute?: boolean;
  disabled?: boolean;
}

const CloseButton: React.FC<CloseButtonProps> = ({
  onClick,
  absolute = true,
  disabled = false,
}) => {
  return (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      sx={
        absolute
          ? {
              top: '6rem',
              right: '4rem',
              zIndex: 1000,
              position: 'absolute',
            }
          : undefined
      }
    >
      <FlexxIcon width={24} height={24} icon='fluent--dismiss-24-regular' />
    </IconButton>
  );
};

export default CloseButton;

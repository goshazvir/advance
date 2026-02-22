import React from 'react';

import {IconButton, IconButtonProps} from '@mui/material';

const NoHoverIconButton: React.FC<IconButtonProps> = ({children, ...props}) => {
  return (
    <IconButton
      {...props}
      disableRipple={true}
      disableTouchRipple={true}
      disableFocusRipple={true}
      sx={{
        '&:hover': {
          backgroundColor: 'transparent !important',
          opacity: '1 !important',
          transform: 'none !important',
          boxShadow: 'none !important',
        },
        '&:active': {
          backgroundColor: 'transparent !important',
        },
        '&:focus': {
          backgroundColor: 'transparent !important',
        },
        paddingY: '0 !important',
        transition: 'none !important',
        ...props.sx,
      }}
    >
      {children}
    </IconButton>
  );
};
export default NoHoverIconButton;

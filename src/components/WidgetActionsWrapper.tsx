import React from 'react';

import {Box} from '@mui/material';

interface WidgetActionsWrapperProps {
  children: React.ReactNode;
}

const WidgetActionsWrapper: React.FC<WidgetActionsWrapperProps> = ({
  children,
}) => {
  return (
    <Box
      width='100%'
      position={'sticky'}
      bottom={0}
      left={0}
      zIndex={1}
      marginTop={'auto'}
      paddingY={8}
      sx={{
        backdropFilter: 'blur(15px)',
        zIndex: 1,
        boxSizing: 'border-box',
      }}
    >
      {children}
    </Box>
  );
};
export default WidgetActionsWrapper;

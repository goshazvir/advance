import React, {FC, ReactNode} from 'react';

// MUI Imports
import {Stack, StackProps} from '@mui/material';

interface FlexxWrapperProps extends StackProps {
  children: ReactNode;
}

const FlexxDashboardWrapper: FC<FlexxWrapperProps> = ({
  children,
  ...stackProps
}) => {
  return (
    <Stack
      height='100%'
      gap='2rem'
      paddingX={{sm: '0.2rem', md: '2rem'}}
      paddingTop='1.5rem'
      {...stackProps}
    >
      {children}
    </Stack>
  );
};

export default FlexxDashboardWrapper;

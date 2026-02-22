import React from 'react';

import Logo from '@core/svg/Logo';
import {Box, Stack} from '@mui/material';
import Typography from '@mui/material/Typography';

interface AdvanceLoaderCenterProps {
  title?: string;
  color?: string;
  subtitle?: string | React.ReactNode;
}

const AdvanceError: React.FC<AdvanceLoaderCenterProps> = ({
  title,
  subtitle,
  color,
}) => {
  return (
    <Stack
      direction='column'
      position='relative'
      justifyContent='center'
      justifySelf='center'
      alignItems='center'
      height='100%'
      spacing={2}
      px={2}
      textAlign='center'
    >
      <Box>
        <Logo
          className='text-primary'
          style={{height: 32, width: 32}}
          isCollapsed
        />
      </Box>

      <Stack spacing={1}>
        {title && (
          <Typography
            variant='h4'
            color={color || 'text.primary'}
            fontWeight={600}
          >
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography variant='body1' color='text.secondary' maxWidth='md'>
            {subtitle}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default AdvanceError;

import React from 'react';

import Logo from '@core/svg/Logo';
import {Box, Stack} from '@mui/material';
import Typography from '@mui/material/Typography';

interface AdvanceLoaderCenterProps {
  title?: string;
  subtitle?: string;
}

const AdvanceLoaderCenter: React.FC<AdvanceLoaderCenterProps> = ({
  title,
  subtitle,
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
      <Box
        sx={{
          animation: 'pulse 5s infinite ease-in-out',
          '@keyframes pulse': {
            '0%': {opacity: 0.2},
            '50%': {opacity: 1},
            '100%': {opacity: 0.2},
          },
        }}
      >
        <Logo
          className='text-primary'
          style={{height: 32, width: 32}}
          isCollapsed
        />
      </Box>

      <Stack spacing={1}>
        {title && (
          <Typography variant='h4' color='text.primary' fontWeight={600}>
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography variant='body1' color='text.secondary' maxWidth='md'>
            {subtitle}
          </Typography>
        )}
      </Stack>

      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          height: 4,
          bgcolor: 'divider',
          borderRadius: 2,
          overflow: 'hidden',
          mt: 2,
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: '60%',
            bgcolor: 'primary.main',
            borderRadius: 2,
            animation: 'progress 2s ease-in-out infinite',
            '@keyframes progress': {
              '0%': {transform: 'translateX(-100%)'},
              '100%': {transform: 'translateX(200%)'},
            },
          }}
        />
      </Box>
    </Stack>
  );
};

export default AdvanceLoaderCenter;

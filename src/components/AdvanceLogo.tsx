import React from 'react';

import {Box} from '@mui/material';
import Logo from '@core/svg/Logo';

const AdvanceLogo: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '1.25rem',
        left: {xs: '50%', sm: '38px'},
        transform: {xs: 'translateX(-50%)', sm: 'none'},
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3,
          marginBottom: 6,
        }}
      >
        <Logo className='text-primary' height={28} width={35} />
      </Box>
    </Box>
  );
};

export default AdvanceLogo;

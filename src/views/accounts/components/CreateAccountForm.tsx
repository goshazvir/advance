import React from 'react';

import {Stack, Typography} from '@mui/material';

const CreateAccountForm: React.FC = () => {
  return (
    <Stack
      flexGrow={1}
      alignItems={'center'}
      justifyContent={'center'}
      gap={'1rem'}
    >
      <Typography variant={'h3'}>Create Account Form</Typography>
      <Typography variant={'body1'}>To be implemented with a form</Typography>
    </Stack>
  );
};

export default CreateAccountForm;

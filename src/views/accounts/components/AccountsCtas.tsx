import React from 'react';

import {Stack} from '@mui/material';
import {useCreateAccount} from '@views/accounts/hooks/useCreateAccount';
import {ActionButtonConfig} from '@components/AdvanceActionButtons/types';
import AdvanceActionButtons from '@components/AdvanceActionButtons/AdvanceActionButtons';

const AccountsCtas: React.FC = () => {
  const {openDrawer, CreateAccountDrawer} = useCreateAccount();

  const actions: ActionButtonConfig[] = [
    {
      name: 'Add Account',
      variant: 'outlined',
      onClick: openDrawer,
      startIcon: 'fluent--add-circle-20-regular',
    },
  ];

  return (
    <>
      <Stack direction='row' gap={'1rem'} alignItems={'center'}>
        <AdvanceActionButtons actions={actions} />
      </Stack>
      {CreateAccountDrawer}
    </>
  );
};
export default AccountsCtas;

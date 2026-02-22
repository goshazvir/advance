'use client';

import type {Account} from '@/domain/Account';

import React from 'react';

import {Stack} from '@mui/material';
import {useCreateAccount} from '@views/accounts/hooks/useCreateAccount';
import {ActionButtonConfig} from '@components/AdvanceActionButtons/types';
import AdvanceActionButtons from '@components/AdvanceActionButtons/AdvanceActionButtons';

interface AccountsCtasProps {
  onAccountCreated?: (account: Account) => void;
  onMoveMoneyClick?: () => void;
  MoveMoneyDrawer?: React.ReactNode;
}

const AccountsCtas: React.FC<AccountsCtasProps> = ({
  onAccountCreated,
  onMoveMoneyClick,
  MoveMoneyDrawer,
}) => {
  const {openDrawer, CreateAccountDrawer} = useCreateAccount({
    onSuccess: onAccountCreated,
  });

  const actions: ActionButtonConfig[] = [
    {
      name: 'Add Account',
      variant: 'outlined',
      onClick: openDrawer,
      startIcon: 'fluent--add-circle-20-regular',
    },
    {
      name: 'Move Money',
      variant: 'outlined',
      onClick: () => onMoveMoneyClick?.(),
      startIcon: 'fluent--arrow-swap-20-regular',
    },
  ];

  return (
    <>
      <Stack direction='row' gap={'1rem'} alignItems={'center'}>
        <AdvanceActionButtons actions={actions} />
      </Stack>
      {CreateAccountDrawer}
      {MoveMoneyDrawer}
    </>
  );
};
export default AccountsCtas;

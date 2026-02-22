'use client';

import type {Account} from '@/domain/Account';

import React, {useCallback} from 'react';

import {Typography} from '@mui/material';
import AccountsCtas from '@views/accounts/components/AccountsCtas';
import FlexxDashboardWrapper from '@/components/FlexxDashboardWrapper';
import {useAccountDrawer} from '@views/accounts/hooks/useAccountDrawer';
import AccountsDashboardTable from '@views/accounts/components/AccountsDashboardTable';

const AccountsPage = () => {
  const {openDrawer: openAccountDrawer, AccountDrawerPortal} =
    useAccountDrawer();

  const handleAccountCreated = useCallback(
    (account: Account) => {
      openAccountDrawer(account.account_id);
    },
    [openAccountDrawer],
  );

  return (
    <FlexxDashboardWrapper>
      <Typography variant='h4' sx={{fontWeight: 600}}>
        Accounts
      </Typography>
      <AccountsCtas onAccountCreated={handleAccountCreated} />
      <AccountsDashboardTable
        openAccountDrawer={openAccountDrawer}
        AccountDrawerPortal={AccountDrawerPortal}
      />
    </FlexxDashboardWrapper>
  );
};

export default AccountsPage;

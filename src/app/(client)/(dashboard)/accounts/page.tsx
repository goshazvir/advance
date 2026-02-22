'use client';

import type {Account} from '@/domain/Account';

import React, {useCallback, useEffect} from 'react';

import {Typography} from '@mui/material';
import {useSearchParams} from 'next/navigation';
import {useMoveMoney} from '@views/accounts/hooks/useMoveMoney';
import AccountsCtas from '@views/accounts/components/AccountsCtas';
import FlexxDashboardWrapper from '@/components/FlexxDashboardWrapper';
import {useAccountDrawer} from '@views/accounts/hooks/useAccountDrawer';
import AccountsDashboardTable from '@views/accounts/components/AccountsDashboardTable';

const AccountsPage = () => {
  const searchParams = useSearchParams();
  const {openDrawer: openMoveMoney, MoveMoneyDrawer} = useMoveMoney();
  const {openDrawer: openAccountDrawer, AccountDrawerPortal} = useAccountDrawer(
    {onMoveMoneyFromAccount: openMoveMoney},
  );

  useEffect(() => {
    const accountId = searchParams.get('accountId');
    if (accountId) {
      openAccountDrawer(accountId);
    }
  }, [searchParams, openAccountDrawer]);

  const handleAccountCreated = useCallback(
    (account: Account) => {
      openAccountDrawer(account.account_id);
    },
    [openAccountDrawer],
  );

  const handleMoveMoneyClick = useCallback(() => {
    openMoveMoney();
  }, [openMoveMoney]);

  return (
    <FlexxDashboardWrapper>
      <Typography variant='h4' sx={{fontWeight: 600}}>
        Accounts
      </Typography>
      <AccountsCtas
        onAccountCreated={handleAccountCreated}
        onMoveMoneyClick={handleMoveMoneyClick}
        MoveMoneyDrawer={MoveMoneyDrawer}
      />
      <AccountsDashboardTable
        openAccountDrawer={openAccountDrawer}
        AccountDrawerPortal={AccountDrawerPortal}
      />
    </FlexxDashboardWrapper>
  );
};

export default AccountsPage;

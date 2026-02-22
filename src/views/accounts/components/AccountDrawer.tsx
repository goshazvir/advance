'use client';

import React from 'react';

import {Stack, Typography} from '@mui/material';
import useFetchAccount from '@/hooks/useFetchAccount';
import {FlexxTable} from '@components/FlexxTable/FlexxTable';
import useFetchAccountTransactions from '@/hooks/useFetchAccountTransactions';
import AdvanceLoaderCenter from '@components/AdvanceLoading/AdvanceLoaderCenter';
import AccountDrawerHeader from '@views/accounts/components/AccountDrawerHeader';
import useAccountDrawerTransactionsTable from '@views/accounts/hooks/useAccountDrawerTransactionsTable';

interface AccountDrawerProps {
  accountId: string;
}

const AccountDrawer: React.FC<AccountDrawerProps> = ({accountId}) => {
  const {data: account, isLoading, isError} = useFetchAccount(accountId);
  const {
    data: transactions,
    isLoading: isTransactionsLoading,
    isError: isTransactionsError,
  } = useFetchAccountTransactions(accountId);
  const {columns, rows} = useAccountDrawerTransactionsTable(transactions);

  if (isLoading) {
    return <AdvanceLoaderCenter />;
  }

  if (isError || !account) {
    return (
      <Stack alignItems='center' justifyContent='center' height='100%'>
        <Typography variant='body1' color='error'>
          Failed to load account details
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={3} sx={{height: '100%', overflow: 'auto'}}>
      <AccountDrawerHeader account={account} />

      <Typography variant='h6' fontWeight={600}>
        Transactions
      </Typography>

      <FlexxTable
        columns={columns}
        rows={rows}
        isLoading={isTransactionsLoading}
        isError={isTransactionsError}
        emptyState='No transactions'
        customRowsPerPage={10}
      />
    </Stack>
  );
};

export default AccountDrawer;

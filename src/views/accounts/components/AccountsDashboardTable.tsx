'use client';

import React from 'react';

import useFetchAccounts from '@/hooks/useFetchAccounts';
import {useGlobalSearch} from '@core/hooks/useGlobalSearch';
import {FlexxTable} from '@components/FlexxTable/FlexxTable';
import useAccountsDashboardTable from '@views/accounts/hooks/useAccountsDashboardTable';

interface AccountsDashboardTableProps {
  openAccountDrawer: (accountId: string) => void;
  AccountDrawerPortal: React.ReactNode;
}

const AccountsDashboardTable: React.FC<AccountsDashboardTableProps> = ({
  openAccountDrawer,
  AccountDrawerPortal,
}) => {
  const {searchQuery} = useGlobalSearch();
  const {data, isLoading, isError} = useFetchAccounts({searchQuery});
  const {columns, rows} = useAccountsDashboardTable(data, {
    onRowClick: openAccountDrawer,
  });

  return (
    <>
      <FlexxTable
        columns={columns}
        rows={rows}
        isLoading={isLoading}
        isError={isError}
        emptyState='No accounts found'
      />
      {AccountDrawerPortal}
    </>
  );
};

export default AccountsDashboardTable;

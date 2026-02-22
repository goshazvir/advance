'use client';

import React from 'react';

import useFetchAccounts from '@/hooks/useFetchAccounts';
import {useGlobalSearch} from '@core/hooks/useGlobalSearch';
import {FlexxTable} from '@components/FlexxTable/FlexxTable';
import {useAccountDrawer} from '@views/accounts/hooks/useAccountDrawer';
import useAccountsDashboardTable from '@views/accounts/hooks/useAccountsDashboardTable';

const AccountsDashboardTable: React.FC = () => {
  const {searchQuery} = useGlobalSearch();
  const {data, isLoading, isError} = useFetchAccounts({searchQuery});
  const {openDrawer, AccountDrawerPortal} = useAccountDrawer();
  const {columns, rows} = useAccountsDashboardTable(data, {
    onRowClick: openDrawer,
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

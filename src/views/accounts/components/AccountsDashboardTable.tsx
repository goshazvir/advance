'use client';

import React from 'react';

import {FlexxTable} from '@components/FlexxTable/FlexxTable';
import useFetchAccounts from '@/hooks/useFetchAccounts';
import useAccountsDashboardTable from '@views/accounts/hooks/useAccountsDashboardTable';
import {useGlobalSearch} from '@core/hooks/useGlobalSearch';

const AccountsDashboardTable: React.FC = () => {
  const {searchQuery} = useGlobalSearch();
  const {data, isLoading, isError} = useFetchAccounts({searchQuery});
  const {columns, rows} = useAccountsDashboardTable(data);

  return (
    <FlexxTable
      columns={columns}
      rows={rows}
      isLoading={isLoading}
      isError={isError}
      emptyState='No accounts found'
    />
  );
};

export default AccountsDashboardTable;

'use client';

import React from 'react';

import {Typography} from '@mui/material';
import {useGlobalSearch} from '@core/hooks/useGlobalSearch';
import {FlexxTable} from '@components/FlexxTable/FlexxTable';
import FlexxDashboardWrapper from '@/components/FlexxDashboardWrapper';
import useFetchTransactions from '@views/transactions/hooks/useFetchTransactions';
import useTransactionsDashboardTable from '@views/transactions/hooks/useTransactionsDashboardTable';

const TransactionsDashboard: React.FC = () => {
  const {searchQuery} = useGlobalSearch();
  const {data, isLoading, isError} = useFetchTransactions({searchQuery});
  const {columns, rows} = useTransactionsDashboardTable(data);

  return (
    <FlexxDashboardWrapper>
      <Typography variant='h4' sx={{fontWeight: 600}}>
        Transactions
      </Typography>
      <FlexxTable
        columns={columns}
        rows={rows}
        isLoading={isLoading}
        isError={isError}
        emptyState='No transactions found'
        customRowsPerPage={100}
      />
    </FlexxDashboardWrapper>
  );
};

export default TransactionsDashboard;

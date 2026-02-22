'use client';

import type {Transaction} from '@/domain/Transaction';
import type {
  FlexxColumn,
  FlexxTableRow,
} from '@/components/FlexxTable/domain/FlexxTable';

import React, {useMemo} from 'react';

import {useRouter} from 'next/navigation';
import {Card, CardContent, Typography} from '@mui/material';
import {FlexxTable} from '@/components/FlexxTable/FlexxTable';

interface RecentTransactionsWidgetProps {
  transactions: Transaction[];
  isLoading: boolean;
}

const columns: FlexxColumn[] = [
  {field: 'date', headerName: 'Date', dateFormat: 'sm'},
  {field: 'account', headerName: 'Account'},
  {field: 'merchant', headerName: 'Merchant'},
  {
    field: 'amount',
    headerName: 'Amount',
    currency: true,
    showCents: true,
    align: 'right',
  },
  {
    field: 'direction',
    headerName: 'Direction',
    decorator: (value: string) => {
      if (value === 'credit') return 'success';
      if (value === 'debit') return 'warning';
      return 'default';
    },
  },
  {
    field: 'status',
    headerName: 'Status',
    decorator: (value: string) => {
      if (value === 'approved') return 'success';
      if (value === 'pending') return 'warning';
      return 'default';
    },
  },
];

const RecentTransactionsWidget: React.FC<RecentTransactionsWidgetProps> = ({
  transactions,
  isLoading,
}) => {
  const router = useRouter();

  const rows: FlexxTableRow[] = useMemo(() => {
    return transactions.map(tx => ({
      data: {
        date: tx.created_at,
        account: tx.account_name,
        merchant: tx.merchant,
        amount: tx.amount,
        direction: tx.direction,
        status: tx.status,
      },
      onClick: () => {
        router.push(`/accounts?accountId=${tx.account_id}`);
      },
    }));
  }, [transactions, router]);

  return (
    <Card
      sx={{
        gridColumn: {xs: '1 / -1', lg: 'span 2'},
        '& .flexx-table-pagination': {display: 'none'},
      }}
    >
      <CardContent>
        <Typography variant='h6' sx={{mb: 2, fontWeight: 600}}>
          Recent Transactions
        </Typography>
        <FlexxTable
          columns={columns}
          rows={rows}
          isLoading={isLoading}
          emptyState='No transactions yet'
          disablePagination
          skeletonRows={5}
        />
      </CardContent>
    </Card>
  );
};

export default RecentTransactionsWidget;

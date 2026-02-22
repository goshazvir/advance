'use client';

import React from 'react';

import {Box, Typography} from '@mui/material';
import FlexxDashboardWrapper from '@/components/FlexxDashboardWrapper';
import useHomeDashboardData from '@views/home/hooks/useHomeDashboardData';
import AccountStatusWidget from '@views/home/components/AccountStatusWidget';
import TopBanksByFundsWidget from '@views/home/components/TopBanksByFundsWidget';
import PortfolioOverviewWidget from '@views/home/components/PortfolioOverviewWidget';
import TransactionVolumeWidget from '@views/home/components/TransactionVolumeWidget';
import TopBanksByAccountsWidget from '@views/home/components/TopBanksByAccountsWidget';
import RecentTransactionsWidget from '@views/home/components/RecentTransactionsWidget';

const HomeDashboard: React.FC = () => {
  const {
    portfolioOverview,
    topBanksByAccounts,
    topBanksByFunds,
    recentTransactions,
    accountStatusSummary,
    transactionVolumeSummary,
    isLoading,
  } = useHomeDashboardData();

  return (
    <FlexxDashboardWrapper>
      <Typography variant='h4' sx={{fontWeight: 600}}>
        Dashboard
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gap: 3,
        }}
      >
        <PortfolioOverviewWidget
          portfolioOverview={portfolioOverview}
          isLoading={isLoading.accounts || isLoading.transactions}
        />
        <TopBanksByAccountsWidget
          banks={topBanksByAccounts}
          isLoading={isLoading.accounts}
        />
        <TopBanksByFundsWidget
          banks={topBanksByFunds}
          isLoading={isLoading.accounts}
        />
        <AccountStatusWidget
          statusSummary={accountStatusSummary}
          isLoading={isLoading.accounts}
        />
        <TransactionVolumeWidget
          volumeSummary={transactionVolumeSummary}
          isLoading={isLoading.transactions}
        />
        <RecentTransactionsWidget
          transactions={recentTransactions}
          isLoading={isLoading.transactions}
        />
      </Box>
    </FlexxDashboardWrapper>
  );
};

export default HomeDashboard;

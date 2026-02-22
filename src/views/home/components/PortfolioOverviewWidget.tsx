'use client';

import type {PortfolioOverview} from '@views/home/domain/HomeDashboard';

import React from 'react';

import AdvanceCurrencyText from '@/components/AdvanceCurrencyText/AdvanceCurrencyText';
import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

interface PortfolioOverviewWidgetProps {
  portfolioOverview: PortfolioOverview;
  isLoading: boolean;
}

const PortfolioOverviewWidget: React.FC<PortfolioOverviewWidgetProps> = ({
  portfolioOverview,
  isLoading,
}) => {
  return (
    <Card sx={{gridColumn: '1 / -1'}}>
      <CardContent>
        <Typography variant='h6' sx={{mb: 2, fontWeight: 600}}>
          Portfolio Overview
        </Typography>
        <Stack
          direction={{xs: 'column', sm: 'row'}}
          spacing={4}
          alignItems='center'
        >
          <Box sx={{textAlign: 'center', flex: 1}}>
            <Typography variant='body2' color='text.secondary' sx={{mb: 0.5}}>
              Total Balance
            </Typography>
            {isLoading ? (
              <Skeleton
                variant='text'
                width={180}
                height={48}
                sx={{mx: 'auto'}}
              />
            ) : (
              <AdvanceCurrencyText
                amount={portfolioOverview.totalBalance}
                variant='h4'
                fontWeight={700}
                align='center'
              />
            )}
          </Box>
          <Box sx={{textAlign: 'center', flex: 1}}>
            <Typography variant='body2' color='text.secondary' sx={{mb: 0.5}}>
              Total Accounts
            </Typography>
            {isLoading ? (
              <Skeleton
                variant='text'
                width={60}
                height={40}
                sx={{mx: 'auto'}}
              />
            ) : (
              <Typography variant='h5' fontWeight={600}>
                {portfolioOverview.totalAccounts}
              </Typography>
            )}
          </Box>
          <Box sx={{textAlign: 'center', flex: 1}}>
            <Typography variant='body2' color='text.secondary' sx={{mb: 0.5}}>
              Total Transactions
            </Typography>
            {isLoading ? (
              <Skeleton
                variant='text'
                width={60}
                height={40}
                sx={{mx: 'auto'}}
              />
            ) : (
              <Typography variant='h5' fontWeight={600}>
                {portfolioOverview.totalTransactions}
              </Typography>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PortfolioOverviewWidget;

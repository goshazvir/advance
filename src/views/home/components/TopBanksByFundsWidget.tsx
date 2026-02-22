'use client';

import type {BankSummary} from '@views/home/domain/HomeDashboard';

import React from 'react';

import AdvanceCurrencyText from '@/components/AdvanceCurrencyText/AdvanceCurrencyText';
import {
  Avatar,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

interface TopBanksByFundsWidgetProps {
  banks: BankSummary[];
  isLoading: boolean;
}

const rankLabels = ['1st', '2nd', '3rd'];

const TopBanksByFundsWidget: React.FC<TopBanksByFundsWidgetProps> = ({
  banks,
  isLoading,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' sx={{mb: 2, fontWeight: 600}}>
          Top Banks by Funds
        </Typography>
        {isLoading && (
          <Stack spacing={2}>
            {[0, 1, 2].map(i => (
              <Skeleton key={i} variant='rectangular' height={40} />
            ))}
          </Stack>
        )}
        {!isLoading && banks.length === 0 && (
          <Typography variant='body2' color='text.secondary'>
            No accounts yet
          </Typography>
        )}
        {!isLoading && banks.length > 0 && (
          <Stack spacing={2}>
            {banks.map((bank, index) => (
              <Stack
                key={bank.bankName}
                direction='row'
                alignItems='center'
                spacing={2}
              >
                <Typography
                  variant='body2'
                  sx={{fontWeight: 700, minWidth: 28, color: 'text.secondary'}}
                >
                  {rankLabels[index]}
                </Typography>
                <Avatar
                  src={bank.bankIcon}
                  alt={bank.bankName}
                  sx={{width: 32, height: 32}}
                >
                  {bank.bankName.charAt(0)}
                </Avatar>
                <Stack sx={{flex: 1}}>
                  <Typography variant='body1' fontWeight={600}>
                    {bank.bankName}
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    {bank.accountCount}{' '}
                    {bank.accountCount === 1 ? 'account' : 'accounts'}
                  </Typography>
                </Stack>
                <AdvanceCurrencyText
                  amount={bank.totalBalance}
                  variant='body1'
                  fontWeight={600}
                />
              </Stack>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default TopBanksByFundsWidget;

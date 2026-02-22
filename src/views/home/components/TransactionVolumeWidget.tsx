'use client';

import type {TransactionDirectionSummary} from '@views/home/domain/HomeDashboard';

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

interface TransactionVolumeWidgetProps {
  volumeSummary: TransactionDirectionSummary;
  isLoading: boolean;
}

const TransactionVolumeWidget: React.FC<TransactionVolumeWidgetProps> = ({
  volumeSummary,
  isLoading,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' sx={{mb: 2, fontWeight: 600}}>
          Transaction Volume
        </Typography>
        {isLoading ? (
          <Stack spacing={2}>
            <Skeleton variant='rectangular' height={48} />
            <Skeleton variant='rectangular' height={48} />
          </Stack>
        ) : (
          <Stack spacing={2.5}>
            <Box>
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
              >
                <Typography variant='body2' color='text.secondary'>
                  Credit
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  {volumeSummary.creditCount} transactions
                </Typography>
              </Stack>
              <AdvanceCurrencyText
                amount={volumeSummary.creditTotal}
                variant='h6'
                fontWeight={600}
                color='#046E43'
              />
            </Box>
            <Box>
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
              >
                <Typography variant='body2' color='text.secondary'>
                  Debit
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  {volumeSummary.debitCount} transactions
                </Typography>
              </Stack>
              <AdvanceCurrencyText
                amount={volumeSummary.debitTotal}
                variant='h6'
                fontWeight={600}
                color='#D32F2F'
              />
            </Box>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionVolumeWidget;

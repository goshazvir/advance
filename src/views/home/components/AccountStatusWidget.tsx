'use client';

import type {AccountStatusSummary} from '@views/home/domain/HomeDashboard';

import React from 'react';

import {AccountStatus} from '@/domain/Account';
import {
  Card,
  CardContent,
  Chip,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

interface AccountStatusWidgetProps {
  statusSummary: AccountStatusSummary;
  isLoading: boolean;
}

const statusConfig: Array<{
  key: keyof Pick<AccountStatusSummary, 'open' | 'closed' | 'invalid'>;
  label: string;
  status: AccountStatus;
  color: 'success' | 'error' | 'warning';
}> = [
  {key: 'open', label: 'Open', status: AccountStatus.OPEN, color: 'success'},
  {
    key: 'closed',
    label: 'Closed',
    status: AccountStatus.CLOSED,
    color: 'error',
  },
  {
    key: 'invalid',
    label: 'Invalid',
    status: AccountStatus.INVALID,
    color: 'warning',
  },
];

const AccountStatusWidget: React.FC<AccountStatusWidgetProps> = ({
  statusSummary,
  isLoading,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' sx={{mb: 2, fontWeight: 600}}>
          Account Status
        </Typography>
        {isLoading ? (
          <Stack spacing={2}>
            {[0, 1, 2].map(i => (
              <Skeleton key={i} variant='rectangular' height={32} />
            ))}
          </Stack>
        ) : (
          <Stack spacing={2}>
            {statusConfig.map(({key, label, color}) => (
              <Stack
                key={key}
                direction='row'
                alignItems='center'
                justifyContent='space-between'
              >
                <Chip
                  label={label}
                  color={color}
                  size='small'
                  variant='outlined'
                />
                <Typography variant='body1' fontWeight={600}>
                  {statusSummary[key]}
                </Typography>
              </Stack>
            ))}
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              sx={{borderTop: 1, borderColor: 'divider', pt: 1.5}}
            >
              <Typography variant='body2' color='text.secondary'>
                Total
              </Typography>
              <Typography variant='body1' fontWeight={700}>
                {statusSummary.total}
              </Typography>
            </Stack>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default AccountStatusWidget;

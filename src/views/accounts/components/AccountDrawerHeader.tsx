'use client';

import React from 'react';

import {Account, AccountStatus} from '@/domain/Account';
import FlexxIcon from '@/components/FlexxIcon/FlexxIcon';
import {Box, Button, Chip, Stack, Typography} from '@mui/material';
import AdvanceCurrencyText from '@components/AdvanceCurrencyText/AdvanceCurrencyText';
import AdvanceAccountNumberDisplay from '@components/AdvanceAccountNumberDisplay/AdvanceAccountNumberDisplay';

interface AccountDrawerHeaderProps {
  account: Account;
}

const statusColorMap: Record<AccountStatus, 'success' | 'error' | 'warning'> = {
  [AccountStatus.OPEN]: 'success',
  [AccountStatus.CLOSED]: 'error',
  [AccountStatus.INVALID]: 'warning',
};

const AccountDrawerHeader: React.FC<AccountDrawerHeaderProps> = ({account}) => {
  return (
    <Stack spacing={2}>
      <Stack spacing={0.5}>
        <Stack direction='row' alignItems='center' gap={1}>
          <Typography variant='h4' fontWeight={600}>
            {account.name}
          </Typography>
          <Chip
            label={account.status}
            color={statusColorMap[account.status]}
            size='small'
            variant='outlined'
            sx={{ml: 1.5}}
          />
        </Stack>
        <Typography variant='body2' color='text.secondary'>
          {account.bank_name}
        </Typography>
      </Stack>

      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
      >
        <Stack direction='row' gap={4} alignItems='baseline'>
          <Stack spacing={0.25}>
            <AdvanceAccountNumberDisplay
              accountNumber={account.account_number}
              variant='body1'
              fontWeight={500}
            />
            <Typography variant='caption' color='text.secondary'>
              Account Number
            </Typography>
          </Stack>

          <Stack spacing={0.25}>
            <Typography variant='body1' fontWeight={500}>
              {account.routing_number}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              Routing Number
            </Typography>
          </Stack>
        </Stack>

        <Button
          variant='outlined'
          size='small'
          startIcon={<FlexxIcon icon='fluent--arrow-swap-20-regular' />}
        >
          Move Money
        </Button>
      </Stack>

      <Box>
        <AdvanceCurrencyText
          amount={account.balance}
          variant='h4'
          fontWeight={600}
          showCents
        />
        <Typography variant='caption' color='text.secondary'>
          Balance
        </Typography>
      </Box>
    </Stack>
  );
};

export default AccountDrawerHeader;

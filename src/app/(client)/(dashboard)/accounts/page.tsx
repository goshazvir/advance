'use client';

import React from 'react';

import {Typography} from '@mui/material';
import FlexxDashboardWrapper from '@/components/FlexxDashboardWrapper';
import AccountsDashboardTable from '@views/accounts/components/AccountsDashboardTable';
import AccountsCtas from '@views/accounts/components/AccountsCtas';

const AccountsPage = () => {
  return (
    <FlexxDashboardWrapper>
      <Typography variant='h4' sx={{fontWeight: 600}}>
        Accounts
      </Typography>
      <AccountsCtas />
      <AccountsDashboardTable />
    </FlexxDashboardWrapper>
  );
};

export default AccountsPage;

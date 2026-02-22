'use client';

import React from 'react';

import {Typography} from '@mui/material';
import AccountsCtas from '@views/accounts/components/AccountsCtas';
import FlexxDashboardWrapper from '@/components/FlexxDashboardWrapper';
import AccountsDashboardTable from '@views/accounts/components/AccountsDashboardTable';

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

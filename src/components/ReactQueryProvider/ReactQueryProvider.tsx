'use client';

import React from 'react';
import {QueryClientProvider} from 'react-query';

import queryClient from '@/QueryClient/queryClient';

const ReactQueryProvider = ({children}: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;

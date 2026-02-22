import {useQuery} from 'react-query';

import {Transaction} from '@/domain/Transaction';
import flexxApiService from '@/flexxApi/flexxApiService';
import {QueryClientIds} from '@/QueryClient/queryClient.ids';

const useFetchAccountTransactions = (accountId: string | null) => {
  return useQuery<Transaction[]>(
    [QueryClientIds.ACCOUNT_TRANSACTIONS, accountId],
    () => flexxApiService().fetchAccountTransactions(accountId as string),
    {enabled: !!accountId},
  );
};

export default useFetchAccountTransactions;

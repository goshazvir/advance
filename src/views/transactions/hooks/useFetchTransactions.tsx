import {useQuery} from 'react-query';

import {Transaction} from '@/domain/Transaction';
import flexxApiService from '@/flexxApi/flexxApiService';
import {QueryClientIds} from '@/QueryClient/queryClient.ids';

interface UseFetchTransactionsArgs {
  searchQuery?: string;
}

const useFetchTransactions = (args?: UseFetchTransactionsArgs) => {
  return useQuery<Transaction[]>(
    [QueryClientIds.TRANSACTIONS, args?.searchQuery],
    () => flexxApiService().fetchTransactions({search_term: args?.searchQuery}),
  );
};

export default useFetchTransactions;

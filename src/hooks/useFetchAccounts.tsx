import {useQuery} from 'react-query';

import {Account} from '@/domain/Account';
import flexxApiService from '@/flexxApi/flexxApiService';
import {QueryClientIds} from '@/QueryClient/queryClient.ids';

interface useFetchAccountsArgs {
  searchQuery?: string;
}

const useFetchAccounts = (args?: useFetchAccountsArgs) => {
  return useQuery<Account[]>(
    [QueryClientIds.ACCOUNTS, args?.searchQuery],
    () => flexxApiService().fetchAccounts({search_term: args?.searchQuery}),
  );
};

export default useFetchAccounts;

import {useQuery} from 'react-query';

import {Account} from '@/domain/Account';
import flexxApiService from '@/flexxApi/flexxApiService';
import {QueryClientIds} from '@/QueryClient/queryClient.ids';

const useFetchAccount = (accountId: string | null) => {
  return useQuery<Account>(
    [QueryClientIds.ACCOUNT, accountId],
    () => flexxApiService().fetchAccount(accountId as string),
    {enabled: !!accountId},
  );
};

export default useFetchAccount;

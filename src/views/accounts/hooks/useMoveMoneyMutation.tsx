'use client';

import type {Transaction} from '@/domain/Transaction';
import type {MoveMoneyPayload} from '@/domain/MoveMoneyPayload';

import {useMutation, useQueryClient} from 'react-query';

import flexxApiService from '@/flexxApi/flexxApiService';
import {QueryClientIds} from '@/QueryClient/queryClient.ids';

interface UseMoveMoneyMutationOptions {
  onSuccess?: (data: Transaction[]) => void;
  onError?: (error: Error) => void;
}

const useMoveMoneyMutation = (options?: UseMoveMoneyMutationOptions) => {
  const queryClient = useQueryClient();

  const {mutate, isLoading} = useMutation(
    (payload: MoveMoneyPayload) => flexxApiService().moveMoney(payload),
    {
      onSuccess: (data: Transaction[]) => {
        queryClient.invalidateQueries(QueryClientIds.ACCOUNTS);
        queryClient.invalidateQueries(QueryClientIds.ACCOUNT);
        queryClient.invalidateQueries(QueryClientIds.ACCOUNT_TRANSACTIONS);
        options?.onSuccess?.(data);
      },
      onError: (error: Error) => {
        options?.onError?.(error);
      },
    },
  );

  return {mutate, isLoading};
};

export default useMoveMoneyMutation;

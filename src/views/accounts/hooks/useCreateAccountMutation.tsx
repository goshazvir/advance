'use client';

import type {Account} from '@/domain/Account';

import {useMutation, useQueryClient} from 'react-query';

import {QueryClientIds} from '@/QueryClient/queryClient.ids';
import flexxApiService, {
  CreateAccountPayload,
} from '@/flexxApi/flexxApiService';

interface UseCreateAccountMutationOptions {
  onSuccess?: (data: Account) => void;
  onError?: (error: Error) => void;
}

const useCreateAccountMutation = (
  options?: UseCreateAccountMutationOptions,
) => {
  const queryClient = useQueryClient();

  const {mutate, isLoading} = useMutation(
    (payload: CreateAccountPayload) => flexxApiService().createAccount(payload),
    {
      onSuccess: (data: Account) => {
        queryClient.invalidateQueries(QueryClientIds.ACCOUNTS);
        options?.onSuccess?.(data);
      },
      onError: (error: Error) => {
        options?.onError?.(error);
      },
    },
  );

  return {mutate, isLoading};
};

export default useCreateAccountMutation;

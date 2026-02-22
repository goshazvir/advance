import {QueryClient} from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 3,
      onError: error => {
        console.error(
          '[QueryClient] Query error:',
          error instanceof Error ? error.message : error,
        );
      },
    },
    mutations: {
      onError: error => {
        console.error(
          '[QueryClient] Mutation error:',
          error instanceof Error ? error.message : error,
        );
      },
    },
  },
});

export default queryClient;

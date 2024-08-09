import React, { useState } from 'react';

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

export const CustomQueryClientProvider: React.FC<{
  children: React.ReactNode;
}> = props => {
  const { children } = props;
  const { enqueueSnackbar } = useSnackbar();

  const [reactQueryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: 1,
          },
        },
        queryCache: new QueryCache({
          onError: error => {
            enqueueSnackbar({
              message: (error as any)?.response?.data?.detail ?? 'Something went wrong',
              variant: 'error',
            });
          },
        }),
        mutationCache: new MutationCache({
          onError: error => {
            enqueueSnackbar({
              message: (error as any)?.response?.data?.detail ?? 'Something went wrong',
              variant: 'error',
            });
          },
        }),
      }),
  );

  return <QueryClientProvider client={reactQueryClient}>{children}</QueryClientProvider>;
};

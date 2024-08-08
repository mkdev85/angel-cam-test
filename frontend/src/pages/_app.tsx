import React, { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { AppProps } from 'next/app';

import '@angel/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const [reactQueryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={reactQueryClient}>
      <Component {...pageProps} />;
    </QueryClientProvider>
  );
}

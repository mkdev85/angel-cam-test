import React, { useState } from 'react';

import { ThemeProvider } from '@emotion/react';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { AppProps } from 'next/app';

import '@angel/styles/globals.css';
import { defaultTheme } from '@angel/ui-kit/theme';

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
    <ThemeProvider theme={defaultTheme}>
      <QueryClientProvider client={reactQueryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </HydrationBoundary>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

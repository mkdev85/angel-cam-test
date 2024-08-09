import React from 'react';

import { ThemeProvider } from '@emotion/react';
import { HydrationBoundary } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';

import type { AppProps } from 'next/app';

import { CustomQueryClientProvider } from '@angel/hoc/CustomQueryClientProvider';
import '@angel/styles/globals.css';
import { AppLayout } from '@angel/ui-kit/components/AppLayout/AppLayout';
import { defaultTheme } from '@angel/ui-kit/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <SnackbarProvider
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
      >
        <CustomQueryClientProvider>
          <HydrationBoundary state={pageProps.dehydratedState}>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </HydrationBoundary>
        </CustomQueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

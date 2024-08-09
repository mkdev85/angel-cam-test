import React from 'react';

import type { AppProps } from 'next/app';

import '@angel/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

import React from 'react';

import Head from 'next/head';

import { LoginPage } from '@angel/containers/login-page/LoginPage';

export default function Login() {
  return (
    <>
      <Head>
        <title>Angel Cam</title>
        <meta name="description" content="Angel Cam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LoginPage />
    </>
  );
}

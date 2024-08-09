import React from 'react';

import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { PrivateRoute } from '@angel/hoc/PrivateRoute';
import { PageLoading } from '@angel/ui-kit/components/PageLoading/PageLoading';

const SharedCameraPage = dynamic(
  async () =>
    import('@angel/containers/shared-camera-page/SharedCameraPage').then(
      module => module.SharedCameraPage,
    ),
  {
    ssr: false,
    loading: () => <PageLoading />,
  },
);

const SharedCamera: NextPage = props => {
  return (
    <>
      <Head>
        <title>Shared Camera | Angel Cam</title>
        <meta name="description" content="Shared Camera | Angel Cam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PrivateRoute>
        <SharedCameraPage />
      </PrivateRoute>
    </>
  );
};

export default SharedCamera;

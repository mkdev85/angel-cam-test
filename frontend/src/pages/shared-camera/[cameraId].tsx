import React from 'react';

import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { PrivateRoute } from '@angel/hoc/PrivateRoute';
import { PageLoading } from '@angel/ui-kit/components/PageLoading/PageLoading';

const RecordingPage = dynamic(
  async () =>
    import('@angel/containers/recording-page/RecordingPage').then(module => module.RecordingPage),
  {
    ssr: false,
    loading: () => <PageLoading />,
  },
);

const Recording: NextPage = props => {
  const router = useRouter();
  const cameraId = router.query.cameraId as string | undefined;

  return (
    <>
      <Head>
        <title>Recording | Angel Cam</title>
        <meta name="description" content="Recording | Angel Cam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PrivateRoute>
        <RecordingPage cameraId={cameraId} />
      </PrivateRoute>
    </>
  );
};

export default Recording;

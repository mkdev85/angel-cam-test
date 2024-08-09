import React from 'react';

import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

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
      <RecordingPage cameraId={cameraId} />
    </>
  );
};

export default Recording;

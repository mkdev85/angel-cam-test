import React from 'react';

import { NextPage } from 'next';
import dynamic from 'next/dynamic';

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
      <SharedCameraPage />
    </>
  );
};

export default SharedCamera;

import React from 'react';

import { Box, Typography } from '@mui/material';

import { useGetSharedCameraQuery } from '@angel/queries/useGetSharedCameraQuery';
import { PageLoading } from '@angel/ui-kit/components/PageLoading/PageLoading';

import type { SharedCameraPageProps } from './SharedCameraPage.props';
import { SharedCameraPageWrapper } from './SharedCameraPage.styles';
import { CameraCard } from './components/CameraCard/CameraCard';

export const SharedCameraPage: React.FC<SharedCameraPageProps> = props => {
  const { data: sharedCameraData, isLoading, isError } = useGetSharedCameraQuery();

  if (isLoading) {
    return <PageLoading />;
  }

  if (isError) {
    return (
      <Box padding={4}>
        <Typography align="center" variant="h4" color="red">
          Something went wrong...
        </Typography>
      </Box>
    );
  }

  if (sharedCameraData?.count === 0) {
    return (
      <Box padding={4}>
        <Typography align="center" variant="h4" color="red">
          No Camera Found...
        </Typography>
      </Box>
    );
  }

  return (
    <SharedCameraPageWrapper>
      {sharedCameraData?.results.map(item => (
        <CameraCard
          key={item.id}
          cameraId={item.id}
          title={item.name}
          ownerFirstName={item.owner.first_name}
          ownerLastName={item.owner.last_name}
          ownerEmail={item.owner.email}
          status={item.status}
          thumbnail={item.live_snapshot}
        />
      ))}
    </SharedCameraPageWrapper>
  );
};

SharedCameraPage.displayName = 'SharedCameraPage';

import React, { useState } from 'react';

import { Box, Typography } from '@mui/material';

import { useGetSharedCameraQuery } from '@angel/queries/useGetSharedCameraQuery';
import { PageLoading } from '@angel/ui-kit/components/PageLoading/PageLoading';

import type { RecordingPageProps } from './RecordingPage.props';
import { RecordingPageWrapper } from './RecordingPage.styles';
import { RecordingSection } from './components/RecordingSection/RecordingSection';

const VIDEO_FORMAT = 'mjpeg';
const PLACEHOLDER_VIDEO = '/images/video-placeholder.gif';

export const RecordingPage: React.FC<RecordingPageProps> = props => {
  const { cameraId } = props;
  const [videoSrc, setVideoSrc] = useState<string>(PLACEHOLDER_VIDEO);

  const { data: sharedCameraData, isLoading, isError } = useGetSharedCameraQuery();

  const currentCamera = sharedCameraData?.results.find(item => item.id === Number(cameraId));
  const videoStream = currentCamera?.streams.find(stream => stream.format === VIDEO_FORMAT);

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

  return (
    <RecordingPageWrapper>
      {videoStream?.url && (
        <img
          src={videoSrc}
          onLoad={() => setVideoSrc(videoStream.url)}
          onError={() => setVideoSrc(PLACEHOLDER_VIDEO)}
          className="video-stream"
        />
      )}

      <Box paddingY={10}>
        {currentCamera?.has_recording ? (
          <RecordingSection cameraId={currentCamera.id} />
        ) : (
          <Typography variant="h4" align="center">
            Has no recording
          </Typography>
        )}
      </Box>
    </RecordingPageWrapper>
  );
};

RecordingPage.displayName = 'RecordingPage';

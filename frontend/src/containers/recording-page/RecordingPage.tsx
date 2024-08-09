import React, { useState } from 'react';
import ReactPlayer from 'react-player';

import { Box, Typography } from '@mui/material';

import { useGetSharedCameraQuery } from '@angel/queries/useGetSharedCameraQuery';
import { PageLoading } from '@angel/ui-kit/components/PageLoading/PageLoading';

import type { RecordingPageProps } from './RecordingPage.props';
import { RecordingPageWrapper } from './RecordingPage.styles';
import { RecordingSection } from './components/RecordingSection/RecordingSection';

const VIDEO_FORMAT_MJPEG = 'mjpeg';
const VIDEO_FORMAT_HLS = 'hls';
const PLACEHOLDER_VIDEO = '/images/video-placeholder.gif';

export const RecordingPage: React.FC<RecordingPageProps> = props => {
  const { cameraId } = props;
  const [videoSrc, setVideoSrc] = useState<string>(PLACEHOLDER_VIDEO);

  const { data: sharedCameraData, isLoading, isError } = useGetSharedCameraQuery();

  const currentCamera = sharedCameraData?.results.find(item => item.id === Number(cameraId));
  const videoStreamMjpeg = currentCamera?.streams.find(
    stream => stream.format === VIDEO_FORMAT_MJPEG,
  );

  const videoStreamHls = currentCamera?.streams.find(stream => stream.format === VIDEO_FORMAT_HLS);

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
      {videoStreamHls ? (
        <ReactPlayer url={videoStreamHls?.url} controls width="100%" height={640} playing={true} />
      ) : (
        <>
          {videoStreamMjpeg && (
            <img
              src={videoSrc}
              onLoad={() => setVideoSrc(videoStreamMjpeg.url)}
              onError={() => setVideoSrc(PLACEHOLDER_VIDEO)}
              className="video-stream"
            />
          )}
        </>
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

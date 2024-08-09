import React from 'react';

import { Box, Grid } from '@mui/material';

import { useGetSegmentQuery } from '@angel/queries/useGetSegmentQuery';
import { Loader } from '@angel/ui-kit/components/Loader/Loader';

import { SegmentCard } from '../SegmentCard/SegmentCard';

import type { SegmentSectionProps } from './SegmentSection.props';
import { SegmentSectionWrapper } from './SegmentSection.styles';

export const SegmentSection: React.FC<SegmentSectionProps> = props => {
  const { cameraId, recordingTime } = props;
  const { start, end } = recordingTime;

  const { data: segmentData, isLoading } = useGetSegmentQuery({ cameraId, start, end });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <Loader />
      </Box>
    );
  }

  return (
    <SegmentSectionWrapper>
      <Grid container spacing={3} paddingTop={2}>
        {segmentData?.segments.map(item => (
          <Grid item xs={12} sm={6} key={item.start}>
            <SegmentCard key={item.start} cameraId={cameraId} start={item.start} end={item.end} />
          </Grid>
        ))}
      </Grid>
    </SegmentSectionWrapper>
  );
};

SegmentSection.displayName = 'SegmentSection';

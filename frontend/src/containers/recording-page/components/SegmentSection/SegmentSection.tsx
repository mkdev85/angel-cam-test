import React from 'react';

import { Box } from '@mui/material';

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
      {segmentData?.segments.map(item => <SegmentCard key={item.start} />)}
    </SegmentSectionWrapper>
  );
};

SegmentSection.displayName = 'SegmentSection';

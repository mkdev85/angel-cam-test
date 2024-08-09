import React from 'react';
import ReactPlayer from 'react-player';

import { useGetStreamQuery } from '@angel/queries/useGetStreamQuery';

import type { SegmentCardProps } from './SegmentCard.props';
import { SegmentCardWrapper } from './SegmentCard.styles';

export const SegmentCard: React.FC<SegmentCardProps> = props => {
  const { cameraId, start, end } = props;
  const { data: streamData } = useGetStreamQuery({ cameraId, start, end });

  return (
    <SegmentCardWrapper>
      <ReactPlayer url={streamData?.url} controls width="100%" height="100%" />
    </SegmentCardWrapper>
  );
};

SegmentCard.displayName = 'SegmentCard';

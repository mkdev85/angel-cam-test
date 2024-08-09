import React from 'react';

import type { SegmentCardProps } from './SegmentCard.props';
import { SegmentCardWrapper } from './SegmentCard.styles';

export const SegmentCard: React.FC<SegmentCardProps> = props => {
  return <SegmentCardWrapper>Hello SegmentCard!</SegmentCardWrapper>;
};

SegmentCard.displayName = 'SegmentCard';

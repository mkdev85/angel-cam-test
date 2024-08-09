import React, { useState } from 'react';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { getDailyRecordingTime } from '@angel/helpers/getDailyRecordingTime';
import { useGetRecordingQuery } from '@angel/queries/useGetRecordingQuery';
import { Loader } from '@angel/ui-kit/components/Loader/Loader';

import type { RecordingSectionProps } from './RecordingSection.props';
import { RecordingSectionWrapper } from './RecordingSection.styles';

export const RecordingSection: React.FC<RecordingSectionProps> = props => {
  const { cameraId } = props;

  const [currentSegment, setCurrentSegment] = useState<string>();

  const { data: recordingData, isLoading } = useGetRecordingQuery({ cameraId });
  const { recording_start, recording_end } = recordingData || {};

  const menuList = getDailyRecordingTime(recording_start, recording_end);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <RecordingSectionWrapper>
      <FormControl fullWidth>
        <InputLabel id="segment-select-label">Date</InputLabel>
        <Select
          id="segment-select"
          value={currentSegment}
          label="Date"
          onChange={event => setCurrentSegment(event.target.value)}
        >
          {menuList?.map((item, index) => <MenuItem value={10}>Day-{index + 1}</MenuItem>)}
        </Select>
      </FormControl>
    </RecordingSectionWrapper>
  );
};

RecordingSection.displayName = 'RecordingSection';

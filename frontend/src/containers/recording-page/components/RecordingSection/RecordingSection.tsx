import React, { useState } from 'react';

import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import moment from 'moment';

import { getDailyRecordingTime } from '@angel/helpers/getDailyRecordingTime';
import type { RecordingTime } from '@angel/interfaces/RecordingTime';
import { useGetRecordingQuery } from '@angel/queries/useGetRecordingQuery';
import { Loader } from '@angel/ui-kit/components/Loader/Loader';

import { SegmentSection } from '../SegmentSection/SegmentSection';

import type { RecordingSectionProps } from './RecordingSection.props';
import { RecordingSectionWrapper } from './RecordingSection.styles';

export const RecordingSection: React.FC<RecordingSectionProps> = props => {
  const { cameraId } = props;

  const [recordingTime, setRecordingTime] = useState<RecordingTime | null>(null);

  const { data: recordingData, isLoading } = useGetRecordingQuery({ cameraId });
  const { recording_start: recordingStart, recording_end: recordingEnd } = recordingData ?? {};

  const recordingList = getDailyRecordingTime(recordingStart, recordingEnd)?.reverse();

  if (!recordingTime && recordingList?.length) {
    setRecordingTime(recordingList[0]);
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <Loader />
      </Box>
    );
  }

  return (
    <RecordingSectionWrapper>
      <Box className="recording-list">
        <Typography variant="h4">Recording time</Typography>

        <FormControl className="dropdown-wrapper">
          <InputLabel id="segment-select-label">Date</InputLabel>
          <Select
            id="segment-select"
            value={JSON.stringify(recordingTime)}
            label="Date"
            onChange={event => setRecordingTime(JSON.parse(event.target.value))}
          >
            {recordingList?.map((item, index) => (
              <MenuItem key={index} value={JSON.stringify(item)}>
                {moment(item.start).format('Do MMM, YYYY - HH:mm:ss')} to{' '}
                {moment(item.end).format('Do MMM, YYYY - HH:mm:ss')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {recordingTime && (
        <Box paddingTop={2}>
          <SegmentSection cameraId={cameraId} recordingTime={recordingTime} />
        </Box>
      )}
    </RecordingSectionWrapper>
  );
};

RecordingSection.displayName = 'RecordingSection';

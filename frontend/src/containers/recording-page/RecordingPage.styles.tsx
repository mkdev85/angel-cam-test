import { styled } from '@mui/material';

export const RecordingPageWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(5, 10),

  '& .video-stream': {
    width: '100%',
    maxHeight: theme.spacing(80),
  },
}));

import { styled } from '@mui/material';

export const RecordingSectionWrapper = styled('div')(({ theme }) => ({
  '& .recording-list': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: ' space-between',
  },

  '& .dropdown-wrapper': {
    minWidth: theme.spacing(40),
  },
}));

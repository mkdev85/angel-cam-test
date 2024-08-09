import { styled } from '@mui/material';

export const CameraCardWrapper = styled('div')(({ theme }) => ({
  width: '100%',

  '& .camera-card': {
    cursor: 'pointer',
  },
}));

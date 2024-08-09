import { styled } from '@mui/material';

export const LoaderWrapper = styled('div')(({ theme }) => ({
  '& .hide-svg': {
    width: theme.spacing(0),
    height: theme.spacing(0),
  },
}));

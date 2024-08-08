import { styled } from '@mui/material';

import { colors } from '@angel/ui-kit/theme';

export const LoginPageWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(5),
  maxWidth: theme.spacing(75),
  margin: 'auto',

  '& .avatar-wrapper': {
    margin: theme.spacing(1),
    backgroundColor: colors.purple,
  },

  '& .button': {
    marginTop: theme.spacing(3),
  },
  '& .sign-in-form': {
    width: '100%',
  },
}));

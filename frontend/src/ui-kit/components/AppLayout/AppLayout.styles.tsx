import { styled } from '@mui/material';

import { colors } from '@angel/ui-kit/theme';

export const AppLayoutWrapper = styled('div')(({ theme }) => ({
  '& .logout-btn': {
    backgroundColor: colors.white950,

    '&:hover': {
      backgroundColor: colors.white,
    },
  },
}));

import { Button as MuiButton, styled } from '@mui/material';

import { colors } from '@angel/ui-kit/theme';

export const StyledButton = styled(MuiButton)(({ theme }) => ({
  '&.loading-btn': {
    backgroundColor: `${colors.black200} !important`,
    color: colors.white,
    fill: colors.white,
  },
  '& .progress-skin': {
    width: '100%',
    height: '100%',
    backgroundColor: colors.black200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    inset: theme.spacing(0),
    '& .MuiCircularProgress-root': {
      width: '100% !important',
      maxWidth: `${theme.spacing(1.5)} !important`,
      height: '100% !important',
      maxHeight: `${theme.spacing(1.5)} !important`,
      color: colors.white,
      '& svg': {
        stroke: colors.primary,
      },
    },
  },
}));

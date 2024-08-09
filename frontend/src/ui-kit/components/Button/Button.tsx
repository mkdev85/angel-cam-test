import React from 'react';

import { Box, CircularProgress } from '@mui/material';

import type { ButtonProps } from './Button.props';
import { StyledButton } from './Button.styles';

export const Button: React.FC<ButtonProps> = props => {
  const { children, className, loading = false, ...rest } = props;
  const rootCX = `${className} ${loading ? 'loading-btn' : ''}`;

  return (
    <StyledButton className={rootCX} {...rest}>
      {children}
      {loading && (
        <Box className="progress-skin">
          <CircularProgress />
        </Box>
      )}
    </StyledButton>
  );
};

Button.displayName = 'Button';

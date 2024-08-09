import React from 'react';

import { AppBar, Box, CssBaseline, Toolbar, Typography } from '@mui/material';

import type { AppLayoutProps } from './AppLayout.props';
import { AppLayoutWrapper } from './AppLayout.styles';

export const AppLayout: React.FC<AppLayoutProps> = props => {
  const { children } = props;

  return (
    <AppLayoutWrapper>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Angel Cam
          </Typography>
        </Toolbar>
      </AppBar>

      <Box component="main">
        <Toolbar />
        {children}
      </Box>
    </AppLayoutWrapper>
  );
};

AppLayout.displayName = 'AppLayout';

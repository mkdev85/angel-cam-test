import React from 'react';

import { AppBar, Box, Button, CssBaseline, Toolbar, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import { useRouter } from 'next/router';

import { routes } from '@angel/hooks/routes';
import { useRoutes } from '@angel/hooks/useRoutes';
import Auth from '@angel/lib/auth';

import type { AppLayoutProps } from './AppLayout.props';
import { AppLayoutWrapper } from './AppLayout.styles';

export const AppLayout: React.FC<AppLayoutProps> = props => {
  const { children } = props;
  const router = useRouter();

  const { gotoLoginPage } = useRoutes();
  const { enqueueSnackbar } = useSnackbar();

  const showLogoutButton = router.asPath !== routes.loginPage;

  const onLogoutClick = async () => {
    Auth.removeToken();
    await gotoLoginPage();

    enqueueSnackbar({
      message: 'Logout Successfully',
      variant: 'success',
    });
  };

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

          {showLogoutButton && (
            <Button variant="text" className="logout-btn" onClick={onLogoutClick}>
              LogOut
            </Button>
          )}
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

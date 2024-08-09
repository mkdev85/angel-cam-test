import { useSnackbar } from 'notistack';

import Auth from '@angel/lib/auth';

import { useOnMount } from './useOnMount';
import { useRoutes } from './useRoutes';

/**
 * Custom hook for checking user authorization status.
 * @returns {boolean} `true` if the user is authorized, `false` otherwise.
 */
export const useAuth = (): boolean => {
  const { gotoLoginPage } = useRoutes();
  const { enqueueSnackbar } = useSnackbar();

  const isLocalStorageAvailable = 'localStorage' in globalThis;

  useOnMount(() => {
    if (!Auth.isTokenValid) {
      gotoLoginPage().then(() =>
        enqueueSnackbar({
          message: 'Please Login!!',
          variant: 'error',
          preventDuplicate: true,
        }),
      );
    }
  });

  // To ensure that localStorage is accessible, as we are using the Auth class here.
  if (isLocalStorageAvailable) {
    return Auth.isTokenValid;
  }

  return false;
};

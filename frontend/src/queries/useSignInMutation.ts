import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { useRoutes } from '@angel/hooks/useRoutes';
import api from '@angel/lib/api';
import Auth from '@angel/lib/auth';
import type { ReactQueryMutateOptions } from '@angel/lib/react-query';

type MutateOptions = ReactQueryMutateOptions<BackendResponse, unknown, MutationInput>;

export interface MutationInput {
  token: string;
}

export interface BackendResponse {
  accessToken: string;
}

export function useSignupMutation(options?: MutateOptions) {
  const { enqueueSnackbar } = useSnackbar();
  const { gotoSharedCameraPage } = useRoutes();

  return useMutation<BackendResponse, unknown, MutationInput>({
    mutationKey: ['signin'],
    mutationFn: async input => {
      const response = await api.post('/user/login/', input);

      if (!response.data) {
        return Promise.reject(response);
      }

      return response.data as BackendResponse;
    },
    onSuccess: data => {
      Auth.setToken(data.accessToken);

      enqueueSnackbar({
        message: 'Login successfully',
        variant: 'success',
      });

      gotoSharedCameraPage();
    },
    onError: error => {
      enqueueSnackbar({
        message: (error as any)?.response?.data?.error ?? 'Something went wrong!!',
        variant: 'error',
      });
    },
    ...options,
  });
}

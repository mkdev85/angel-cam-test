import { useQuery } from '@tanstack/react-query';

import api from '@angel/lib/api';
import type { ReactQueryOptions } from '@angel/lib/react-query';

interface GetStreamQueryParams {
  cameraId: number;
  start: string;
  end: string;
}

interface BackendResponse {
  format: string;
  url: string;
  stream_info: string;
  stream_controls: {
    base_url: string;
    play: string;
    pause: string;
    speed: string;
  };
}

export function getGetStreamQuery(params: GetStreamQueryParams) {
  const { cameraId, start, end } = params;

  const queryKey = ['get-stream', params];
  const queryFn = async () => {
    const response = await api.get(
      `user/shared-cameras/${cameraId}/recording/stream?start=${start}&end=${end}`,
    );

    if (!response.data) {
      return Promise.reject(response);
    }
    return response.data as BackendResponse;
  };

  return {
    queryKey,
    queryFn,
  };
}

export function useGetStreamQuery(
  params: GetStreamQueryParams,
  options: ReactQueryOptions<BackendResponse> = {},
) {
  const { queryKey, queryFn } = getGetStreamQuery(params);

  const query = useQuery({
    queryKey,
    queryFn,
    ...options,
  });

  return query;
}

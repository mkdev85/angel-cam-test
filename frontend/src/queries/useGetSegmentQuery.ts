import { useQuery } from '@tanstack/react-query';

import api from '@angel/lib/api';
import type { ReactQueryOptions } from '@angel/lib/react-query';

interface GetSegmentQueryParams {
  cameraId: number;
  start: string;
  end: string;
}

interface Segment {
  start: string;
  end: string;
}

interface BackendResponse {
  start: string;
  end: string;
  segments: Segment[];
}

export function getGetSegmentQuery(params: GetSegmentQueryParams) {
  const { cameraId, start, end } = params;

  const queryKey = ['get-segment', params];
  const queryFn = async () => {
    const response = await api.get(
      `shared-cameras/${cameraId}/recording/timeline?start=${start}&end=${end}`,
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

export function useGetSegmentQuery(
  params: GetSegmentQueryParams,
  options: ReactQueryOptions<BackendResponse> = {},
) {
  const { queryKey, queryFn } = getGetSegmentQuery(params);

  const query = useQuery({
    queryKey,
    queryFn,
    ...options,
  });

  return query;
}

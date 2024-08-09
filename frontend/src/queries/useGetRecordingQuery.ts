import { useQuery } from '@tanstack/react-query';

import api from '@angel/lib/api';
import type { ReactQueryOptions } from '@angel/lib/react-query';

interface GetRecordingQueryParams {
  cameraId: number;
}

interface RecordingBackendResponse {
  status: string;
  retention: string;
  deactivated_at: string | null;
  recording_start: string;
  recording_end: string;
}

export function getGetRecordingQuery(params: GetRecordingQueryParams) {
  const queryKey = ['get-recording', params];
  const queryFn = async () => {
    const response = await api.get(`shared-cameras/${params.cameraId}/recording`);

    if (!response.data) {
      return Promise.reject(response);
    }
    return response.data as RecordingBackendResponse;
  };

  return {
    queryKey,
    queryFn,
  };
}

export function useGetRecordingQuery(
  params: GetRecordingQueryParams,
  options: ReactQueryOptions<RecordingBackendResponse> = {},
) {
  const { queryKey, queryFn } = getGetRecordingQuery(params);

  const query = useQuery({
    queryKey,
    queryFn,
    enabled: !!params.cameraId,
    ...options,
  });

  return query;
}

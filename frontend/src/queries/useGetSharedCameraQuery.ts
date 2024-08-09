import { useQuery } from '@tanstack/react-query';

import api from '@angel/lib/api';
import type { ReactQueryOptions } from '@angel/lib/react-query';

interface Application {
  code: string;
}

interface VideoData {
  format: string;
  url: string;
}

interface Owner {
  email: string;
  first_name: string;
  last_name: string;
}

interface SharedCameraResult {
  id: number;
  name: string;
  type: string;
  snapshot: VideoData;
  status: string;
  live_snapshot: string;
  streams: VideoData[];
  applications: Application[];
  owner: Owner;
  has_recording: false;
  has_notifications: false;
  audio_enabled: true;
  low_latency_enabled: true;
}

interface SharedCameraBackendResponse {
  count: number;
  next: null;
  previous: null;
  results: SharedCameraResult[];
}

export function getGetSharedCameraQuery() {
  const queryKey = ['get-shared-camera'];
  const queryFn = async () => {
    const response = await api.get('/shared-cameras/');

    if (!response.data) {
      return Promise.reject(response);
    }
    return response.data as SharedCameraBackendResponse;
  };

  return {
    queryKey,
    queryFn,
  };
}

export function useGetSharedCameraQuery(
  options: ReactQueryOptions<SharedCameraBackendResponse> = {},
) {
  const { queryKey, queryFn } = getGetSharedCameraQuery();

  const query = useQuery({
    queryKey,
    queryFn,
    staleTime: 2 * 60 * 1000,
    ...options,
  });

  return query;
}

import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import Auth from './auth';

export const handleResponse = (response: AxiosResponse) => {
  return response;
};

// eslint-disable-next-line @typescript-eslint/promise-function-async
export const handleResponseError = (error: AxiosError) => {
  if (error.response) {
    console.log('HTTP Error:', error.response.status);
  } else if (error.request) {
    console.log('Network Error', error.request);
  } else {
    console.log(error.message);
  }

  return Promise.reject(error);
};

export const handleRequest = (config: InternalAxiosRequestConfig) => {
  const token = Auth.getToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// eslint-disable-next-line @typescript-eslint/promise-function-async
export const handleRequestError = (error: AxiosError) => {
  return Promise.reject(error);
};

import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

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
  config.headers.Authorization = `PersonalAccessToken 7e8ef344f958481e8e19094328e526da709c9266`;
  return config;
};

// eslint-disable-next-line @typescript-eslint/promise-function-async
export const handleRequestError = (error: AxiosError) => {
  return Promise.reject(error);
};

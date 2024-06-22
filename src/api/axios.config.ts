import axios, { AxiosError } from 'axios';

const catFactInstance = axios.create({
  baseURL: 'https://catfact.ninja',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const randomUserInstance = axios.create({
  baseURL: 'https://randomuser.me/api',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const errorInterceptor = (error: AxiosError) => {
  console.log('interceptor error:', error);
  if (error.response) {
    console.error('Error response:', {
      status: error.response.status,
      data: error.response.data,
    });
  } else if (error.request) {
    console.error('No response received:', error.request);
  } else {
    console.error('Error setting up request:', error.message);
  }
  return Promise.reject(error);
};

catFactInstance.interceptors.response.use((response) => response, errorInterceptor);

randomUserInstance.interceptors.response.use((response) => response, errorInterceptor);

export { catFactInstance, randomUserInstance };

import Axios from 'axios';
import { API_URL } from '@/lib/urls';

const isServer = typeof window === 'undefined';

const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  // Accept: 'application/json, text/plain, */*',
  withCredentials: true,
});

axios.interceptors.request.use(async (config) => {
  if (isServer) {
    const { cookies } = await import('next/headers');
    const cookieString = cookies().toString();
    if (cookieString) {
      config.headers.Cookie = cookieString;
    }
  }

  // outher base url
  // if (config.url?.startsWith('/modules-web')) {
  //   config.baseURL = MODULES_WEB_API_URL;
  // }

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const logoutPath = '/next-api/logout';

      if (isServer) {
        const { redirect } = await import('next/navigation');
        redirect(logoutPath);
      } else {
        window.location.href = logoutPath;
      }
    }

    if (process.env.NODE_ENV === 'development') {
      console.error('Axios Error:', error);
    }

    return Promise.reject(error);
  },
);

export { axios };

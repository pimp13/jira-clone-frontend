import Axios from 'axios';
import { API_URL } from '@/lib/urls';

const isServer = typeof window == 'undefined';

const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

axios.interceptors.request.use(async (config) => {
  if (isServer) {
    const { cookies } = await import('next/headers');
    const cookieList = (await cookies()).toString();

    if (cookieList) {
      config.headers['Cookie'] = cookieList;
    }
  }

  //   if (config.url?.startsWith("/modules-web")) {
  //     config.baseURL = MODULES_WEB_API_URL;
  //   } else if (config.url?.startsWith("/go-production")) {
  //     config.baseURL = MODULES_PRODUCTION_API_URL;
  //   } else {
  //     config.baseURL = API_URL;
  //   }

  return config;
});

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      if (!isServer) {
        window.location.href = '/next-api/logout';
      } else {
        const { redirect } = await import('next/navigation');

        redirect('/next-api/logout');
      }
      console.log('client 401 detected');
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('error🛑:', error);
    }
    return Promise.reject(error);
  },
);

export { axios };

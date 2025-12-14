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
    const status = error.response?.status;

    if (status === 401) {
      // فقط در کلاینت‌ساید redirect کنیم
      if (!isServer) {
        // بهترین روش در App Router: استفاده از replace برای جلوگیری از برگشت به صفحه قبلی
        window.location.replace('/sign-in');
        // یا اگر می‌خوای query string هم بفرستی (مثل redirect_back)
        // window.location.replace(`/sign-in?redirect=${encodeURIComponent(window.location.pathname)}`);
      }
      // اگر در سرور بود (مثل getServerSideProps یا Server Component fetch)، خطا رو پرتاب می‌کنیم
      // تا صفحه 401 یا redirect در middleware یا layout مدیریت بشه (بهتره اونجا هندل کنی)
    }

    // لاگ فقط در development
    if (process.env.NODE_ENV === 'development') {
      console.error('Axios Error:', error);
    }

    return Promise.reject(error);
  },
);

export { axios };

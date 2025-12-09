import { getEnv } from '@/lib/get-env';

export const API_URL =
  getEnv('NEXT_PUBLIC_BASE_GO_BACKEND_API') === 'UNKNOWN'
    ? 'http://127.0.0.1:5001/api'
    : getEnv('NEXT_PUBLIC_API_URL');

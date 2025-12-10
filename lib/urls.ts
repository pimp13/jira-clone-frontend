import { getPublicEnv } from './get-env';

export const API_URL = getPublicEnv('NEXT_PUBLIC_API_URL');

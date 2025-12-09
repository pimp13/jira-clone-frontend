type EnvsType =
  | 'NEXT_PUBLIC_BASE_GO_BACKEND_API'
  | 'NEXT_PUBLIC_API_URL'
  | 'NEXT_PUBLIC_SERVER_SIDE_URL'
  | 'NEXT_PUBLIC_BASE_FAKE_API';

export const getEnv = (name: EnvsType): string => {
  return process.env[name] || 'UNKNOWN';
};

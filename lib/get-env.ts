type EnvsType =
  | 'NEXT_PUBLIC_API_URL'
  | 'NEXT_PUBLIC_BASE_GO_BACKEND_API'
  | 'NEXT_PUBLIC_SERVER_SIDE_URL'
  | 'NEXT_PUBLIC_BASE_FAKE_API'
  | 'NEXT_PUBLIC_NODE_ENV';

const publicEnvs = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL!,
  NEXT_PUBLIC_BASE_GO_BACKEND_API: process.env.NEXT_PUBLIC_BASE_GO_BACKEND_API!,
  NEXT_PUBLIC_SERVER_SIDE_URL: process.env.NEXT_PUBLIC_SERVER_SIDE_URL!,
  NEXT_PUBLIC_BASE_FAKE_API: process.env.NEXT_PUBLIC_BASE_FAKE_API!,
  NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV!,
} as const;

export const getPublicEnv = (name: EnvsType): string => {
  const value = publicEnvs[name];

  if (!value) {
    throw new Error(`Environment variable ${name} is missing or empty`);
  }

  return value;
};

export const getServerEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Server environment variable ${name} is missing`);
  }

  return value;
};

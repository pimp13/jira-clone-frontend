import type { NextConfig } from 'next';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5001',
        pathname: '/uploads/images/**',
      },
      {
        protocol: 'http',
        hostname: 'http://127.0.0.1',
        port: '1152',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

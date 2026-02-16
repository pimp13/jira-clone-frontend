import type { NextConfig } from 'next';

const nextConfig = {
  basePath: '/jira',
  assetPrefix: '/jira/',
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
      {
        protocol: "https",
        hostname: "https://127.0.0.1",
        port: "4224",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

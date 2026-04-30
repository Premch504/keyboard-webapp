import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  ...(isProd && {
    basePath: '/keyboard-webapp',
    assetPrefix: '/keyboard-webapp',
  }),
  images: {
    unoptimized: true,
  },
  ...(isProd && {
    trailingSlash: true,
  }),
};

export default nextConfig;

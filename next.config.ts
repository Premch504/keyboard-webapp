import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/keyboard-webapp',
  assetPrefix: '/keyboard-webapp',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;

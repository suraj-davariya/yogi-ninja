import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/yogi-ninja',
  assetPrefix: '/yogi-ninja/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

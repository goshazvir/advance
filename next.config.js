'use strict';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH || '',

  redirects: async () => {
    return [];
  },

  reactStrictMode: false,

  output: 'standalone',

  productionBrowserSourceMaps: false,

  experimental: {
    serverActions: {
      bodySizeLimit: '6mb',
    },
    turbo: {
      resolveAlias: {
        underscore: 'lodash',
      },
      resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json'],
    },
  },
};

export default nextConfig;

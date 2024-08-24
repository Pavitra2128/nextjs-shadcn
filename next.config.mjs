/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'hi', 'te'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer && config.node) {
      delete config.node.net;
      delete config.node.fs;
    }
    return config;
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {};
module.exports = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.node = {
          net: 'empty',
        };
      }
      return config;
    },
  };
  
export default nextConfig;

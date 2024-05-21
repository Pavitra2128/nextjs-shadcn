/** @type {import('next').NextConfig} */
const nextConfig = {
        webpack: (config, { isServer }) => {
          if (!isServer) {
            config.node = {
              net: 'empty',
              fs:'empty',
            };
          }
          return config;
        },
      };
      
export default nextConfig;

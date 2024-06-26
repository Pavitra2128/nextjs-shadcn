/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer && config.node) {
        // Check if config.node is defined before accessing its properties
        delete config.node.net;
        delete config.node.fs;
      }
      return config;
    },
  };
  
  export default nextConfig;
  
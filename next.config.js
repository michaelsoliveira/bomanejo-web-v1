const withFonts = require('next-fonts');
const nextConfig = withFonts({
  //webpack: (config, { isServer }) => {
  //  if (!isServer) {
  //    config.resolve = {
  //      ...config.resolve,
  //      fallback: {
  //        ...config.resolve.fallback,
  //        child_process: false,
  //        fs: false,
  //        'builtin-modules': false,
  //        worker_threads: false,
  //      },
  //    }
  //  }
  //  return config;
  //},
  
  images: {
    domains: ['images.unsplash.com', 'placeimg.com', 'www.revixpert.ch'],
  },
  output: 'standalone',
})

module.exports = nextConfig

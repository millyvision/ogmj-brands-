/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ogmj/ui', '@ogmj/utils', '@ogmj/db'],
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
}

module.exports = nextConfig

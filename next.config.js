/** @type {import('next').NextConfig} */
const nextConfig = {
  /* i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  }, */

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.placeholder.com',
      },
    ],
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer(nextConfig);

/* module.exports = nextConfig; */

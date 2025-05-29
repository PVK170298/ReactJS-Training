// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Option 1: Use domains array (legacy for Next.js < 13)
    // If you are on an older Next.js version or prefer this syntax:
    // domains: ['placehold.co'],

    // Option 2: Recommended for Next.js 13+ (App Router) - remotePatterns
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '', // Leave empty unless a specific port is required
        pathname: '/**', // Allows any path on this hostname
      },
      // Add other remote image domains here if needed, e.g.:
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      // },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
  },
};

module.exports = nextConfig;



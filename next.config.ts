/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@clerk/nextjs'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
    ],
  },
};

export default nextConfig;
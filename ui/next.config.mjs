/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: 'api-mainnet.suifrens.sui.io',
      },
    ],
  },
};

export default nextConfig;

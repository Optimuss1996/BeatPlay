/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public", // Service worker location
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // Disable in dev
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gdyieqxwsjxmucdfavyi.supabase.co",
      },
      {
        protocol: "https",
        hostname: "cdn-images.dzcdn.net",
      },
    ],
  },
};
module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  nextConfig,
});

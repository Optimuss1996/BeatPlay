/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public", // Service worker location
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // Disable in dev
});

const nextConfig = {
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

// /** @type {import('next').NextConfig} */
// const withPWA = require("next-pwa")({
//   dest: "public", // Service worker location
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV === "development", // Disable in dev
// });

// const nextConfig = withPWA({
//   reactStrictMode: true,
//   experimental: {
//     serverActions: true, // if you're using it
//     // other Next.js 15 features
//   },
// });

module.exports = nextConfig;

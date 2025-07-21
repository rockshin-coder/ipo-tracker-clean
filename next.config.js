/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      NEXT_PUBLIC_FINNHUB_API_KEY: process.env.NEXT_PUBLIC_FINNHUB_API_KEY,
      NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE,
    },
  };
  
  module.exports = nextConfig;
  
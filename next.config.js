/** @type {import('next').NextConfig} */
module.exports = {
  nextConfig: {
    reactStrictMode: true,
    swcMinify: true,
  },
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SNDER_ID: process.env.FIREBASE_MESSAGING_SNDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  },
};

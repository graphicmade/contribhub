/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/umami/script.js",
        destination: `https://eu.umami.is/script.js`,
      },
      {
        source: "/umami/api/send",
        destination: `https://eu.umami.is/api/send`,
      },
    ];
  },
};

export default nextConfig;

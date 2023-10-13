/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/_redirects",
        destination: "/api/redirects",
      },
    ];
  },
};

module.exports = nextConfig;

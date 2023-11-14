/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
    serverComponentsExternalPackages: ["mongoose", "i.pinimg.com"],
  },
};

module.exports = nextConfig;

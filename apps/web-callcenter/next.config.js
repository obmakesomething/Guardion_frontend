/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/domain", "@repo/api-client", "@repo/auth"]
};

module.exports = nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      // /checkout was a non-functional mock — real booking flow is /booking/[roomId]
      {
        source: "/checkout",
        destination: "/rooms",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

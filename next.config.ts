import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.vgchartz.com",
      },
      {
        protocol: "https",
        hostname: "media.rawg.io",
      },
    ],
  },
};

export default nextConfig;

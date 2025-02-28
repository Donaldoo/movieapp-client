import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "upload.wikimedia.org",
        protocol: "https"
      },
      {
        hostname: "i.ytimg.com",
        protocol: "https"
      },
      {
        hostname: "img.jakpost.net",
        protocol: "https"
      },
      {
        hostname: "i.vimeocdn.com",
        protocol: "https"
      }
    ]
  }
};

export default nextConfig;

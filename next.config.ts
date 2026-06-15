import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mokleofznwzwocukeckj.supabase.co",
      },
    ],
  },
};

export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  allowedDevOrigins: ["192.168.1.12", "localhost", "127.0.0.1"]
};

export default nextConfig;

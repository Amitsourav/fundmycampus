import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    const courses = ["bca", "mba", "btech", "mbbs", "bba", "bds", "ca", "bsc-nursing", "hotel-management"];
    return courses.map((course) => ({
      source: `/courses-loan/${course}`,
      destination: `/loan-for-${course}`,
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
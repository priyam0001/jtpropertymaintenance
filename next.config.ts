import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Old-site URLs keep their ranking (example: an old Wix /contact-us page). Next issues 308 for permanent redirects; search engines treat it as a 301.
  async redirects() {
    return [{ source: "/contact-us", destination: "/contact", permanent: true }];
  },
};

export default nextConfig;

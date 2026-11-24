import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Case studies that were merged into one: old slug -> new slug.
const renamedProjects: Record<string, string> = {
  "torch-core-backend": "torch",
  "torch-business-os": "torch",
  "studio-system": "studio-platform",
  "studio-client-portal": "studio-platform",
};

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "three",
    ],
  },
  transpilePackages: ["three"],
  async redirects() {
    return Object.entries(renamedProjects).flatMap(([from, to]) =>
      ["", "/ar"].map((prefix) => ({
        source: `${prefix}/projects/${from}`,
        destination: `${prefix}/projects/${to}`,
        permanent: true,
      })),
    );
  },
};

export default withNextIntl(nextConfig);

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      new URL('https://files.edgestore.dev/5tnrgl2duyd3mw9d/projectImages/_public/**'),
      // Showcase screenshots committed in my own GitHub repos
      new URL('https://raw.githubusercontent.com/mohammad-al-asad/**'),
    ],
  },
};

export default nextConfig;

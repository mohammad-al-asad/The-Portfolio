import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Let the dev server answer my phone over Tailscale (live reload, dev assets)
  allowedDevOrigins: ["100.124.123.119"],
  images: {
    // Qualities used by <Image quality>: the default, and 90 for the hero photo
    qualities: [75, 90],
    remotePatterns: [
      new URL('https://files.edgestore.dev/5tnrgl2duyd3mw9d/projectImages/_public/**'),
      new URL('https://files.edgestore.dev/5tnrgl2duyd3mw9d/qualificationImages/_public/**'),
      // Showcase screenshots committed in my own GitHub repos
      new URL('https://raw.githubusercontent.com/mohammad-al-asad/**'),
    ],
  },
};

export default nextConfig;

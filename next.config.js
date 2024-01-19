/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/shop",
        permanent: false,
      },
      {
        source: "/admin",
        destination: "/admin/products",
        permanent: false,
      },
    ];
  },

  images: {
    // The `remotePatterns` array allows Next.js to optimize images from external sources.
    // Each object in the array represents a pattern for the URLs of the images that should be optimized.
    remotePatterns: [
      {
        // The `protocol` property specifies the protocol of the URLs. In this case, it's "https".
        protocol: "https",
        // The `hostname` property specifies the hostname of the URLs. In this case, it's the hostname of your Vercel Blob Storage.
        // So, any image from "https://k4jlln3aspazn4y4.public.blob.vercel-storage.com" will be optimized by Next.js.
        hostname: "k4jlln3aspazn4y4.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "tailwindui.com",
      },
    ],
  },
};

export default config;

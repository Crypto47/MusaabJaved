import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "medium.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn-images-1.medium.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "substackcdn.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "substack-post-media.s3.amazonaws.com",
        pathname: "**",
      },
    ],
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default withMDX(nextConfig);

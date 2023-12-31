/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      loaders: {
        // Option format
        ".md": [
          {
            loader: "@mdx-js/loader",
            options: {
              format: "md",
            },
          },
        ],
        // Option-less format
        ".mdx": ["@mdx-js/loader"],
      },
    },
  },
};

module.exports = nextConfig;

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
      { 
        hostname: "wdl83yzlweuyqze5.public.blob.vercel-storage.com",
        protocol: "https",
      },
      {
        hostname: "public.blob.vercel-storage.com",
        protocol: "https",
      },
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
      },
      {
        hostname: "abs.twimg.com",
        protocol: "https",
      },
      {
        hostname: "pbs.twimg.com",
        protocol: "https",
      },
      {
        hostname: "avatar.vercel.sh",
        protocol: "https",
      },
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
      },
      {
        hostname: "www.google.com",
        protocol: "https",
      },
      {
        hostname: "flag.vercel.app",
        protocol: "https",
      },
      {
        hostname: "illustrations.popsy.co",
        protocol: "https",
      },
    ],
  
  },
  reactStrictMode: false,
};

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gnmpzioggytlqzekuyuo.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/avatars/**'
      }
    ]
  }
}

module.exports = nextConfig

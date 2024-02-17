/** @type {import('next').NextConfig} */


const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'gnmpzioggytlqzekuyuo.supabase.co',
                port: '',
                pathname: '/storage/v1/object/sign/avatars/**',
            }
        ]
    }
};

module.exports = nextConfig;

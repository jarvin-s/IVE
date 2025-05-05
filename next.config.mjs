/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tplxojqgltlnpwuennfc.supabase.co',
                pathname: '/**',
            },
        ],
    },
}

export default nextConfig

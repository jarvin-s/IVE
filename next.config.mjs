/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'czqrvqtikoxlxkaklyti.supabase.co',
                pathname: '/**',
            },
        ],
    },
}

export default nextConfig

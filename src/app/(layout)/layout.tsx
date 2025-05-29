import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'
import '@/app/globals.css'
import Navbar from '@/components/Header/Navbar'
import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/react'

const inter_tight = Inter_Tight({
    weight: ['200', '300', '400', '500', '600', '700', '800'],
    subsets: ['latin'],
})

export const metadata: Metadata = {
    metadataBase: new URL('https://diveintoive.world'),
    title: 'IVE 아이브 | DIVE INTO IVE',
    description:
        'A collection of stats, insights, and a fun quiz for IVE fans to enjoy!',
    openGraph: {
        images: [
            {
                url: '/images/logo.png',
            },
        ],
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClerkProvider>
            <html lang='en'>
                <body className={`${inter_tight.className}`}>
                    <Navbar />
                    {children}
                    <Analytics />
                </body>
            </html>
        </ClerkProvider>
    )
}

import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'
import '@/app/globals.css'
import { ClerkProvider } from '@clerk/nextjs'

const inter_tight = Inter_Tight({
    weight: ['200', '300', '400', '500', '600', '700', '800'],
    subsets: ['latin'],
})

export const metadata: Metadata = {
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

export default async function RootLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode
    params: { locale: string }
}) {
    return (
        <ClerkProvider>
            <html lang={locale}>
                <body className={`${inter_tight.className}`}>{children}</body>
            </html>
        </ClerkProvider>
    )
}

import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignInPage() {
    return (
        <div className='mt-40 flex flex-col items-center justify-center'>
            <Link href='/' className='mb-8 flex items-center gap-2'>
                <span className='text-2xl font-bold'>DIVE INTO IVE</span>
            </Link>
            <SignIn
                appearance={{
                    elements: {
                        rootBox: 'mx-auto',
                        card: 'shadow-lg',
                        headerTitle: 'text-center text-2xl font-bold',
                        headerSubtitle: 'text-center',
                        socialButtonsBlockButton:
                            'border border-gray-300 hover:bg-gray-50',
                        formButtonPrimary: 'bg-blue-500 hover:bg-blue-600',
                        footerActionLink: 'text-blue-500 hover:text-blue-600',
                        footer: 'hidden',
                    },
                }}
            />
        </div>
    )
}

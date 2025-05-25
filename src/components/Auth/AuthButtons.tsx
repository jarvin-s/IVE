'use client'

import { useAuth } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export function AuthButtons() {
    const { isSignedIn, isLoaded } = useAuth()

    if (!isLoaded) {
        return (
            <div className='flex items-center gap-4'>
                <div className='h-8 w-8 animate-pulse rounded-full bg-gray-200' />
            </div>
        )
    }

    if (isSignedIn) {
        return (
            <div className='flex items-center gap-4'>
                <UserButton />
            </div>
        )
    }

    return (
        <div className='flex items-center gap-4'>
            <Link href='/sign-in'>
                <Button variant='ghost' size='sm' className='hover:underline'>
                    Login
                </Button>
            </Link>
        </div>
    )
}

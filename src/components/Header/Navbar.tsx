'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { AuthButtons } from '../Auth/AuthButtons'
import { Button } from '../ui/button'
import { Bebas_Neue } from 'next/font/google'

const bebas_neue = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
})

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
        if (!isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }

    return (
        <nav className='sticky top-0 z-50 w-full py-2 text-white'>
            <div className='mx-auto max-w-7xl px-4'>
                <div className='flex items-center justify-between p-4'>
                    {/* Logo */}
                    <Link href={'/'} className='flex items-center'>
                        <Image
                            src='/images/logo.png'
                            alt='IVE Logo'
                            width={65}
                            height={65}
                            className='rounded-full'
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className='hidden flex-1 md:block'>
                        <div className='flex items-center justify-center space-x-8 uppercase'>
                            <Link
                                href='/'
                                className={cn(
                                    'rounded-md px-3 py-2 text-3xl font-bold transition-colors hover:text-pink-600'
                                )}
                            >
                                Home
                            </Link>

                            <Link
                                href='/quiz'
                                className={cn(
                                    'rounded-md px-3 py-2 text-3xl font-bold transition-colors hover:text-pink-600'
                                )}
                            >
                                Quiz
                            </Link>

                            <AuthButtons />
                        </div>
                    </div>

                    <Link
                        href='#'
                        className='hidden items-center rounded-lg bg-[#F5E4F9] p-2.5 md:flex'
                    >
                        <Image
                            src='/images/minive/logo.png'
                            alt='IVE Logo'
                            width={96}
                            height={96}
                            className='rounded-full'
                        />
                    </Link>

                    {/* Mobile menu button */}
                    <div className='md:hidden'>
                        <Button
                            className='group z-[60] flex h-10 flex-col justify-center space-y-1 duration-300 ease-in-out md:hidden'
                            onClick={toggleMenu}
                            aria-label='Toggle menu'
                            variant='ghost'
                        >
                            <div className='relative flex h-2 w-6 justify-end'>
                                <span
                                    className={`absolute block h-[2px] w-6 bg-white/60 transition-all duration-300 ${
                                        isOpen ? 'rotate-45' : ''
                                    }`}
                                ></span>
                                <span
                                    className={`absolute block h-[2px] bg-white/60 transition-all duration-300 ${
                                        isOpen
                                            ? 'w-6 -rotate-45'
                                            : 'ml-auto w-4 translate-y-[6px] group-hover:w-6'
                                    }`}
                                ></span>
                                <span
                                    className={`absolute block h-[2px] w-6 bg-white/60 transition-all duration-300 ${
                                        isOpen
                                            ? 'opacity-0'
                                            : '-translate-y-[6px] opacity-0'
                                    }`}
                                ></span>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={cn(
                    'fixed inset-0 z-40 bg-black transition-all duration-300 ease-in-out md:hidden',
                    isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
                )}
            >
                <div className='flex items-center justify-between p-8'>
                    <Link href={'/'} className='flex items-center'>
                        <Image
                            src='/images/logo.png'
                            alt='IVE Logo'
                            width={65}
                            height={65}
                            className='rounded-full'
                        />
                    </Link>
                    <Button
                        className='group z-[60] flex h-10 flex-col justify-center space-y-1 duration-300 ease-in-out'
                        onClick={toggleMenu}
                        aria-label='Toggle menu'
                        variant='ghost'
                    >
                        <div className='relative flex h-2 w-6 justify-end'>
                            <span
                                className={`absolute block h-[2px] w-6 bg-white/60 transition-all duration-300 ${
                                    isOpen ? 'rotate-45' : ''
                                }`}
                            ></span>
                            <span
                                className={`absolute block h-[2px] bg-white/60 transition-all duration-300 ${
                                    isOpen
                                        ? 'w-6 -rotate-45'
                                        : 'ml-auto w-4 translate-y-[6px] group-hover:w-6'
                                }`}
                            ></span>
                            <span
                                className={`absolute block h-[2px] w-6 bg-white/60 transition-all duration-300 ${
                                    isOpen
                                        ? 'opacity-0'
                                        : '-translate-y-[6px] opacity-0'
                                }`}
                            ></span>
                        </div>
                    </Button>
                </div>
                <div
                    className={`${bebas_neue.className} flex h-full flex-col items-center space-y-8 px-4`}
                >
                    <Link
                        href='/'
                        className={cn(
                            'block rounded-md px-3 py-2 text-9xl text-white transition-colors hover:text-pink-600'
                        )}
                    >
                        Home
                    </Link>
                    <Link
                        href='/quiz'
                        className={cn(
                            'block rounded-md px-3 py-2 text-9xl text-white transition-colors hover:text-pink-600'
                        )}
                    >
                        Quiz
                    </Link>

                    <AuthButtons />
                </div>
            </div>
        </nav>
    )
}

export default Navbar

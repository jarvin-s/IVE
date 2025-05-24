'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, ImageIcon, Music, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { AuthButtons } from '../Auth/AuthButtons'
import { Button } from '../ui/button'
import { Bebas_Neue } from 'next/font/google'

const bebas_neue = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
})

const galleryItems = [
    { name: 'Photos', href: '/gallery/photos', icon: ImageIcon },
    { name: 'Music Videos', href: '/gallery/videos', icon: Music },
    { name: 'Performances', href: '/gallery/performances', icon: Star },
]

export function Navbar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [showGalleryDropdown, setShowGalleryDropdown] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const galleryBtnRef = useRef<HTMLButtonElement>(null)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
        if (!isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                galleryBtnRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !galleryBtnRef.current.contains(event.target as Node)
            ) {
                setShowGalleryDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const isActive = (path: string) => {
        if (path === '/') {
            return pathname === path
        }
        return pathname?.startsWith(path)
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
                        <div className='flex items-center justify-center space-x-8'>
                            <Link
                                href='/'
                                className={cn(
                                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                    isActive('/')
                                        ? 'bg-pink-200/70'
                                        : 'hover:underline'
                                )}
                            >
                                Home
                            </Link>

                            {/* Gallery Dropdown */}
                            <div className='relative'>
                                <Button
                                    ref={galleryBtnRef}
                                    onClick={() =>
                                        setShowGalleryDropdown(
                                            !showGalleryDropdown
                                        )
                                    }
                                    variant='ghost'
                                    className={cn(
                                        'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                        isActive('/gallery')
                                            ? 'bg-pink-200/70'
                                            : 'hover:underline'
                                    )}
                                >
                                    Gallery
                                    <ChevronDown
                                        className={cn(
                                            'ml-1 h-4 w-4 transition-transform duration-200',
                                            showGalleryDropdown && 'rotate-180'
                                        )}
                                    />
                                </Button>

                                {showGalleryDropdown && (
                                    <div
                                        ref={dropdownRef}
                                        className='animate-in fade-in slide-in-from-top-5 absolute right-0 mt-2 w-48 rounded-xl bg-white py-1 shadow-lg ring-1 ring-pink-200 duration-200 focus:outline-none'
                                    >
                                        {galleryItems.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className='flex items-center px-4 py-2 text-sm hover:bg-pink-50'
                                            >
                                                <item.icon className='mr-2 h-4 w-4 text-pink-500' />
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Link
                                href='/quiz'
                                className={cn(
                                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                    isActive('/quiz')
                                        ? 'bg-pink-200/70'
                                        : 'hover:underline'
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
                            'block rounded-md px-3 py-2 text-8xl text-white',
                            isActive('/')
                                ? 'bg-pink-100 text-black'
                                : 'transition-all duration-150 ease-in-out hover:text-pink-900'
                        )}
                    >
                        Home
                    </Link>

                    {/* Gallery Dropdown */}
                    {/* <div>
                        <button
                            onClick={() =>
                                setShowGalleryDropdown(!showGalleryDropdown)
                            }
                            className={cn(
                                'flex w-full items-center justify-between rounded-md px-3 py-2 text-9xl text-white',
                                isActive('/gallery')
                                    ? 'bg-pink-100 text-black'
                                    : 'hover:underline'
                            )}
                        >
                            <span>Gallery</span>
                            <ChevronDown
                                className={cn(
                                    'h-5 w-5 text-white transition-transform duration-200',
                                    showGalleryDropdown && 'rotate-180'
                                )}
                            />
                        </button>

                        <div
                            className={cn(
                                'overflow-hidden pl-4 transition-all duration-200 ease-in-out',
                                showGalleryDropdown
                                    ? 'mt-1 mb-2 max-h-48'
                                    : 'max-h-0'
                            )}
                        >
                            {galleryItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className='flex items-center rounded-md px-3 py-2 text-xl text-white hover:bg-pink-50 hover:text-black'
                                >
                                    <item.icon className='mr-2 h-5 w-5 text-pink-500' />
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div> */}

                    <Link
                        href='/gallery'
                        className={cn(
                            'block rounded-md px-3 py-2 text-9xl text-white',
                            isActive('/gallery')
                                ? 'bg-pink-100 text-black'
                                : 'transition-all duration-150 ease-in-out hover:text-pink-900'
                        )}
                    >
                        Gallery
                    </Link>
                    <Link
                        href='/quiz'
                        className={cn(
                            'block rounded-md px-3 py-2 text-9xl text-white',
                            isActive('/quiz')
                                ? 'bg-pink-100 text-black'
                                : 'transition-all duration-150 ease-in-out hover:text-pink-900'
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

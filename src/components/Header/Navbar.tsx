'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { AuthButtons } from '../Auth/AuthButtons'
import Image from 'next/image'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

interface TabProps {
    children: React.ReactNode
    href: string
}

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 z-50 w-full bg-transparent py-4 ${
                scrolled ? 'backdrop-blur-md' : ''
            }`}
        >
            <div className='container mx-auto px-4'>
                <div className='flex h-16 items-center justify-between lg:justify-between'>
                    <Link href={'/'} className='flex items-center'>
                        <Image
                            src='/images/logo.png'
                            alt='IVE Logo'
                            width={65}
                            height={65}
                            className='rounded-full'
                        />
                    </Link>

                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant='ghost'
                                size='icon'
                                className='lg:hidden'
                            >
                                <MenuIcon className='h-10 w-8' />
                                <span className='sr-only'>
                                    Toggle navigation menu
                                </span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side='top'
                            className='h-[100dvh] w-full bg-pink-950 pt-16 text-white'
                        >
                            <Link href='#' prefetch={false}>
                                <span className='sr-only'>
                                    <SheetTitle className='text-7xl'>
                                        Menu
                                    </SheetTitle>
                                    DIVE INTO IVE
                                </span>
                            </Link>
                            <div className='grid gap-2 py-6'>
                                <Link
                                    href={'/home'}
                                    className='flex w-full items-center justify-center py-2 text-lg hover:underline'
                                    prefetch={false}
                                    onClick={() => setIsOpen(false)}
                                >
                                    Home
                                </Link>
                                <div className='flex justify-center py-2 text-lg hover:underline'>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant='ghost'
                                                className='text-md'
                                            >
                                                Gallery{' '}
                                                <ChevronDown className='ml-2 h-4 w-4' />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className='w-56 rounded-md bg-zinc-950 text-white shadow-lg'>
                                            {[
                                                { name: 'rei', icon: '🐥' },
                                                { name: 'gaeul', icon: '🐿️' },
                                                { name: 'yujin', icon: '🐶' },
                                                { name: 'liz', icon: '🐱' },
                                                { name: 'leeseo', icon: '🐯' },
                                                {
                                                    name: 'wonyoung',
                                                    icon: '🐰',
                                                },
                                            ].map(({ name, icon }) => (
                                                <DropdownMenuItem
                                                    asChild
                                                    key={name}
                                                >
                                                    <Link
                                                        href={`/gallery/${name}`}
                                                        className='flex items-center gap-2 rounded-md px-4 py-2 transition duration-300 hover:bg-zinc-800 hover:text-white'
                                                    >
                                                        {icon} {name}
                                                    </Link>
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <Link
                                    href={'/dashboard'}
                                    className='flex w-full items-center justify-center py-2 text-lg hover:underline'
                                    prefetch={false}
                                    onClick={() => setIsOpen(false)}
                                >
                                    Quiz
                                </Link>
                                <AuthButtons />
                            </div>
                        </SheetContent>
                    </Sheet>

                    <NavigationMenu className='hidden text-white lg:flex'>
                        <div className='flex items-center gap-8'>
                            <NavigationMenuList className='lowercase'>
                                <Tab href={'/home'}>Home</Tab>
                                <div className='flex items-center gap-2 hover:underline'>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant='ghost'
                                                className='cursor-pointer text-sm'
                                            >
                                                gallery{' '}
                                                <ChevronDown className='ml-2 h-4 w-4' />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className='w-56 rounded-md bg-zinc-950 text-white shadow-lg'>
                                            {[
                                                { name: 'rei', icon: '🐥' },
                                                { name: 'gaeul', icon: '🐿️' },
                                                { name: 'yujin', icon: '🐶' },
                                                { name: 'liz', icon: '🐱' },
                                                { name: 'leeseo', icon: '🐯' },
                                                {
                                                    name: 'wonyoung',
                                                    icon: '🐰',
                                                },
                                            ].map(({ name, icon }) => (
                                                <DropdownMenuItem
                                                    asChild
                                                    key={name}
                                                >
                                                    <Link
                                                        href={`/gallery/${name}`}
                                                        className='flex items-center gap-2 rounded-md px-4 py-2 transition duration-300 hover:bg-zinc-800 hover:text-white'
                                                    >
                                                        {icon} {name}
                                                    </Link>
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <Tab href={'/dashboard'}>Quiz</Tab>
                                <AuthButtons />
                            </NavigationMenuList>
                        </div>
                    </NavigationMenu>
                    <Link
                        href='#'
                        className='hidden items-center rounded-lg bg-[#F5E4F9] p-2.5 lg:flex'
                    >
                        <Image
                            src='/images/minive/logo.png'
                            alt='IVE Logo'
                            width={96}
                            height={96}
                            className='rounded-full'
                        />
                    </Link>
                </div>
            </div>
        </header>
    )
}

const Tab = ({ children, href }: TabProps) => {
    return (
        <NavigationMenuLink asChild>
            <li>
                <Link
                    href={href}
                    className='relative z-[999] rounded-full px-6 hover:underline'
                    prefetch={false}
                >
                    {children}
                </Link>
            </li>
        </NavigationMenuLink>
    )
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            <line x1='4' x2='20' y1='12' y2='12' />
            <line x1='4' x2='20' y1='6' y2='6' />
            <line x1='4' x2='20' y1='18' y2='18' />
        </svg>
    )
}

export default Navbar

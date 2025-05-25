'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import Image from 'next/image'
import Link from 'next/link'

export default function SignInPage() {
    return (
        <div className='flex min-h-screen'>
            <div className='hidden w-1/2 lg:block'>
                <Image
                    src='/images/ive-main2.jpg'
                    alt='Login background'
                    width={1000}
                    height={1000}
                    className='h-full w-full object-cover'
                    priority
                />
            </div>

            <div className='flex w-full items-center justify-center bg-zinc-100 px-4 lg:w-1/2'>
                <SignIn.Root>
                    <SignIn.Step
                        name='start'
                        className='w-full space-y-6 rounded-2xl bg-white px-4 py-10 shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8'
                    >
                        <header className='text-center'>
                            <Image
                                src='/images/logo2.png'
                                alt='IVE Logo'
                                width={100}
                                height={100}
                                className='mx-auto'
                            />
                            <h1 className='mt-4 text-xl font-medium tracking-tight text-zinc-950'>
                                Sign in to{' '}
                                <span className='font-bold'>DIVE INTO IVE</span>
                            </h1>
                        </header>
                        <Clerk.GlobalError className='block text-sm text-red-400' />
                        <div className='space-y-4'>
                            <Clerk.Field
                                name='identifier'
                                className='space-y-2'
                            >
                                <Clerk.Label className='text-sm font-medium text-zinc-950'>
                                    Email
                                </Clerk.Label>
                                <Clerk.Input
                                    type='text'
                                    required
                                    className='w-full rounded-md bg-white px-3.5 py-2 text-sm ring-1 ring-zinc-300 outline-none ring-inset hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400'
                                />
                                <Clerk.FieldError className='block text-sm text-red-400'>
                                    {({ message, code }) => (
                                        <span>
                                            {message} {code}
                                        </span>
                                    )}
                                </Clerk.FieldError>
                            </Clerk.Field>
                            <Clerk.Field name='password' className='space-y-2'>
                                <Clerk.Label className='text-sm font-medium text-zinc-950'>
                                    Password
                                </Clerk.Label>
                                <Clerk.Input
                                    type='password'
                                    required
                                    className='w-full rounded-md bg-white px-3.5 py-2 text-sm ring-1 ring-zinc-300 outline-none ring-inset hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400'
                                />
                                <Clerk.FieldError className='block text-sm text-red-400'>
                                    {({ message, code }) => (
                                        <span>
                                            {message} {code}
                                        </span>
                                    )}
                                </Clerk.FieldError>
                            </Clerk.Field>
                        </div>
                        <SignIn.Action
                            submit
                            className='w-full cursor-pointer rounded-md bg-zinc-950 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow ring-1 ring-zinc-950 outline-none ring-inset hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70'
                        >
                            Sign in
                        </SignIn.Action>
                        <div className='space-y-4 rounded-md p-5'>
                            <div className='flex items-center'>
                                <hr className='w-full border-t-[1px] border-[#49494923]' />
                                <span className='px-4 opacity-80'>OR</span>
                                <hr className='w-full border-t-[1px] border-[#49494923]' />
                            </div>
                            <div className='space-y-2'>
                                <Clerk.Connection
                                    name='google'
                                    className='flex w-full cursor-pointer items-center justify-center gap-x-3 rounded-md bg-gradient-to-b from-white to-neutral-50 px-2 py-1.5 text-sm font-medium text-neutral-950 shadow ring-1 ring-black/5 outline-none hover:to-neutral-100 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 active:text-neutral-950/60'
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 16 16'
                                        aria-hidden
                                        className='size-4'
                                    >
                                        <g clipPath='url(#a)'>
                                            <path
                                                fill='currentColor'
                                                d='M8.32 7.28v2.187h5.227c-.16 1.226-.57 2.124-1.192 2.755-.764.765-1.955 1.6-4.035 1.6-3.218 0-5.733-2.595-5.733-5.813 0-3.218 2.515-5.814 5.733-5.814 1.733 0 3.005.685 3.938 1.565l1.538-1.538C12.498.96 10.756 0 8.32 0 3.91 0 .205 3.591.205 8s3.706 8 8.115 8c2.382 0 4.178-.782 5.582-2.24 1.44-1.44 1.893-3.475 1.893-5.111 0-.507-.035-.978-.115-1.369H8.32Z'
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id='a'>
                                                <path
                                                    fill='#fff'
                                                    d='M0 0h16v16H0z'
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    Login with Google
                                </Clerk.Connection>
                            </div>
                        </div>
                        <p className='text-center text-sm text-zinc-500'>
                            No account?{' '}
                            <Link
                                href='/sign-up'
                                className='font-medium text-zinc-950 decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline'
                            >
                                Create an account
                            </Link>
                        </p>
                    </SignIn.Step>
                </SignIn.Root>
            </div>
        </div>
    )
}

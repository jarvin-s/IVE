'use client'

import Image from 'next/image'
import React from 'react'
import main from '/public/images/ive-main.jpg'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Heart from '@/components/Index/Heart'

const Home = () => {
    return (
        <>
            <section className='flex'>
                <div className='hidden w-full lg:block xl:w-2/3'>
                    <Image
                        className='h-full w-full object-cover'
                        alt={'IVE main'}
                        src={main}
                        height={0}
                        width={0}
                    />
                </div>
                <div className='flex h-screen w-full bg-stone-950 px-6 pt-20 lg:w-1/2'>
                    <div className='w-full text-center text-white'>
                        <h1 className='text-4xl font-bold'>
                            ✨IVE 아이브 |{' '}
                            <span className='text-pink-600'>DIVE</span> INTO{' '}
                            <span className='text-pink-600'>IVE</span>✨
                        </h1>
                        <h4 className='text-lg'>
                            <span className='opacity-80'>
                                A collection of data, stats and info about IVE.
                            </span>
                        </h4>
                        <div className='mx-auto mt-2 flex max-w-sm flex-col gap-2'>
                            <Button
                                asChild
                                type='button'
                                className='items-center justify-center rounded-lg bg-pink-900 px-2 py-2 text-sm text-white hover:bg-pink-800'
                            >
                                <Link href={'/home'}>
                                    Go to IVE collection
                                    <svg
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
                                        <path d='M5 12h14'></path>
                                        <path d='m12 5 7 7-7 7'></path>
                                    </svg>
                                </Link>
                            </Button>
                            <Button 
                                asChild
                                type='button'
                                className='items-center justify-center rounded-lg bg-pink-900 px-2 py-2 text-sm text-white hover:bg-pink-800'
                            >
                                <Link href={'/dashboard'}>Quiz dashboard</Link>
                            </Button>
                        </div>
                        <div className='mt-10 flex justify-center px-4'>
                            <div className='group relative w-[15rem] gap-2 pt-4 md:w-[20rem]'>
                                <Image
                                    className='big-card absolute z-10 rotate-[5deg] opacity-95 duration-300 ease-in-out group-hover:translate-x-[4rem] group-hover:rotate-[15deg] md:group-hover:translate-x-[10rem] md:group-hover:translate-y-12'
                                    src='/images/rei/rei.png'
                                    width={400}
                                    height={0}
                                    alt=''
                                />
                                <Image
                                    className='big-card absolute z-[11] opacity-95 duration-300 ease-in-out group-hover:-translate-y-2 md:group-hover:translate-y-7'
                                    src='/images/leeseo/leeseo.png'
                                    width={400}
                                    height={0}
                                    alt=''
                                />
                                <Image
                                    className='big-card absolute z-[12] rotate-[-5deg] opacity-95 duration-300 ease-in-out group-hover:-translate-x-[4rem] group-hover:translate-y-2 group-hover:rotate-[-18deg] md:group-hover:-translate-x-[10rem] md:group-hover:translate-y-[3.5rem]'
                                    src='/images/wonyoung/wonyoung.jpg'
                                    width={400}
                                    height={0}
                                    alt=''
                                />
                            </div>
                            <div className='group relative w-[15rem] gap-2 md:w-[20rem]'>
                                <Image
                                    className='big-card absolute rotate-[8deg] opacity-95 duration-300 ease-in-out group-hover:translate-x-[4rem] group-hover:rotate-[20deg] md:group-hover:translate-x-[7.6rem] md:group-hover:translate-y-10'
                                    src='/images/liz/liz.png'
                                    width={400}
                                    height={0}
                                    alt=''
                                />
                                <Image
                                    className='big-card absolute opacity-95 duration-300 ease-in-out group-hover:-translate-y-2 md:group-hover:translate-y-5'
                                    src='/images/yujin/yujin.jpg'
                                    width={400}
                                    height={0}
                                    alt=''
                                />
                                <Image
                                    className='big-card absolute rotate-[-5deg] opacity-95 duration-300 ease-in-out group-hover:z-[13] group-hover:-translate-x-[4rem] group-hover:rotate-[-12deg] md:group-hover:-translate-x-[10rem] md:group-hover:translate-y-10'
                                    src='/images/gaeul/gaeul.jpg'
                                    width={400}
                                    height={0}
                                    alt=''
                                />
                            </div>
                        </div>
                        {/* <Star /> */}
                        <Heart />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home

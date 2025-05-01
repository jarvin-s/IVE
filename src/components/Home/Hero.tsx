import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Poppins, Bebas_Neue } from 'next/font/google'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400'],
})

const bebas_neue = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
})

const Hero = () => {
    return (
        <>
            <div className='relative mb-20 h-dvh w-screen overflow-x-hidden'>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <h1
                        className={`${bebas_neue.className} text-center text-5xl text-white md:text-[14rem]`}
                    >
                        DIVE INTO IVE
                    </h1>
                    <div className='mt-4 flex flex-col items-center gap-4'>
                        <Button
                            asChild
                            size={'lg'}
                            className={`text-md w-full gap-1 border-b-4 border-pink-900 bg-pink-700 px-10 py-6 text-white transition-all duration-150 hover:translate-y-[2px] hover:border-none hover:bg-pink-800 md:px-6 md:py-6 md:text-xl ${poppins.className}`} // Applying the font class
                        >
                            <Link href={`/dashboard`}>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        fill='currentColor'
                                        d='M10 21v-8.25H3V21zm2 0h9v-8.25h-9zM3 10.75h18V3H3z'
                                    />
                                </svg>
                                Quiz dashboard
                            </Link>
                        </Button>
                    </div>
                </div>
                {/* IVE SHOWCASE VIDEO (I AM) */}
                <video
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload='auto'
                    className='absolute top-0 left-0 z-[-1] size-full object-cover object-center'
                >
                    <source src='/videos/hero-1.mp4' type='video/mp4' />
                    <source src='/videos/hero-1.webm' type='video/webm' />
                    Your browser does not support the video tag.
                </video>
            </div>
        </>
    )
}

export default Hero

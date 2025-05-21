import React from 'react'
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
            <div className='relative flex w-screen flex-col items-center justify-center overflow-x-hidden text-white'>
                <div className='mt-40 overflow-hidden'>
                    <h1
                        className={`${bebas_neue.className} text-center text-[5rem] leading-none md:text-[14rem]`}
                    >
                        DIVE INTO IVE
                    </h1>
                    <div className='flex flex-col items-center'>
                        <h1
                            className={`${poppins.className} text-center text-sm md:text-lg`}
                        >
                            4TH GENERATION K-POP SENSATION
                        </h1>
                    </div>
                </div>
            </div>
            {/* IVE SHOWCASE VIDEO (I AM) */}
            <div className='absolute top-0 left-0 z-[-1] size-full'>
                <video
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload='auto'
                    className='size-full object-cover object-center'
                >
                    <source src='/videos/hero-1.mp4' type='video/mp4' />
                    <source src='/videos/hero-1.webm' type='video/webm' />
                    Your browser does not support the video tag.
                </video>
                <div className='absolute inset-0 bg-gradient-to-t from-black/100 to-transparent'></div>
            </div>
        </>
    )
}

export default Hero

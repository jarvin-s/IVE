'use client'

import React, { useEffect } from 'react'
import { Poppins, Bebas_Neue } from 'next/font/google'
import { motion } from 'motion/react'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400'],
})

const bebas_neue = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
})

const Hero = () => {
    useEffect(() => {
        const video = document.getElementById('hero-video') as HTMLVideoElement
        if (video) {
            setTimeout(() => {
                video.play().catch((error) => {
                    console.error('Video playback failed:', error)
                })
            }, 2600)
        }
    }, [])
    return (
        <>
            <div className='relative flex w-screen flex-col items-center justify-center overflow-x-hidden text-white'>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2.5, delay: 0.5 }}
                    className='flex h-[80vh] flex-col items-center justify-center overflow-hidden'
                >
                    <h1
                        className={`${bebas_neue.className} text-center text-[6rem] leading-none md:text-[24rem]`}
                    >
                        DIVE INTO IVE
                    </h1>
                    <div className='flex flex-col items-center'>
                        <h1
                            className={`${poppins.className} text-center text-sm tracking-[10px] md:text-[24px]`}
                        >
                            4TH GENERATION K-POP SENSATION
                        </h1>
                    </div>
                </motion.div>
            </div>
            {/* IVE SHOWCASE VIDEO (I AM) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 2.5 }}
                className='absolute top-0 left-0 z-[-1] size-full'
            >
                <video
                    muted
                    loop
                    playsInline
                    preload='auto'
                    className='size-full object-cover object-center'
                    id='hero-video'
                >
                    <source src='/videos/hero-1.mp4' type='video/mp4' />
                    <source src='/videos/hero-1.webm' type='video/webm' />
                    Your browser does not support the video tag.
                </video>
                <div className='absolute inset-0 bg-black/80' />
            </motion.div>
        </>
    )
}

export default Hero

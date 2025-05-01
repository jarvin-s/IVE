import Image from 'next/image'
import React from 'react'

const Heart = () => {
    return (
        <>
            <div className='animate-heart-bounce absolute top-[20px] right-[12px] opacity-80 md:right-[52px]'>
                <Image
                    src='/icons/red-heart.svg'
                    width={0}
                    height={0}
                    alt='Red heart'
                    className='h-auto w-full'
                />
            </div>
            <div className='absolute top-[16rem] hidden -rotate-[45deg] opacity-20 md:right-[40rem] md:w-[100px] xl:block'>
                <Image
                    src='/icons/finger-heart.svg'
                    width={0}
                    height={0}
                    alt='Finger heart'
                    className='h-auto w-full'
                />
            </div>
        </>
    )
}

export default Heart

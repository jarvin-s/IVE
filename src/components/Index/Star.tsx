import Image from 'next/image'
import React from 'react'

const Star = () => {
    return (
        <>
            <div className='absolute top-[20px] right-[30rem] -rotate-[16deg]'>
                <Image
                    className='h-auto w-[50px] opacity-20'
                    src='/icons/star.svg'
                    width={0}
                    height={0}
                    alt='Yellow star'
                />
            </div>
            <div className='absolute top-[16px] right-[26rem]'>
                <Image
                    className='h-auto w-[50px] opacity-40'
                    src='/icons/star.svg'
                    width={0}
                    height={0}
                    alt='Yellow star'
                />
            </div>
            <div className='absolute top-[22px] right-[22rem] rotate-[16deg]'>
                <Image
                    className='h-auto w-[50px] opacity-60'
                    src='/icons/star.svg'
                    width={0}
                    height={0}
                    alt='Yellow star'
                />
            </div>
        </>
    )
}

export default Star

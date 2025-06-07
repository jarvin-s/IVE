import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Card, CardContent } from '../ui/card'
import { CircleDashed } from 'lucide-react'
import { Bebas_Neue } from 'next/font/google'
import { motion } from 'framer-motion'

const bebasNeue = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
})

interface QuizCompleteProps {
    score: number
    totalQuestions: number
    isAuthenticated: boolean
}

export default function QuizComplete({
    score,
    totalQuestions,
    isAuthenticated,
}: QuizCompleteProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='quiz-complete flex min-h-screen flex-col items-center justify-center text-white'
        >
            <div className='relative w-full max-w-4xl rounded-md p-4'>
                <motion.h2
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className={`${bebasNeue.className} mb-6 text-center text-7xl font-bold text-white md:text-9xl`}
                >
                    Quiz complete!
                </motion.h2>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <Card className='mb-6 overflow-hidden border-white/20 bg-pink-500/30 text-white backdrop-blur-md'>
                        <CardContent className='p-0'>
                            <div className='flex flex-col items-center justify-center p-8'>
                                <motion.div
                                    initial={{ rotate: -180, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.7 }}
                                    className='relative mb-6'
                                >
                                    <CircleDashed
                                        className='h-36 w-36 text-white/20'
                                        strokeWidth={1}
                                    />
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: 1.2,
                                            }}
                                            className='text-center'
                                        >
                                            <span className='text-5xl font-bold'>
                                                {score}%
                                            </span>
                                        </motion.div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 1.4 }}
                                    className='text-center'
                                >
                                    <p className='text-4xl font-bold'>
                                        {score}{' '}
                                        <span className='text-white/80'>
                                            out of
                                        </span>{' '}
                                        {totalQuestions}
                                    </p>
                                    <p className='mt-2 text-xl text-white/80'>
                                        questions answered correctly
                                    </p>
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 1.6 }}
                                className='flex justify-center border-t border-white/20'
                            >
                                <div className='flex flex-col items-center justify-center p-6'>
                                    <Button
                                        asChild
                                        className='w-full rounded-md bg-pink-700 px-6 py-2 text-white transition-all hover:bg-pink-900'
                                    >
                                        <Link href={`/quiz`}>
                                            Try another quiz
                                        </Link>
                                    </Button>
                                </div>
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.8 }}
                    className='flex flex-col items-center gap-4'
                >
                    <div className='flex flex-col gap-4 md:flex-row'>
                        {isAuthenticated ? (
                            <>
                                <Button
                                    asChild
                                    variant='outline'
                                    disabled={true}
                                    className='w-64 border-[#6d6d6d2a] text-white hover:bg-pink-700'
                                >
                                    <Link href='/leaderboard'>Leaderboard</Link>
                                </Button>
                                <Button
                                    asChild
                                    variant='outline'
                                    className='w-64 border-[#6d6d6d2a] text-white hover:bg-pink-700'
                                >
                                    <Link href='/dashboard'>
                                        Back to dashboard
                                    </Link>
                                </Button>
                            </>
                        ) : (
                            <Button
                                asChild
                                variant='outline'
                                className='w-64 border-[#6d6d6d2a] text-white hover:bg-purple-700'
                            >
                                <Link href='/'>Back to home</Link>
                            </Button>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

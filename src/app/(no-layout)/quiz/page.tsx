'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { redirect, useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/nextjs'

export default function Home() {
    const user = useUser()
    const router = useRouter()

    if (!user) {
        redirect('/sign-in')
    }

    const handleStartQuiz = () => {
        const quizId = uuidv4()
        router.push(`/quiz/${quizId}`)
    }

    return (
        <div className='flex min-h-screen flex-col bg-gradient-to-b from-pink-100 to-pink-200'>
            <header className='relative flex w-full justify-center px-6 py-4'>
                <h1 className='text-3xl font-bold tracking-wider text-pink-600 md:text-4xl'>
                    IVE QUIZ
                </h1>
            </header>

            <main className='flex flex-1 flex-col items-center justify-center p-6 text-center'>
                <div className='mx-auto w-full max-w-md'>
                    <div className='relative mb-8'>
                        <div className='absolute -top-12 -left-8 h-24 w-24 rounded-full bg-pink-300 opacity-50 blur-xl'></div>
                        <div className='absolute -right-8 -bottom-16 h-32 w-32 rounded-full bg-purple-300 opacity-40 blur-xl'></div>
                        <div className='relative overflow-hidden rounded-3xl border border-pink-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm'>
                            <div className='absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-gradient-to-br from-pink-400 to-purple-400 opacity-20'></div>
                            <h2 className='mb-4 text-2xl font-bold text-pink-700 md:text-3xl'>
                                How well do you know IVE?
                            </h2>
                            <p className='mb-6 text-gray-700'>
                                Test your knowledge about one of K-pop&apos;s
                                most popular girl groups!
                            </p>
                            <div className='space-y-4'>
                                <Button
                                    onClick={handleStartQuiz}
                                    className='w-full rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 py-6 text-lg text-white shadow-md transition-all hover:from-pink-600 hover:to-pink-700 hover:shadow-lg'
                                >
                                    Start Quiz
                                </Button>
                                <Link
                                    href='/dashboard'
                                    className='block w-full'
                                >
                                    <Button
                                        variant='outline'
                                        className='w-full rounded-xl border-pink-300 py-6 text-lg text-pink-700 hover:bg-pink-50'
                                    >
                                        Dashboard
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className='mt-12 flex justify-center space-x-4'>
                        <div className='h-2 w-2 animate-pulse rounded-full bg-pink-400'></div>
                        <div className='h-2 w-2 animate-pulse rounded-full bg-pink-500 delay-100'></div>
                        <div className='h-2 w-2 animate-pulse rounded-full bg-pink-600 delay-200'></div>
                    </div>
                </div>
            </main>

            <footer className='py-4 text-center text-sm text-pink-700'>
                <p>Made with 💖 for DIVE (IVE&apos;s fandom)</p>
            </footer>
        </div>
    )
}

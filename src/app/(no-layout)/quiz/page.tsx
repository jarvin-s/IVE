'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/nextjs'
import { Bebas_Neue } from 'next/font/google'

const bebasNeue = Bebas_Neue({
    weight: '400',
    subsets: ['latin'],
})

export default function Home() {
    const { user, isLoaded } = useUser()
    const router = useRouter()

    const handleStartQuiz = () => {
        const quizId = uuidv4()
        router.push(`/quiz/${quizId}`)
    }

    return (
        <div className='flex min-h-screen flex-col bg-gradient-to-b from-pink-100 to-pink-200'>
            <header className='relative flex w-full justify-center px-6 py-4'>
                <h1
                    className={`${bebasNeue.className} text-3xl font-bold text-pink-600 md:text-9xl`}
                >
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
                                {isLoaded && user && (
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
                                )}
                                <Link href='/home' className='block w-full'>
                                    <Button
                                        variant='outline'
                                        className='w-full rounded-xl border-pink-300 py-6 text-lg text-pink-700 hover:bg-pink-50'
                                    >
                                        Home
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className='py-4 text-center text-sm text-pink-700'>
                <p>Made with 💖 for DIVE (IVE&apos;s fandom)</p>
            </footer>
        </div>
    )
}

'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { Bebas_Neue } from 'next/font/google'

const bebasNeue = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
})

interface LeaderboardEntry {
    rank: number
    username: string
    score: number
    quizzesTaken: number
}

interface LeaderboardStats {
    totalUsers: number
    totalQuizzes: number
    averageScore: number
    topScore: number
    userRank?: number
    userStats?: {
        score: number
        quizzesTaken: number
        rank: number
    }
}

export default function QuizLeaderboard() {
    const { user } = useUser()
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
        []
    )
    const [stats, setStats] = useState<LeaderboardStats | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const leaderboardResponse = await fetch(`/api/leaderboard`)
                if (!leaderboardResponse.ok) {
                    throw new Error('Failed to fetch leaderboard data')
                }
                const leaderboardData = await leaderboardResponse.json()
                setLeaderboardData(leaderboardData.leaderboard)

                const statsResponse = await fetch(`/api/leaderboard/stats`)
                if (statsResponse.ok) {
                    const statsData = await statsResponse.json()
                    setStats(statsData.stats)
                }
            } catch (error) {
                console.error('Error fetching leaderboard data:', error)
                setError(
                    'Failed to load leaderboard data. Please try again later.'
                )
            } finally {
                setIsLoading(false)
            }
        }

        fetchLeaderboardData()
    }, [])

    if (isLoading) {
        return (
            <div className='flex min-h-screen items-center justify-center bg-gradient-to-b from-pink-100 to-pink-200'>
                <div className='flex items-center justify-center space-x-2'>
                    <div className='h-10 w-10 animate-spin rounded-full border-2 border-pink-700 border-t-transparent' />
                    <span className='text-3xl font-bold text-black'>
                        Loading
                    </span>
                </div>
            </div>
        )
    }

    const topThree = leaderboardData.slice(0, 3)
    const remainingEntries = leaderboardData.slice(3)

    return (
        <div className='quiz-creation'>
            <div className='mx-auto min-h-screen max-w-7xl px-4 py-8'>
                <div className='absolute top-10 left-4 md:top-14 md:left-8'>
                    <Link href='/dashboard' className='text-white'>
                        <ArrowLeft />
                    </Link>
                </div>
                <h1
                    className={`mb-8 text-center text-5xl font-bold text-white md:text-8xl ${bebasNeue.className}`}
                >
                    Leaderboard
                </h1>

                {/* Stats Cards */}
                {stats && (
                    <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
                        <div className='bg-card rounded-lg bg-white p-6'>
                            <h3 className='text-sm font-bold text-pink-700'>
                                Total participants
                            </h3>
                            <p className='text-2xl'>{stats.totalUsers}</p>
                        </div>
                        <div className='bg-card rounded-lg bg-white p-6'>
                            <h3 className='text-sm font-bold text-pink-700'>
                                Total quizzes taken
                            </h3>
                            <p className='text-2xl'>{stats.totalQuizzes}</p>
                        </div>
                        <div className='bg-card rounded-lg bg-white p-6'>
                            <h3 className='text-sm font-bold text-pink-700'>
                                Average score
                            </h3>
                            <p className='text-2xl'>
                                {stats.averageScore.toFixed(1)}
                            </p>
                        </div>
                        <div className='bg-card rounded-lg bg-white p-6'>
                            <h3 className='text-sm font-bold text-pink-700'>
                                Highest score (total)
                            </h3>
                            <p className='text-2xl'>{stats.topScore}</p>
                        </div>
                    </div>
                )}

                {/* User Stats (if logged in) */}
                {user && stats?.userStats && (
                    <div className='mb-8 rounded-lg border border-pink-200 bg-white p-6'>
                        <h3 className='mb-4 text-lg font-semibold text-pink-700'>
                            Your stats
                        </h3>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                            <div className='text-center'>
                                <p className='text-2xl font-bold'>
                                    #{stats.userStats.rank}
                                </p>
                                <p className='text-sm text-pink-700'>
                                    Your rank
                                </p>
                            </div>
                            <div className='text-center'>
                                <p className='text-2xl font-bold'>
                                    {stats.userStats.score}
                                </p>
                                <p className='text-sm text-pink-700'>
                                    Total score
                                </p>
                            </div>
                            <div className='text-center'>
                                <p className='text-2xl font-bold'>
                                    {stats.userStats.quizzesTaken}
                                </p>
                                <p className='text-sm text-pink-700'>
                                    Quizzes taken
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Top 3 Podium */}
                {!isLoading && !error && topThree.length > 0 && (
                    <div className='mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3'>
                        {/* First Place */}
                        <div className='order-0 flex transform flex-col items-center rounded-lg bg-yellow-100 p-4'>
                            <div className='mb-2 text-4xl'>🏆</div>
                            <div className='text-center'>
                                <p className='text-lg font-bold'>
                                    {topThree[0]?.username.toLowerCase()}
                                </p>
                                <p className='text-sm text-gray-600'>
                                    {topThree[0]?.score.toLocaleString()} pts
                                </p>
                            </div>
                        </div>
                        {/* Second Place */}
                        <div className='order-1 flex flex-col items-center rounded-lg bg-gray-100 p-4'>
                            <div className='mb-2 text-4xl'>🥈</div>
                            <div className='text-center'>
                                <p className='font-bold'>
                                    {topThree[1]?.username.toLowerCase()}
                                </p>
                                <p className='text-sm text-gray-600'>
                                    {topThree[1]?.score.toLocaleString()} pts
                                </p>
                            </div>
                        </div>
                        {/* Third Place */}
                        <div className='order-2 flex flex-col items-center rounded-lg bg-orange-50 p-4'>
                            <div className='mb-2 text-4xl'>🥉</div>
                            <div className='text-center'>
                                <p className='font-bold'>
                                    {topThree[2]?.username.toLowerCase()}
                                </p>
                                <p className='text-sm text-gray-600'>
                                    {topThree[2]?.score.toLocaleString()} pts
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {isLoading ? (
                    <div className='flex min-h-[200px] items-center justify-center'>
                        <div className='border-primary h-8 w-8 animate-spin rounded-full border-b-2'></div>
                    </div>
                ) : error ? (
                    <div className='text-center text-red-500'>{error}</div>
                ) : leaderboardData.length === 0 ? (
                    <div className='text-muted-foreground text-center'>
                        No leaderboard data available.
                    </div>
                ) : (
                    /* Leaderboard Table */
                    <div className='bg-card overflow-auto rounded-md bg-white text-black'>
                        <table className='w-full'>
                            <thead className='bg-muted font-bold'>
                                <tr>
                                    <th className='px-6 py-3 text-left text-xs uppercase'>
                                        Rank
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs uppercase'>
                                        Username
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs uppercase'>
                                        Score
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs uppercase'>
                                        Quizzes taken
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs uppercase'>
                                        Average per quiz
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='bg-popover divide-muted divide-y'>
                                {remainingEntries.map((entry) => {
                                    const isCurrentUser =
                                        user &&
                                        entry.username ===
                                            (user.username ||
                                                user.emailAddresses[0]
                                                    ?.emailAddress)
                                    return (
                                        <tr
                                            key={entry.rank}
                                            className={`hover:bg-muted/50 transition-colors duration-200 ${isCurrentUser ? 'border-l-4 border-pink-500 bg-pink-50/20 dark:bg-pink-950/20' : ''} `}
                                        >
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <div className='flex items-center'>
                                                    {entry.rank}
                                                </div>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <div className='flex items-center'>
                                                    {entry.username.toLowerCase()}
                                                    {isCurrentUser && (
                                                        <span className='ml-2 rounded-full bg-pink-700 px-2 py-1 text-xs text-white'>
                                                            You
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                {entry.score.toLocaleString()}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                {entry.quizzesTaken}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                {entry.quizzesTaken > 0
                                                    ? (
                                                          entry.score /
                                                          entry.quizzesTaken
                                                      ).toFixed(1)
                                                    : '0.0'}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

const ArrowLeft = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
        >
            <path
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m12 19l-7-7l7-7m7 7H5'
            />
        </svg>
    )
}

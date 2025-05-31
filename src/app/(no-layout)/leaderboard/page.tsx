'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'

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

export default function LeaderboardPage() {
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
                <div className='flex items-center space-x-2'>
                    <div className='h-4 w-4 animate-bounce rounded-full bg-pink-500 [animation-delay:-0.3s]'></div>
                    <div className='h-4 w-4 animate-bounce rounded-full bg-pink-500 [animation-delay:-0.15s]'></div>
                    <div className='h-4 w-4 animate-bounce rounded-full bg-pink-500'></div>
                    <span className='text-lg font-medium text-pink-700'>
                        Loading...
                    </span>
                </div>
            </div>
        )
    }

    return (
        <div className='bg-gradient-to-b from-pink-100 to-pink-200'>
            <div className='mx-auto min-h-screen max-w-7xl px-4 py-8'>
                <h1 className='mb-8 text-center text-4xl font-bold'>
                    Quiz Leaderboard
                </h1>

                {/* Stats Cards */}
                {stats && (
                    <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
                        <div className='bg-card rounded-lg bg-white p-6'>
                            <h3 className='text-sm font-bold text-pink-700'>
                                Total Participants
                            </h3>
                            <p className='text-2xl'>{stats.totalUsers}</p>
                        </div>
                        <div className='bg-card rounded-lg bg-white p-6'>
                            <h3 className='text-sm font-bold text-pink-700'>
                                Total Quizzes Taken
                            </h3>
                            <p className='text-2xl'>{stats.totalQuizzes}</p>
                        </div>
                        <div className='bg-card rounded-lg bg-white p-6'>
                            <h3 className='text-sm font-bold text-pink-700'>
                                Average Score
                            </h3>
                            <p className='text-2xl'>
                                {stats.averageScore.toFixed(1)}
                            </p>
                        </div>
                        <div className='bg-card rounded-lg bg-white p-6'>
                            <h3 className='text-sm font-bold text-pink-700'>
                                Highest Score
                            </h3>
                            <p className='text-2xl'>{stats.topScore}</p>
                        </div>
                    </div>
                )}

                {/* User Stats (if logged in) */}
                {user && stats?.userStats && (
                    <div className='mb-8 rounded-lg border border-pink-200 bg-white p-6'>
                        <h3 className='mb-4 text-lg font-semibold text-pink-800'>
                            Your Stats
                        </h3>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                            <div className='text-center'>
                                <p className='text-2xl font-bold'>
                                    #{stats.userStats.rank}
                                </p>
                                <p className='text-sm text-pink-800'>
                                    Your Rank
                                </p>
                            </div>
                            <div className='text-center'>
                                <p className='text-2xl font-bold'>
                                    {stats.userStats.score}
                                </p>
                                <p className='text-sm text-pink-800'>
                                    Total Score
                                </p>
                            </div>
                            <div className='text-center'>
                                <p className='text-2xl font-bold'>
                                    {stats.userStats.quizzesTaken}
                                </p>
                                <p className='text-sm text-pink-800'>
                                    Quizzes Taken
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
                    <div className='bg-card overflow-auto rounded-md'>
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
                                        Quizzes Taken
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs uppercase'>
                                        Avg per Quiz
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='bg-popover divide-muted divide-y'>
                                {leaderboardData.map((entry) => {
                                    const isCurrentUser =
                                        user &&
                                        entry.username ===
                                            (user.username ||
                                                user.emailAddresses[0]
                                                    ?.emailAddress)
                                    return (
                                        <tr
                                            key={entry.rank}
                                            className={`hover:bg-muted/50 transition-colors duration-200 ${entry.rank === 1 ? 'bg-yellow-50/20 dark:bg-yellow-950/20' : ''} ${isCurrentUser ? 'border-l-4 border-pink-500 bg-pink-50/20 dark:bg-pink-950/20' : ''} `}
                                        >
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <div className='flex items-center'>
                                                    {entry.rank === 1 && '🏆 '}
                                                    {entry.rank === 2 && '🥈 '}
                                                    {entry.rank === 3 && '🥉 '}
                                                    {entry.rank}
                                                </div>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <div className='flex items-center'>
                                                    {entry.username}
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

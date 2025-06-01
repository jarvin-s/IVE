'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Bebas_Neue } from 'next/font/google'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'

const bebasNeue = Bebas_Neue({
    weight: '400',
    subsets: ['latin'],
})

const Progress = ({
    value,
    className,
    indicatorClassName,
}: {
    value: number
    className?: string
    indicatorClassName?: string
}) => {
    return (
        <div
            className={`relative w-full overflow-hidden rounded-full ${className || ''}`}
        >
            <div
                className={`h-full ${indicatorClassName || ''}`}
                style={{ width: `${value}%` }}
            />
        </div>
    )
}

interface QuizProps {
    questions: {
        question: string
        options: string[]
        correct_answer: string
        incorrect_answers: string[]
        image?: string
    }[]
    quizId: string
    initialQuestion: number
    initialScore: number
    initialAnswerHistory: Array<{
        quizId: string
        userAnswer: string
        correctAnswer: string
        correct: boolean
    }>
}

export default function Game({
    questions: quizQuestions,
    quizId,
    initialQuestion,
    initialScore,
    initialAnswerHistory = [],
}: QuizProps) {
    const { user } = useUser()
    const [currentQuestion, setCurrentQuestion] = useState(initialQuestion)
    const [score, setScore] = useState(initialScore)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [answered, setAnswered] = useState(false)
    const [answerHistory, setAnswerHistory] = useState<
        Array<{
            quizId: string
            userAnswer: string
            correctAnswer: string
            correct: boolean
        }>
    >(initialAnswerHistory)
    const [highlightedOption, setHighlightedOption] = useState<string | null>(
        null
    )
    const nextQuestion = currentQuestion + 1
    const isCompleted = nextQuestion > quizQuestions.length

    const handleAnswerSelect = useCallback(
        (answer: string) => {
            if (answered) return
            setHighlightedOption(answer)
        },
        [answered]
    )

    const handleSubmitAnswer = useCallback(() => {
        if (answered || !highlightedOption) return
        setSelectedAnswer(highlightedOption)
        setAnswered(true)
    }, [answered, highlightedOption])

    const handleNextQuestion = useCallback(async () => {
        if (isSubmitting) return
        setIsSubmitting(true)

        const isCorrect =
            selectedAnswer === quizQuestions[currentQuestion].correct_answer

        const newScore = isCorrect ? score + 1 : score
        const newAnswerEntry = {
            quizId,
            userAnswer: selectedAnswer,
            correctAnswer: quizQuestions[currentQuestion].correct_answer,
            correct: isCorrect,
        }

        setScore(newScore)
        setAnswerHistory((prev) => [...prev, newAnswerEntry])

        setCurrentQuestion(nextQuestion)
        setSelectedAnswer('')
        setAnswered(false)
        setHighlightedOption(null)

        try {
            const response = await fetch('/api/quiz', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quizId,
                    currentQuestion: nextQuestion,
                    score: newScore,
                    completed: nextQuestion >= quizQuestions.length,
                    answerHistory: [...answerHistory, newAnswerEntry],
                }),
            })

            console.log('Quiz API response status:', response.status)
            
            if (!response.ok) {
                const errorData = await response.text()
                console.error('Quiz API error response:', errorData)
                throw new Error(`API call failed: ${response.status} - ${errorData}`)
            }

            const responseData = await response.json()
            console.log('Quiz API success response:', responseData)
        } catch (error) {
            console.error('Error saving quiz progress:', error)
            
            // Show user-friendly error message
            alert(`Failed to save quiz progress: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your internet connection and try again.`)
            
            setScore(score)
            setAnswerHistory(answerHistory)
            setCurrentQuestion(currentQuestion)
            setSelectedAnswer(selectedAnswer)
            setAnswered(true)
            setHighlightedOption(selectedAnswer)
        }

        setIsSubmitting(false)
    }, [
        currentQuestion,
        quizQuestions,
        selectedAnswer,
        score,
        quizId,
        answerHistory,
        nextQuestion,
        isSubmitting,
    ])

    const handleRestart = async () => {
        setAnswerHistory([])

        await fetch('/api/quiz', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quizId,
                currentQuestion: 0,
                score: 0,
                completed: false,
                answerHistory: [],
            }),
        })
        setCurrentQuestion(0)
        setScore(0)
        setAnswered(false)
        setHighlightedOption(null)
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isCompleted) return

            const key = event.key

            if (key === 'Enter') {
                if (answered && !isSubmitting) {
                    handleNextQuestion()
                } else if (highlightedOption && !answered) {
                    handleSubmitAnswer()
                }
                return
            }

            if (!answered) {
                if (
                    key === '1' &&
                    quizQuestions[currentQuestion].options.length >= 1
                ) {
                    setHighlightedOption(
                        quizQuestions[currentQuestion].options[0]
                    )
                }
                if (
                    key === '2' &&
                    quizQuestions[currentQuestion].options.length >= 2
                ) {
                    setHighlightedOption(
                        quizQuestions[currentQuestion].options[1]
                    )
                }
                if (
                    key === '3' &&
                    quizQuestions[currentQuestion].options.length >= 3
                ) {
                    setHighlightedOption(
                        quizQuestions[currentQuestion].options[2]
                    )
                }
                if (
                    key === '4' &&
                    quizQuestions[currentQuestion].options.length >= 4
                ) {
                    setHighlightedOption(
                        quizQuestions[currentQuestion].options[3]
                    )
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [
        handleNextQuestion,
        handleSubmitAnswer,
        quizQuestions,
        currentQuestion,
        selectedAnswer,
        isCompleted,
        isSubmitting,
        answered,
        highlightedOption,
    ])

    return isCompleted ? (
        <div className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-pink-200 p-6'>
            <div className='w-full max-w-2xl rounded-md border border-pink-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm'>
                <h2 className='mb-6 text-center text-4xl font-bold text-pink-700'>
                    Quiz complete!
                </h2>
                <Image
                    src='/gifs/quiz-complete.gif'
                    alt='Quiz complete'
                    width={0}
                    height={0}
                    className='h-auto w-full'
                    loading='lazy'
                />
                <p className='my-6 text-center text-xl'>
                    Your score:{' '}
                    <span className='font-bold text-pink-700'>
                        {score}/{quizQuestions.length}
                    </span>
                </p>
                <div className='flex flex-col items-center gap-4'>
                    <div className='flex flex-col gap-4 md:flex-row'>
                        <Button
                            onClick={handleRestart}
                            className='w-64 rounded-md bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-2 text-white shadow-md transition-all hover:from-pink-600 hover:to-pink-700 hover:shadow-lg md:w-36'
                        >
                            Play Again
                        </Button>
                        <Button
                            asChild
                            className='w-64 rounded-md bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-2 text-white shadow-md transition-all hover:from-pink-600 hover:to-pink-700 hover:shadow-lg md:w-36'
                        >
                            <Link href={`/quiz`}>New Quiz</Link>
                        </Button>
                    </div>
                    <div className='flex flex-col gap-4 md:flex-row'>
                        {user ? (
                            <>
                                <Button
                                    asChild
                                    variant='outline'
                                    className='w-64 border-pink-300 text-pink-600 hover:bg-pink-200/50 md:w-36'
                                >
                                    <Link href='/leaderboard'>Leaderboard</Link>
                                </Button>
                                <Button
                                    asChild
                                    variant='outline'
                                    className='w-64 border-pink-300 text-pink-600 hover:bg-pink-200/50 md:w-36'
                                >
                                    <Link href='/dashboard'>
                                        Back to Dashboard
                                    </Link>
                                </Button>
                            </>
                        ) : (
                            <Button
                                asChild
                                variant='outline'
                                className='w-64 border-pink-300 text-pink-600 hover:bg-pink-200/50 md:w-36'
                            >
                                <Link href='/'>Back to Home</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className='flex min-h-screen flex-col bg-gradient-to-b from-pink-100 to-pink-200'>
            <header className='relative flex w-full justify-center px-6 py-4'>
                <div className='absolute top-4 left-4 md:top-6 md:left-8'>
                    <Link href={user ? '/dashboard' : '/quiz'}>
                        <Button
                            variant='ghost'
                            size='icon'
                            className='rounded-full'
                        >
                            <ArrowLeft className='h-5 w-5 text-pink-600' />
                        </Button>
                    </Link>
                </div>
                <h1
                    className={`${bebasNeue.className} text-3xl font-bold text-pink-600 md:text-9xl`}
                >
                    IVE QUIZ
                </h1>
            </header>

            <main className='flex flex-1 flex-col items-center justify-center p-6'>
                <div className='w-full max-w-md'>
                    <div className='mb-6 flex items-center justify-between'>
                        <span className='text-xl font-bold text-pink-700'>
                            Question:{' '}
                            <span className='font-medium'>
                                {currentQuestion + 1}/{quizQuestions.length}
                            </span>
                        </span>
                        <span className='text-xl font-bold text-pink-700'>
                            Score: <span className='font-medium'>{score}</span>
                        </span>
                    </div>

                    <Progress
                        value={(currentQuestion / quizQuestions.length) * 100}
                        className='h-2 bg-pink-200'
                        indicatorClassName='bg-gradient-to-r from-pink-500 to-pink-600'
                    />

                    <div className='relative mt-8'>
                        <div className='relative overflow-hidden rounded-lg border border-pink-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm'>
                            {quizQuestions[currentQuestion].image && (
                                <div className='flex justify-center'>
                                    <Image
                                        src={
                                            quizQuestions[currentQuestion]
                                                .image || '/default-image.png'
                                        }
                                        alt='Question Image'
                                        width={400}
                                        height={200}
                                        className='mb-4 rounded-lg'
                                    />
                                </div>
                            )}
                            <h2 className='mb-6 text-center text-xl font-bold text-pink-700 md:text-2xl'>
                                {quizQuestions[currentQuestion].question}
                            </h2>

                            <div className='space-y-3'>
                                {quizQuestions[currentQuestion].options.map(
                                    (option, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                handleAnswerSelect(option)
                                            }
                                            className={`w-full cursor-pointer rounded-xl p-4 text-left transition-all ${
                                                answered &&
                                                option ===
                                                    quizQuestions[
                                                        currentQuestion
                                                    ].correct_answer
                                                    ? 'border-2 border-green-600 bg-green-100 text-green-800'
                                                    : selectedAnswer === option
                                                      ? option ===
                                                        quizQuestions[
                                                            currentQuestion
                                                        ].correct_answer
                                                          ? 'border-2 border-green-600 bg-green-100 text-green-800'
                                                          : 'border-2 border-red-400 bg-red-100 text-red-800'
                                                      : option ===
                                                          highlightedOption
                                                        ? 'border-2 border-pink-500 bg-pink-50 text-black'
                                                        : 'border-2 border-pink-100 bg-white/70 text-black hover:border-pink-500'
                                            }`}
                                            disabled={answered}
                                        >
                                            <div className='flex items-center'>
                                                <div
                                                    className={`mr-3 flex h-6 w-6 items-center justify-center rounded-full ${
                                                        answered &&
                                                        option ===
                                                            quizQuestions[
                                                                currentQuestion
                                                            ].correct_answer
                                                            ? 'bg-green-600 text-white'
                                                            : selectedAnswer ===
                                                                option
                                                              ? option ===
                                                                quizQuestions[
                                                                    currentQuestion
                                                                ].correct_answer
                                                                  ? 'border-2 border-green-600 bg-green-100 text-green-800'
                                                                  : 'bg-red-500 text-white'
                                                              : option ===
                                                                  highlightedOption
                                                                ? 'bg-pink-300 text-pink-700'
                                                                : 'bg-pink-100 text-pink-500'
                                                    }`}
                                                >
                                                    {String.fromCharCode(
                                                        65 + index
                                                    )}
                                                </div>
                                                {option}
                                            </div>
                                        </button>
                                    )
                                )}
                            </div>

                            {!answered && (
                                <div className='mt-6 flex justify-end'>
                                    <Button
                                        onClick={handleSubmitAnswer}
                                        disabled={!highlightedOption}
                                        className='rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-2 text-white shadow-md transition-all hover:from-pink-600 hover:to-pink-700 hover:shadow-lg'
                                    >
                                        Submit Answer
                                    </Button>
                                </div>
                            )}

                            {answered && (
                                <div className='mt-6 flex justify-end'>
                                    <Button
                                        onClick={handleNextQuestion}
                                        className='flex items-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-2 text-white shadow-md transition-all hover:from-pink-600 hover:to-pink-700 hover:shadow-lg'
                                    >
                                        {currentQuestion <
                                        quizQuestions.length - 1
                                            ? 'Next Question'
                                            : 'See Results'}
                                        <ArrowRight className='h-4 w-4' />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

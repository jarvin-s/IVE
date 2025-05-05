'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

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
    questions,
    quizId,
    initialQuestion,
    initialScore,
    initialAnswerHistory = [],
}: QuizProps) {
    const [currentQuestion, setCurrentQuestion] = useState(initialQuestion)
    const [score, setScore] = useState(initialScore)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [answerHistory, setAnswerHistory] = useState<
        Array<{
            quizId: string
            userAnswer: string
            correctAnswer: string
            correct: boolean
        }>
    >(initialAnswerHistory)
    const nextQuestion = currentQuestion +  1
    const isCompleted = nextQuestion > questions.length

    const handleAnswerClick = (answer: string) => {
        setSelectedAnswer(answer)
    }

    const handleNext = useCallback(async () => {
        if (isSubmitting) return
        setIsSubmitting(true)

        const isCorrect =
            selectedAnswer === questions[currentQuestion].correct_answer

        const newScore = isCorrect ? score + 1 : score
        setScore(newScore)

        setAnswerHistory((prev) => [
            ...prev,
            {
                quizId,
                userAnswer: selectedAnswer,
                correctAnswer: questions[currentQuestion].correct_answer,
                correct: isCorrect,
            },
        ])

        await fetch('/api/quiz', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quizId,
                currentQuestion: nextQuestion,
                score: newScore,
                completed: nextQuestion >= questions.length,
                answerHistory: [
                    ...answerHistory,
                    {
                        quizId,
                        userAnswer: selectedAnswer,
                        correctAnswer:
                            questions[currentQuestion].correct_answer,
                        correct: isCorrect,
                    },
                ],
            }),
        })

        if (currentQuestion < questions.length) {
            setCurrentQuestion(nextQuestion)
            setSelectedAnswer('')
        }
        setIsSubmitting(false)
    }, [
        currentQuestion,
        questions,
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
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isCompleted) return

            const key = event.key
            if (key === 'Enter' && selectedAnswer && !isSubmitting) {
                handleNext()
            }
            if (key === '1') {
                handleAnswerClick(questions[currentQuestion].options[0])
            }
            if (key === '2') {
                handleAnswerClick(questions[currentQuestion].options[1])
            }
            if (key === '3') {
                handleAnswerClick(questions[currentQuestion].options[2])
            }
            if (key === '4') {
                handleAnswerClick(questions[currentQuestion].options[3])
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [
        handleNext,
        questions,
        currentQuestion,
        selectedAnswer,
        isCompleted,
        isSubmitting,
    ])

    return (
        <div className='mt-20 flex flex-col items-center justify-center bg-stone-950 p-10 md:p-40'>
            <div className='w-full text-center text-white'>
                {isCompleted ? (
                    <>
                        <div className='fixed top-2 left-2'>
                            <Button
                                asChild
                                variant={'default'}
                                size={'sm'}
                                className='bg-pink-800 text-white hover:bg-pink-700'
                            >
                                <Link href={`/dashboard`}>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='24'
                                        height='24'
                                        viewBox='0 0 24 24'
                                    >
                                        <path
                                            fill='currentColor'
                                            d='M12.707 17.293L8.414 13H18v-2H8.414l4.293-4.293l-1.414-1.414L4.586 12l6.707 6.707z'
                                        />
                                    </svg>
                                    Dashboard
                                </Link>
                            </Button>
                        </div>
                        <div className='text-center'>
                            <h2 className='mb-4 text-2xl'>Quiz completed</h2>
                            <div>
                                <h2 className='mb-4 text-2xl'>Your score</h2>
                            </div>
                            <div className='flex justify-center gap-4'>
                                <Button
                                    onClick={handleRestart}
                                    className='inline-flex items-center justify-center rounded-lg bg-pink-800 px-4 py-5 text-xl text-white hover:bg-pink-700'
                                >
                                    Play again
                                </Button>
                                <Button
                                    asChild
                                    className='inline-flex items-center justify-center rounded-lg bg-pink-800 px-4 py-5 text-xl text-white hover:bg-pink-700'
                                >
                                    <Link href={`/dashboard/config`}>
                                        New quiz
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='fixed top-2 left-2'>
                            <Button
                                asChild
                                variant={'default'}
                                size={'sm'}
                                className='bg-pink-800 text-white hover:bg-pink-700'
                            >
                                <Link href={`/dashboard`}>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='24'
                                        height='24'
                                        viewBox='0 0 24 24'
                                    >
                                        <path
                                            fill='currentColor'
                                            d='M12.707 17.293L8.414 13H18v-2H8.414l4.293-4.293l-1.414-1.414L4.586 12l6.707 6.707z'
                                        />
                                    </svg>
                                    Dashboard
                                </Link>
                            </Button>
                        </div>
                        <h2 className='mb-4 text-xl'>
                            Question {currentQuestion + 1} of {questions.length}
                        </h2>
                        <div className='mb-6'>
                            {questions[currentQuestion].image && (
                                <div className='flex justify-center'>
                                    <Image
                                        src={
                                            questions[currentQuestion].image ||
                                            '/default-image.png'
                                        }
                                        alt='Question Image'
                                        width={400}
                                        height={200}
                                        className='mb-4 rounded-lg'
                                    />
                                </div>
                            )}
                            <p className='text-2xl font-bold md:text-3xl'>
                                {questions[currentQuestion].question}
                            </p>
                        </div>
                        <div className='mb-6 grid w-full grid-cols-1 gap-4 md:grid-cols-2'>
                            {questions[currentQuestion].options.map(
                                (option, index) => (
                                    <Button
                                        key={option}
                                        onClick={() =>
                                            handleAnswerClick(option)
                                        }
                                        className={`flex w-full items-center rounded-lg p-8 text-left text-xl ${
                                            selectedAnswer === option
                                                ? 'bg-pink-800 text-white'
                                                : 'bg-stone-800 hover:bg-stone-700'
                                        }`}
                                    >
                                        <div className='mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border border-white/20 md:mr-5 md:h-10 md:w-10'>
                                            {index + 1}
                                        </div>
                                        <span className='flex-1'>{option}</span>
                                    </Button>
                                )
                            )}
                        </div>
                        <Button
                            onClick={handleNext}
                            disabled={!selectedAnswer || isSubmitting}
                            className='inline-flex w-full items-center justify-center rounded-lg bg-pink-800 px-4 py-5 text-xl text-white hover:bg-pink-700 disabled:opacity-50'
                        >
                            Next
                        </Button>
                    </>
                )}
            </div>
        </div>
    )
}

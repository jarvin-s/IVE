'use client'
import { useEffect, useState } from 'react'
import { useSession, useUser } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'

export default function Test() {
    const [questions, setQuestions] = useState<
        { id: string; question: string }[]
    >([])
    const [loading, setLoading] = useState(true)
    const [question, setQuestion] = useState('')
    const { user } = useUser()
    const { session } = useSession()

    function createClerkSupabaseClient() {
        return createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_KEY!,
            {
                async accessToken() {
                    return session?.getToken() ?? null
                },
            }
        )
    }

    const client = createClerkSupabaseClient()

    useEffect(() => {
        if (!user) return

        async function loadQuestions() {
            setLoading(true)
            const { data, error } = await client.from('questions').select()
            if (!error) setQuestions(data)
            setLoading(false)
        }

        loadQuestions()
    }, [user])

    async function createQuestion(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        await client.from('questions').insert({
            question,
            user_id: user?.id,
        })
        console.log(user?.id)
        window.location.reload()
    }

    return (
        <div className='flex flex-col items-center justify-center bg-black text-white'>
            <h1>Tasks</h1>

            {loading && <p>Loading...</p>}

            {!loading &&
                questions.length > 0 &&
                questions.map((question: { id: string; question: string }) => (
                    <p key={question.id}>{question.question}</p>
                ))}

            {!loading && questions.length === 0 && <p>No questions found</p>}

            <form onSubmit={createQuestion}>
                <input
                    autoFocus
                    type='text'
                    name='question'
                    placeholder='Enter new question'
                    onChange={(e) => setQuestion(e.target.value)}
                    value={question}
                />
                <button type='submit'>Add</button>
            </form>

            {user && (
                <div className='mt-4 rounded bg-black p-2'>
                    <p>
                        Logged in as: {user.firstName} {user.lastName}
                    </p>
                    <p>Clerk ID: {user.id}</p>
                </div>
            )}
        </div>
    )
}

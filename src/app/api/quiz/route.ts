import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { auth, clerkClient } from '@clerk/nextjs/server'

async function updateLeaderboard(userId: string, username: string) {
    const supabase = await createClient()

    const { data: existingEntry } = await supabase
        .from('quiz_leaderboard')
        .select('*')
        .eq('user_id', userId)
        .single()

    if (!existingEntry) {
        await supabase
            .from('quiz_leaderboard')
            .insert({
                user_id: userId,
                username: username,
            })
    }
}

export async function GET() {
    const supabase = await createClient()

    const { data: questions, error } = await supabase
        .from('random_questions')
        .select('*')

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!questions || questions.length === 0) {
        return NextResponse.json({ error: 'No questions found for the specified locale.' }, { status: 404 });
    }

    return NextResponse.json({ questions });
}

export async function PUT(request: Request) {
    console.log('Quiz PUT API called')

    try {
        const supabase = await createClient()
        console.log('Supabase client created')

        const { userId } = await auth()
        console.log('Auth result:', { userId })

        const body = await request.json()
        console.log('Request body:', body)

        const { quizId, currentQuestion, score, completed, answerHistory } = body

        if (!quizId) {
            console.log('No quizId provided')
            return NextResponse.json({ error: 'Quiz ID required' }, { status: 400 })
        }

        const { data: existingSession } = await supabase
            .from('quiz_sessions')
            .select('completed, score')
            .eq('session_id', quizId)
            .single()

        if (!existingSession) {
            return new Response('Session not found', { status: 404 })
        }

        const updateData: {
            current_question?: number
            score?: number
            completed?: boolean
            answer_history?: Array<{
                quizId: string
                userAnswer: string
                correctAnswer: string
                correct: boolean
            }>
        } = {}

        if (currentQuestion !== undefined) updateData.current_question = currentQuestion
        if (score !== undefined) updateData.score = score
        if (completed !== undefined) updateData.completed = completed
        if (answerHistory !== undefined) updateData.answer_history = answerHistory

        const { error } = await supabase
            .from('quiz_sessions')
            .update(updateData)
            .eq('session_id', quizId)

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        if (completed && !existingSession.completed) {
            console.log('Quiz completed, updating leaderboard')
            if (userId) {
                updateLeaderboardAsync(userId)
            }
        }

        console.log('Quiz update successful')
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Quiz PUT API error:', error)
        return NextResponse.json({
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}

async function updateLeaderboardAsync(userId: string) {
    try {
        const clerk = await clerkClient()
        const user = await clerk.users.getUser(userId)
        const username = user.username || user.emailAddresses[0]?.emailAddress || 'Anonymous'
        await updateLeaderboard(userId, username)
    } catch (error) {
        console.error('Error updating leaderboard:', error)
    }
}
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { auth, clerkClient } from '@clerk/nextjs/server'

async function updateLeaderboard(userId: string, username: string, score: number) {
    const supabase = await createClient()

    const { data: existingEntry } = await supabase
        .from('quiz_leaderboard')
        .select('total_score')
        .eq('user_id', userId)
        .single()

    if (existingEntry) {
        await supabase
            .from('quiz_leaderboard')
            .update({
                total_score: existingEntry.total_score + score,
                calculated_at: new Date().toISOString()
            })
            .eq('user_id', userId)
    } else {
        await supabase
            .from('quiz_leaderboard')
            .insert({
                user_id: userId,
                username: username,
                total_score: score,
                calculated_at: new Date().toISOString()
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
    const supabase = await createClient()
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { quizId, currentQuestion, score, completed, answerHistory } =
        await request.json()

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
        updateLeaderboardAsync(userId, score)
    }

    return NextResponse.json({ success: true })
}

async function updateLeaderboardAsync(userId: string, score: number) {
    try {
        const clerk = await clerkClient()
        const user = await clerk.users.getUser(userId)
        const username = user.username || user.emailAddresses[0]?.emailAddress || 'Anonymous'
        await updateLeaderboard(userId, username, score)
    } catch (error) {
        console.error('Error updating leaderboard:', error)
    }
}
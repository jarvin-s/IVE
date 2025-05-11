import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
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

    const shuffledQuestions = shuffleArray([...questions]);
    return NextResponse.json({ questions: shuffledQuestions });
}

export async function PUT(request: Request) {
    const supabase = await createClient()
    const { quizId, currentQuestion, score, completed, answerHistory } =
        await request.json()

    const { data: existingSession } = await supabase.from('quiz_sessions').select('*').eq('session_id', quizId).single();

    if (!existingSession) {
        return new Response('Session not found', { status: 404 });
    }

    const { data: updatedSession, error } = await supabase.from('quiz_sessions').update({
        current_question: currentQuestion ?? existingSession.current_question,
        score: score ?? existingSession.score,
        completed: completed ?? existingSession.completed,
        answer_history: answerHistory ?? existingSession.answer_history,
    }).eq('session_id', quizId).select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ updatedSession });
}
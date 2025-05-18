import { createClient } from '@/utils/supabase/server'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const supabase = await createClient()
    const { userId } = await auth()
    
    const url = new URL(request.url)
    const quizId = url.searchParams.get('id')
    
    if (!quizId) {
        return NextResponse.json(
            { error: 'Quiz ID is required' },
            { status: 400 }
        )
    }

    const { data: quizDetails, error: quizDetailsError } = await supabase
        .from('quiz_sessions')
        .select('*, user_id')
        .eq('session_id', quizId)
        .single()

    if (quizDetailsError) {
        return NextResponse.json(
            { error: quizDetailsError.message },
            { status: 500 }
        )
    }

    if (quizDetails.user_id !== userId) {
        return NextResponse.json(
            { error: 'Unauthorized access to quiz details' },
            { status: 403 }
        )
    }

    return NextResponse.json({ quizDetails })
} 
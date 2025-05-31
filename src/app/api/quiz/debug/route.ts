import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { auth } from '@clerk/nextjs/server'

export async function GET() {
    const debugInfo: {
        timestamp: string
        environment: string | undefined
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        auth?: any
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        supabase?: any
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        database?: any
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        environment_vars?: any
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error?: any
    } = {
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
    }

    try {
        // Test authentication
        const { userId } = await auth()
        debugInfo.auth = {
            userId: userId ? 'present' : 'missing',
            userIdLength: userId ? userId.length : 0,
        }

        // Test Supabase connection
        const supabase = await createClient()
        debugInfo.supabase = {
            clientCreated: true,
        }

        // Test database query
        const { data: testQuery, error: testError } = await supabase
            .from('quiz_sessions')
            .select('session_id')
            .limit(1)

        debugInfo.database = {
            querySuccess: !testError,
            error: testError?.message || null,
            resultCount: testQuery?.length || 0,
        }

        // Test environment variables (without exposing secrets)
        debugInfo.environment_vars = {
            hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
            hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            hasClerkKey: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        }

        return NextResponse.json(debugInfo)
    } catch (error) {
        debugInfo.error = {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : null,
        }

        return NextResponse.json(debugInfo, { status: 500 })
    }
} 
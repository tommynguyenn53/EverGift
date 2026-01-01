import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params
    const cookieStore = await cookies()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: wedding, error } = await supabase
        .from('weddings')
        .select('stripe_account_id')
        .eq('id', id)
        .eq('user_id', user.id)
        .single()

    if (error || !wedding) {
        return NextResponse.json({ error: 'Wedding not found' }, { status: 404 })
    }

    return NextResponse.json({
        connected: !!wedding.stripe_account_id,
    })
}

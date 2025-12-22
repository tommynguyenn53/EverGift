import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function POST() {
    const cookieStore = await cookies()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
                set(name: string, value: string, options: any) {
                    cookieStore.set({name, value, ...options})
                },
                remove(name: string, options: any) {
                    cookieStore.set({name, value: '', ...options})
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

    // 1️⃣ Check for existing draft wedding
    const { data: existingDraft } = await supabase
        .from('weddings')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'draft')
        .limit(1)
        .single()

    if (existingDraft) {
        return NextResponse.json({
            weddingId: existingDraft.id,
            wedding: existingDraft,
        })
    }

    // 2️⃣ Create new draft if none exists
    const { data: wedding, error } = await supabase
        .from('weddings')
        .insert({
            user_id: user.id,
            status: 'draft',
        })
        .select()
        .single()

    if (error || !wedding) {
        return NextResponse.json(
            { error: 'Failed to create draft wedding' },
            { status: 500 }
        )
    }

    return NextResponse.json({
        weddingId: wedding.id,
        wedding,
    })
}

import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)

    const code = searchParams.get('code')

    if (code) {
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return cookies().get(name)?.value
                    },
                    set(name, value, options) {
                        cookies().set({ name, value, ...options })
                    },
                    remove(name, options) {
                        cookies().set({ name, value: '', ...options })
                    },
                },
            }
        )

        await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(origin)
}

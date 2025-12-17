'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabase/client'

export default function AuthCallbackPage() {
    const router = useRouter()
    const supabase = supabaseBrowser()

    useEffect(() => {
        const run = async () => {
            const { error } = await supabase.auth.exchangeCodeForSession(
                window.location.href
            )

            // Either way, go home after handling
            router.replace('/')
        }

        run()
    }, [supabase, router])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p>Signing you in…</p>
        </div>
    )
}

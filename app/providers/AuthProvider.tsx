'use client'

import { useEffect } from 'react'
import { supabaseBrowser } from '@/lib/supabase/client'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const supabase = supabaseBrowser()

    useEffect(() => {
        supabase.auth.getSession()
    }, [supabase])

    return <>{children}</>
}

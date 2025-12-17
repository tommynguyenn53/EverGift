'use client'

import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabase/client'

export default function LogoutButton() {
    const supabase = supabaseBrowser()
    const router = useRouter()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/auth/login')
    }

    return (
        <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-black"
        >
            Log out
        </button>
    )
}

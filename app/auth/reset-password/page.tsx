'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
    const supabase = supabaseBrowser()
    const router = useRouter()

    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Ensures session is hydrated from reset link
        supabase.auth.getSession()
    }, [supabase])

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.updateUser({
            password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }

        // Password updated → logged in
        router.push('/dashboard')
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form
                onSubmit={handleUpdate}
                className="w-full max-w-sm space-y-4"
            >
                <h1 className="text-2xl font-semibold text-center">
                    Set new password
                </h1>

                <input
                    type="password"
                    required
                    minLength={8}
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                />

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-md bg-black text-white py-2 font-medium disabled:opacity-60"
                >
                    {loading ? 'Updating…' : 'Update password'}
                </button>
            </form>
        </div>
    )
}

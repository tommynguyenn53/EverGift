'use client'

import { useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
    const supabase = supabaseBrowser()

    const [email, setEmail] = useState('')
    const [sent, setSent] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${location.origin}/auth/reset-password`,
        })

        if (error) {
            setError(error.message)
        } else {
            setSent(true)
        }

        setLoading(false)
    }

    if (sent) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="w-full max-w-sm text-center space-y-4">
                    <h1 className="text-2xl font-semibold">Check your email</h1>
                    <p className="text-gray-600">
                        We’ve sent you a password reset link.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form
                onSubmit={handleReset}
                className="w-full max-w-sm space-y-4"
            >
                <h1 className="text-2xl font-semibold text-center">
                    Reset your password
                </h1>

                <input
                    type="email"
                    required
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                />

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-md bg-black text-white py-2 font-medium disabled:opacity-60"
                >
                    {loading ? 'Sending…' : 'Send reset link'}
                </button>
            </form>
        </div>
    )
}

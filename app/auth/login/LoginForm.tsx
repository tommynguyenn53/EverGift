'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabase/client'

export default function LoginForm() {
    const supabase = supabaseBrowser()
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const canSubmit = email.trim() !== '' && password.trim() !== ''

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!canSubmit) return

        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }

        router.push('/dashboard')
    }

    return (
        <form
            onSubmit={handleLogin}
            className="flex flex-col items-center gap-[24px] md:gap-[36px] text-left"
        >
            {/* Email */}
            <div className="w-[298px] md:w-[447px]">
                <label htmlFor="email"
                    className="block font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A] mb-[6px] md:mb-[9px]"
                >
                    Email Address
                </label>
                <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full bg-white rounded-[10px] md:rounded-[15px] px-[15px] py-[15px] md:px-[22.5px] md:py-[22.5px]
                    border border-black/10 font-inter text-[15px] md:text-[22.5px] text-[#3A3A3A] placeholder:text-[#3A3A3A]/35
                    transition focus:outline-none focus:ring-2 focus:ring-[#D8C9A6]/50"
                />
            </div>

            {/* Password */}
            <div className="w-[298px] md:w-[447px]">
                <label
                    htmlFor="password"
                    className="block font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A] mb-[6px] md:mb-[9px]"
                >
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-white rounded-[10px] md:rounded-[15px] px-[15px] py-[15px] md:px-[22.5px]
                    md:py-[22.5px] border border-black/10 font-inter text-[15px] md:text-[22.5px] text-[#3A3A3A]
                    placeholder:text-[#3A3A3A]/35 transition focus:outline-none focus:ring-2 focus:ring-[#D8C9A6]/50"
                />

                {/* Forgot password */}
                <a
                    href="/auth/forgot-password"
                    className="mt-[6px] md:mt-[9px] inline-block font-inter font-regular text-[11px] md:text-[16.5px]
                    tracking-[0.015em] text-[#3A3A3A] underline"
                >
                    Forgot your password?
                </a>
            </div>

            {/* Error */}
            {error && (
                <p className="text-[12px] text-red-600 text-center">
                    {error}
                </p>
            )}

            {/* CTA */}
            <button
                id="login-submit"
                type="submit"
                disabled={!canSubmit || loading}
                className="inline-flex shadow-[6px_4px_18px_rgba(0,0,0,0.1)] items-center justify-center rounded-[14px]
                md:rounded-[21px] bg-[#D8C9A6] px-[62px] py-[16px] md:px-[99px] md:py-[24px] font-inter font-medium
                text-[16px] md:text-[24px] text-white transition hover:opacity-90 active:opacity-80 active:scale-[0.98]
                disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {loading ? 'Logging in…' : 'Log In'}
            </button>

            {/* Signup link */}
            <p
                className="mt-[-8px] md:mt-[-4px] text-center font-inter text-[15px] md:text-[22.5px] leading-[170%]
                tracking-[0.015em] text-[#3A3A3A]"
            >
            <span className="font-normal">
              Don’t have an account?
            </span>
                <br />
                <a
                    href="/auth/signup"
                    className="font-medium text-[#C9A86A] underline underline-offset-2 hover:opacity-80 transition
                    hover:opacity-80 active:opacity-60"
                >
                    Sign up
                </a>
            </p>
        </form>
    )
}

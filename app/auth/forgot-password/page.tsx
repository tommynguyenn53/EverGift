'use client'

import {useState} from 'react'
import {supabaseBrowser} from '@/lib/supabase/client'
import PageBackground from '@/components/PageBackground'

export default function ForgotPasswordPage() {
    const supabase = supabaseBrowser()

    const [email, setEmail] = useState('')
    const [sent, setSent] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setLoading(true)
        setError(null)

        const {error} = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${location.origin}/auth/reset-password`,
        })

        if (error) {
            setError(error.message)
        } else {
            setSent(true)
        }

        setLoading(false)
    }

    const handleResend = async () => {
        setLoading(true)
        setError(null)
        setMessage(null)

        const {error} = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${location.origin}/auth/reset-password`,
        })

        if (error) {
            setError(error.message)
        } else {
            setMessage('Reset link resent.')
        }

        setLoading(false)
    }

    /* ----------------------------------
       CHECK YOUR EMAIL STATE
    ---------------------------------- */
    if (sent) {
        return (
            <PageBackground>

                <main className="w-full max-w-sm mx-auto flex flex-col items-center">
                    <div className="w-full max-w-sm flex flex-col items-center text-center">

                        <h1
                            className="mt-[40px] md:mt-[60px] font-inter font-medium text-[26px] md:text-[39px]
                            tracking-[0.015em] text-[#3A3A3A]"
                        >
                            Check your email
                        </h1>

                        <img
                            src="/email-icon.svg"
                            alt=""
                            className="mt-[24px] md:mt-[36px] md:w-[108px]"
                        />

                        <p
                            className="mt-[24px] md:mt-[36px] font-inter font-normal text-[15px] md:text-[22.5px]
                            leading-[150%] tracking-[0.015em] text-[#3A3A3A]"
                        >
                            We’ve sent you a link to reset your <br/> password.
                            If you don’t see it, check <br/> your spam or junk folder.
                        </p>

                        <p
                            className="mt-[24px] md:mt-[36px] font-inter text-[15px] md:text-[22.5px] leading-[170%]
                            tracking-[0.015em] text-[#3A3A3A]"
                        >
                      <span className="font-normal">
                        Didn’t get the email?
                      </span>
                            <br/>
                            <button
                                onClick={handleResend}
                                disabled={loading}
                                className="font-medium text-[#C9A86A] underline underline-offset-2 hover:opacity-80
                                disabled:opacity-50"
                            >
                                {loading ? 'Resending…' : 'Resend Link'}
                            </button>
                        </p>

                        {message && (
                            <p className="mt-[16px] md:mt-[24px] text-sm md:text-xl text-green-600">
                                {message}
                            </p>
                        )}

                        {error && (
                            <p className="mt-[16px] md:mt-[24px] text-sm md:text-xl text-red-600">
                                {error}
                            </p>
                        )}

                    </div>
                </main>
            </PageBackground>
        )
    }

    /* ----------------------------------
       FORGOT PASSWORD FORM
    ---------------------------------- */
    return (
        <PageBackground>

            <main className="w-full max-w-sm mx-auto flex flex-col items-center">
                <form
                    onSubmit={handleReset}
                    className="w-full max-w-sm flex flex-col items-center text-left"
                >
                    {/* Heading */}
                    <h1
                        className="md:w-[500px] mt-[40px] md:mt-[60px] font-inter font-medium text-[26px] md:text-[39px]
                        tracking-[0.015em] text-[#3A3A3A] text-center"
                    >
                        Forgot your password?
                    </h1>

                    {/* Sub text */}
                    <p
                        className="mt-[20px] md:mt-[30px] font-inter font-normal text-[15px] md:text-[22.5px]
                        leading-[150%] tracking-[0.015em] text-[#3A3A3A] text-center"
                    >
                        Enter your email and we’ll send you <br/> a link to reset your password.
                    </p>

                    {/* Email input */}
                    <div className="mt-[40px] md:mt-[60px] w-[298px] md:w-[447px]">
                        <label htmlFor="email"
                            className="block font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A] mb-[6px]
                            md:mb-[9px]"
                        >
                            Email Address
                        </label>

                        <input
                            id="email"
                            type="email"
                            required
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white rounded-[10px] md:rounded-[15px] px-[15px] py-[15px]
                            md:px-[22.5px] md:py-[22.5px] border border-black/10 font-inter text-[15px]
                            md:text-[22.5px] text-[#3A3A3A] placeholder:text-[#3A3A3A]/35 transition focus:outline-none
                            focus:ring-2 focus:ring-[#D8C9A6]/50"
                        />
                    </div>

                    {error && (
                        <p className="mt-[16px] md:mt-[24px] text-sm md:text-xl text-red-600 text-center">
                            {error}
                        </p>
                    )}

                    {/* CTA */}
                    <button
                        type="submit"
                        disabled={loading || !email}
                        className="mt-[32px] md:mt-[48px] inline-flex items-center justify-center rounded-[14px]
                          md:rounded-[21px] bg-[#D8C9A6] px-[62px] py-[16px] md:px-[99px] md:py-[24px] font-inter
                          font-medium text-[16px] md:text-[24px] text-white transition disabled:opacity-60 disabled:cursor-not-allowed
                          hover:opacity-90 active:opacity-80 active:scale-[0.98]"
                    >
                        {loading ? 'Sending…' : 'Send Reset Link'}
                    </button>

                    {/* Back to login */}
                    <p
                        className="mt-[24px] md:mt-[36px] text-center font-inter text-[15px] md:text-[22.5px] leading-[170%]
                        tracking-[0.015em] text-[#3A3A3A]"
                    >
            <span className="font-normal">
              Remember your password?
            </span>
                        <br/>
                        <a
                            href="/auth/login"
                            className="font-medium text-[#C9A86A] underline underline-offset-2 hover:opacity-80 transition
                            hover:opacity-80 active:opacity-60"
                        >
                            Log in
                        </a>
                    </p>
                </form>
            </main>
        </PageBackground>
    )
}

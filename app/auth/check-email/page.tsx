'use client'

import {useState} from 'react'
import PageBackground from '@/components/PageBackground'
import {supabaseBrowser} from '@/lib/supabase/client'

export default function CheckEmailPage() {
    const supabase = supabaseBrowser()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleResend = async () => {
        setLoading(true)
        setError(null)
        setMessage(null)

        const {
            data: {user},
            error,
        } = await supabase.auth.getUser()

        if (!user?.email) {
            setError('Unable to resend email. Please try signing up again.')
            setLoading(false)
            return
        }

        const {error: resendError} = await supabase.auth.resend({
            type: 'signup',
            email: user.email,
            options: {
                emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/verified`,
            },
        })

        if (resendError) {
            setError(resendError.message)
        } else {
            setMessage('Verification email resent.')
        }

        setLoading(false)
    }

    return (
        <PageBackground>
            <main className="w-full max-w-sm mx-auto flex flex-col items-center">
                <div className="w-full max-w-sm flex flex-col items-center text-center">

                    {/* Heading */}
                    <h1
                        className="mt-[40px] md:mt-[60px] font-inter font-medium text-[26px] md:text-[39px] tracking-[0.015em]
                        text-[#3A3A3A]"
                    >
                        Check your email
                    </h1>

                    {/* Email icon */}
                    <div className="mt-[24px] md:mt-[36px]">
                        <img
                            src="/email-icon.svg"
                            alt=""
                            className="md:w-[108px]"
                        />
                    </div>

                    {/* Main message */}
                    <p
                        className="mt-[24px] md:mt-[36px] font-inter font-normal text-[15px] md:text-[22.5px]
                        leading-[150%] tracking-[0.015em] text-[#3A3A3A]"
                    >
                        We’ve sent you a link to verify your <br/> email address.
                    </p>

                    {/* Secondary message */}
                    <p
                        className="mt-[16px] md:mt-[24px] font-inter font-normal text-[15px] md:text-[22.5px] leading-[150%]
                        tracking-[0.015em] text-[#3A3A3A]"
                    >
                        If you don’t see it, please check your <br/> spam or junk folder.
                    </p>

                    {/* Resend */}
                    <p
                        className="mt-[32px] md:mt-[48px] font-inter text-[15px] md:text-[22.5px] leading-[170%]
                        tracking-[0.015em] text-[#3A3A3A]"
                    >
                        <span className="font-normal">
                          Didn’t receive the email?
                        </span>
                        <br/>
                        <button
                            onClick={handleResend}
                            disabled={loading}
                            className="font-medium text-[#C9A86A] underline underline-offset-2 hover:opacity-80
                            disabled:opacity-50 transition hover:opacity-80 active:opacity-60"
                        >
                            {loading ? 'Resending…' : 'Resend Link'}
                        </button>
                    </p>

                    {/* Feedback */}
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

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabase/client'
import PageBackground from '@/components/PageBackground'

export default function ResetPasswordPage() {
    const supabase = supabaseBrowser()
    const router = useRouter()

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const passwordValid = password.length >= 8
    const passwordsMatch = password === confirmPassword && confirmPassword !== ''

    useEffect(() => {
        // Ensure Supabase picks up the reset session from the email link
        supabase.auth.getSession()
    }, [supabase])

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!passwordValid || !passwordsMatch) return

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

        // Force explicit re-login after password change
        await supabase.auth.signOut()
        router.push('/auth/password-updated')
    }

    return (
        <PageBackground>

            <main className="w-full max-w-sm mx-auto flex flex-col items-cente">
                <form
                    onSubmit={handleUpdate}
                    className="w-full max-w-sm flex flex-col items-center text-left"
                >
                    {/* Heading */}
                    <h1
                        className="
                          md:w-[500px]
                          mt-[40px]
                          md:mt-[60px]
                          font-inter
                          font-medium
                          text-[26px]
                          md:text-[39px]
                          tracking-[0.015em]
                          text-[#3A3A3A]
                          text-center
                        "
                    >
                        Create a new password
                    </h1>

                    {/* Lock icon */}
                    <img
                        src="/lock-icon-2.svg"
                        alt=""
                        className="mt-[24px] md:mt-[36px] md:w-[108px]"
                    />

                    {/* Sub text */}
                    <p
                        className="
                          mt-[24px]
                          md:mt-[36px]
                          font-inter
                          font-normal
                          text-[15px]
                          md:text-[22.5px]
                          leading-[150%]
                          tracking-[0.015em]
                          text-[#3A3A3A]
                          text-center
                        "
                    >
                        Enter your new password below.
                    </p>

                    {/* New password */}
                    <div className="mt-[40px] md:mt-[60px] w-[298px] md:w-[447px]">
                        <label
                            className="
                                block
                                font-inter
                                font-medium
                                text-[15px]
                                md:text-[22.5px]
                                text-[#3A3A3A]
                                mb-[6px]
                                md:mb-[9px]
                                "
                        >
                            New Password
                        </label>

                        <input
                            type="password"
                            required
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="
                                w-full
                                bg-white
                                rounded-[10px]
                                md:rounded-[15px]
                                px-[15px] py-[15px]
                                md:px-[22.5px] md:py-[22.5px]
                                border
                                border-black/10
                                font-inter
                                text-[15px]
                                md:text-[22.5px]
                                text-[#3A3A3A]
                                placeholder:text-[#3A3A3A]/35
                                transition
                                focus:outline-none
                                focus:ring-2
                                focus:ring-[#D8C9A6]/50
                          "
                        />

                        <p
                            className={`
                                mt-[6px]
                                md:mt-[9px]
                                font-inter
                                font-medium
                                text-[11px]
                                md:text-[16.5px]
                                tracking-[0.015em]
                ${
                                passwordValid
                                    ? 'text-green-600'
                                    : 'text-[#3A3A3A]'
                            }
              `}
                        >
                            Minimum 8 characters
                        </p>
                    </div>

                    {/* Confirm password */}
                    <div className="mt-[40px] md:mt-[60px] w-[298px] md:w-[447px]">
                        <label
                            className="
                                block
                                font-inter
                                font-medium
                                text-[15px]
                                md:text-[22.5px]
                                text-[#3A3A3A]
                                mb-[6px]
                                md:mb-[9px]
                            "
                        >
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            required
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="
                                w-full
                                bg-white
                                rounded-[10px]
                                md:rounded-[15px]
                                px-[15px] py-[15px]
                                md:px-[22.5px] md:py-[22.5px]
                                border
                                border-black/10
                                font-inter
                                text-[15px]
                                md:text-[22.5px]
                                text-[#3A3A3A]
                                placeholder:text-[#3A3A3A]/35
                                transition
                                focus:outline-none
                                focus:ring-2
                                focus:ring-[#D8C9A6]/50
                            "
                        />

                        {/* Match helper text */}
                        {confirmPassword.length > 0 && (
                            <p
                                className={`
                                    mt-[6px]
                                    md:mt-[9px]
                                    font-inter
                                    font-medium
                                    text-[11px]
                                    md:text-[16.5px]
                                    tracking-[0.015em]
        ${
                                    passwordsMatch
                                        ? 'text-green-600'
                                        : 'text-[#3A3A3A]'
                                }
      `}
                            >
                                Passwords must match
                            </p>
                        )}
                    </div>

                    {error && (
                        <p className="mt-[16px] md:-[24px] text-sm md:text-xl text-red-600 text-center">
                            {error}
                        </p>
                    )}

                    {/* CTA */}
                    <button
                        type="submit"
                        disabled={loading || !passwordValid || !passwordsMatch}
                        className="
                              mt-[32px]
                              md:mt-[48px]
                              inline-flex
                              items-center
                              justify-center
                              rounded-[14px]
                              md:rounded-[21px]
                              bg-[#D8C9A6]
                              px-[62px]
                              py-[16px]
                              md:px-[99px]
                              md:py-[24px]
                              font-inter
                              font-medium
                              text-[16px]
                              md:text-[24px]
                              text-white
                              transition
                              disabled:opacity-60
                              disabled:cursor-not-allowed
                              hover:opacity-90
                              active:opacity-80
                              active:scale-[0.98]
                            "
                    >
                        {loading ? 'Updating…' : 'Reset Password'}
                    </button>
                </form>
            </main>
        </PageBackground>
    )
}

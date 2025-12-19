'use client'

import { useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/client'

export default function SignupForm() {
    const supabase = supabaseBrowser()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [acceptedTerms, setAcceptedTerms] = useState(false)


    const passwordValid = password.length >= 8
    const passwordsMatch =
        confirmPassword.length > 0 && password === confirmPassword

    const isValidEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    const emailValid = isValidEmail(email)



    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!emailValid || !passwordValid || !passwordsMatch || !acceptedTerms) {
            return
        }

        if (!passwordValid || !passwordsMatch) return


        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/verified`,
            },
        })

        if (error) {
            setError(error.message)
        } else {
            window.location.href = '/auth/check-email'
        }

        setLoading(false)
    }

    return (
        <form
            onSubmit={handleSignup}
            className="flex flex-col gap-[24px]"
        >
            {/* Email */}
            <div className="w-[298px]">
                <label
                    className="
                    block
                    font-inter
                    font-medium
                    text-[15px]
                    text-[#3A3A3A]
                    mb-[6px]
                  "
                >
                    Email Address
                </label>
                <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="
                    w-full
                    bg-white
                    rounded-[10px]
                    px-[15px] py-[15px]
                    border
                    border-black/10
                    font-inter
                    text-[15px]
                    text-[#3A3A3A]
                    placeholder:text-[#3A3A3A]/35
                    focus:outline-none
                    focus:ring-0
                  "
                />

                {email.length > 0 && !emailValid && (
                    <p
                        className="
                          mt-[6px]
                          font-inter
                          text-[11px]
                          tracking-[0.015em]
                          text-[#3A3A3A]
                        "
                    >
                        Please enter a valid email address
                    </p>
                )}

            </div>

            {/* Password */}
            <div className="w-[298px]">
                <label
                    className="
                        block
                        font-inter
                        font-medium
                        text-[15px]
                        text-[#3A3A3A]
                        mb-[6px]
                      "
                >
                    Password
                </label>
                <input
                    type="password"
                    required
                    minLength={8}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="
                        w-full
                        bg-white
                        rounded-[10px]
                        px-[15px] py-[15px]
                        border
                        border-black/10
                        font-inter
                        text-[15px]
                        text-[#3A3A3A]
                        placeholder:text-[#3A3A3A]/35
                        focus:outline-none
                        focus:ring-0
                      "
                />

                <p
                    className={`
                        mt-[6px]
                        font-inter
                        font-medium
                        text-[11px]
                        tracking-[0.015em]
            ${
                        passwordValid
                            ? 'text-[#8FAF7A]'
                            : 'text-[#3A3A3A]'
                    }
          `}
                >
                    Minimum 8 characters
                </p>
            </div>

            {/* Confirm Password */}
            <div className="w-[298px]">
                <label
                    className="
                    block
                    font-inter
                    font-medium
                    text-[15px]
                    text-[#3A3A3A]
                    mb-[6px]
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
                        px-[15px] py-[15px]
                        border
                        border-black/10
                        font-inter
                        text-[15px]
                        text-[#3A3A3A]
                        placeholder:text-[#3A3A3A]/35
                        focus:outline-none
                        focus:ring-0
                      "
                />

                {confirmPassword.length > 0 && (
                    <p
                        className={`
                          mt-[6px]
                          font-inter
                          font-medium
                          text-[11px]
                          tracking-[0.015em]
              ${
                            passwordsMatch
                                ? 'text-[#8FAF7A]'
                                : 'text-[#3A3A3A]'
                        }
            `}
                    >
                        Passwords must match
                    </p>
                )}
            </div>

            {error && (
                <p className="text-[12px] text-red-600">
                    {error}
                </p>
            )}

            {/* Terms & Conditions checkbox */}
            <div
                role="checkbox"
                aria-checked={acceptedTerms}
                onClick={() => setAcceptedTerms(!acceptedTerms)}
                className="
                    flex items-center
                    gap-[12px]
                    w-[298px]
                    cursor-pointer
                    select-none
                  "
            >
                {/* Checkbox square */}
                <div
                    className="
                      w-[20px] h-[20px]
                      aspect-square
                      flex items-center justify-center
                      bg-white
                      border border-black/10
                      rounded-[2px]
                      shrink-0
                      transition
                      active:scale-[0.95]
                    "
                >
                    {acceptedTerms && (
                        <svg
                            width="12"
                            height="9"
                            viewBox="0 0 12 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1 4.5L4.5 8L11 1"
                                stroke="#3A3A3A"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                </div>

                {/* Text + links */}
                <p
                    className="
                      font-inter
                      font-normal
                      text-[14px]
                      tracking-[0.015em]
                      text-[#3A3A3A]
                      text-left
                    "
                >
                    I agree to the{' '}
                    <a
                        href="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:opacity-80"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Terms &amp; Conditions
                    </a>{' '}
                    and{' '}
                    <a
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:opacity-80"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Privacy Policy
                    </a>
                </p>
            </div>



            <button
                type="submit"
                disabled={loading || !emailValid || !passwordValid || !passwordsMatch || !acceptedTerms}
                className="
                  shadow-[6px_4px_18px_rgba(0,0,0,0.1)]
                  inline-flex
                  mx-auto
                  mt-[8px]
                  rounded-[14px]
                  bg-[#D8C9A6]
                  px-[66px]
                  py-[16px]
                  font-inter
                  font-medium
                  text-[16px]
                  text-white
                  transition
                  disabled:opacity-60
                "
            >
                {loading ? 'Creating account…' : 'Create Account'}
            </button>
        </form>
    )
}

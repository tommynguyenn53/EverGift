'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabaseBrowser } from '@/lib/supabase/client'

export default function ProfileMenu() {
    const supabase = supabaseBrowser()
    const router = useRouter()

    const [email, setEmail] = useState<string | null>(null)
    const [open, setOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setEmail(data.user?.email ?? null)
        })
    }, [supabase])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const logout = async () => {
        await supabase.auth.signOut()
        setOpen(false)
        router.push('/auth/login')
    }

    return (
        <div className="relative cursor-pointer" ref={menuRef}>
            {/* Profile icon (always visible) */}
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center justify-center"

            >
                <img className="profile_icon cursor-pointer"
                    src="/profile-icon.svg"
                    alt="Profile"
                />
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    className="absolute z-10 right-0 mt-3 w-60 rounded-2xl bg-[#FFFDF8] shadow-[0_12px_30px_rgba(0,0,0,0.12)] border border-black/5 overflow-hidden animate-in fade-in zoom-in-95 font-inter">
                    {email ? (
                        <>
                            {/* Email / identity */}
                            <div className="px-4 py-3">
                                <p className="text-[11.5px] font-medium tracking-[0.01em] tracking-wide text-[#6B6B6B] uppercase">
                                    Signed in as
                                </p>
                                <p className="mt-1 text-sm font-medium truncate text-[#3A3A3A] bg-black/5 rounded-lg px-2 py-1">
                                    {email}
                                </p>
                            </div>

                            <div className="h-px bg-black/5 mx-4"/>

                            {/* Dashboard */}
                            <Link
                                href="/dashboard"
                                className="mx-2 my-1 block rounded-lg px-4 py-2 tracking-[0.01em] text-sm font-medium text-[#3A3A3A] hover:bg-black/5 transition active:bg-black/10"
                            >
                                Dashboard
                            </Link>

                            {/* Logout */}
                            <button
                                onClick={logout}
                                className="mx-2 mb-2 block w-[calc(100%-1rem)] tracking-[0.01em] rounded-lg px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 transition text-left active:bg-black/10"
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/auth/login"
                            className="block px-4 py-3 text-sm font-medium hover:bg-black/5 rounded-lg mx-2 my-2 active:bg-black/10"
                        >
                            Log in
                        </Link>
                    )}
                </div>

            )}
        </div>
    )
}

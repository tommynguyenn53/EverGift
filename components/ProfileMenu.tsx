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
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-lg border overflow-hidden">
                    {email ? (
                        <>
                            <div className="px-4 py-3 border-b">
                                <p className="text-sm font-medium truncate">{email}</p>
                            </div>

                            <Link
                                href="/dashboard"
                                className="block px-4 py-2 text-sm hover:bg-gray-50"
                            >
                                Dashboard
                            </Link>

                            <button
                                onClick={logout}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/auth/login"
                            className="block px-4 py-2 text-sm hover:bg-gray-50"
                        >
                            Log in
                        </Link>
                    )}
                </div>
            )}
        </div>
    )
}

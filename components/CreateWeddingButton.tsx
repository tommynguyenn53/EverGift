'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/client'

type WeddingState = {
    id: string
    payout_enabled: boolean
}

export default function CreateWeddingButton() {
    const router = useRouter()
    const supabase = supabaseBrowser()

    const [user, setUser] = useState<any | null>(null)
    const [wedding, setWedding] = useState<WeddingState | null | undefined>(undefined)


    useEffect(() => {
        const load = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser()

            setUser(user)

            if (!user) {
                setWedding(null)
                return
            }

            const { data } = await supabase
                .from('weddings')
                .select('id, payout_enabled')
                .eq('user_id', user.id)
                .maybeSingle()

            setWedding(data ?? null)
        }

        load()
    }, [supabase])

    const handleClick = () => {
        // 1️⃣ Not logged in → signup
        if (!user) {
            router.push('/auth/signup')
            return
        }

        // 2️⃣ Still loading wedding state → do nothing
        if (wedding === undefined) return

        // 3️⃣ Logged in, no wedding yet → create
        if (wedding === null) {
            router.push('/create-wedding')
            return
        }

        // 4️⃣ Wedding exists but not fully ready → continue setup
        if (!wedding.payout_enabled) {
            router.push('/create-wedding')
            return
        }

        // 5️⃣ Wedding fully ready → dashboard
        router.push('/dashboard')
    }

    return (
        <button
            onClick={handleClick}
            disabled={wedding === undefined}
            className="
                shadow-[6px_4px_18px_rgba(0,0,0,0.1)]
                mt-[24px] md:mt-[36px]
                inline-flex items-center justify-center
                rounded-[14px] md:rounded-[21px]
                bg-white border-[1.5px] border-[#CBB89B]
                px-[36px] py-[18px] md:px-[93px] md:py-[27px]
                font-inter font-medium text-[16px] md:text-[24px]
                text-[#A89470]
                transition
                hover:bg-[#FAF6F0]
                active:bg-[#FAF6F0]
                hover:opacity-90
                active:opacity-80
                active:scale-[0.98]
                disabled:opacity-50
                disabled:cursor-not-allowed
            "
        >
            Create Your Wedding Page
        </button>
    )
}

'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/client'

export default function CreateWeddingButton() {
    const router = useRouter()
    const supabase = supabaseBrowser()

    const [user, setUser] = useState<any>(null)
    const [hasWedding, setHasWedding] = useState<boolean | null>(null)

    useEffect(() => {
        const load = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser()

            setUser(user)

            if (!user) {
                setHasWedding(false)
                return
            }

            const { data } = await supabase
                .from('weddings')
                .select('id')
                .eq('user_id', user.id)
                .maybeSingle()

            setHasWedding(!!data)
        }

        load()
    }, [supabase])

    const handleClick = () => {
        if (!user) {
            router.push('/auth/signup')
            return
        }

        if (hasWedding === null) return

        router.push(hasWedding ? '/dashboard' : '/create-wedding')
    }

    return (
        <button
            onClick={handleClick}
            disabled={hasWedding === null}
            className="disabled:opacity-70 shadow-[6px_4px_18px_rgba(0,0,0,0.1)] mt-[24px] md:mt-[36px]
            inline-flex items-center justify-center rounded-[14px] md:rounded-[21px] bg-[#D8C9A6] px-[36px] py-[18px]
            md:px-[93px] md:py-[27px] font-inter font-medium text-[16px] md:text-[24px] text-white transition
            hover:bg-[#CBB89B] active:bg-[#CBB89B] hover:opacity-90 active:opacity-80 active:scale-[0.98]
            disabled:opacity-70 disabled:cursor-not-allowed"
        >
            Create Your Wedding Page
        </button>
    )
}

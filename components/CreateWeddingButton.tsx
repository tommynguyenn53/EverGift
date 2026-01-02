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
            className="shadow-[6px_4px_18px_rgba(0,0,0,0.1)] mt-[24px] md:mt-[36px] inline-flex items-center
                        justify-center rounded-[14px] md:rounded-[21px] bg-white border-[1.5px] border-[#CBB89B]
                        px-[36px] py-[18px] md:px-[93px] md:py-[27px] font-inter font-medium text-[16px] md:text-[24px]
                        text-[#A89470] transition hover:bg-[#FAF6F0] active:bg-[#FAF6F0] duration-150 hover:opacity-90
                        active:opacity-80 active:scale-[0.98]"
        >
            Create Your Wedding Page
        </button>
    )
}

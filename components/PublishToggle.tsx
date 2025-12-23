'use client'

import { useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/client'

type Props = {
    weddingId: string
    initialStatus: 'draft' | 'active' | 'disabled'
}

export default function PublishToggle({ weddingId, initialStatus }: Props) {
    const supabase = supabaseBrowser()

    const [status, setStatus] = useState(initialStatus)
    const [loading, setLoading] = useState(false)

    const isActive = status === 'active'

    const toggleStatus = async () => {
        if (loading) return
        setLoading(true)

        const newStatus = isActive ? 'draft' : 'active'

        const { error } = await supabase
            .from('weddings')
            .update({ status: newStatus })
            .eq('id', weddingId)

        if (!error) {
            setStatus(newStatus)
        }

        setLoading(false)
    }

    return (
        <div
            className="
                w-[280px]
                bg-white
                rounded-[14px]
                px-[16px]
                py-[14px]
                shadow-[0_4px_12px_rgba(0,0,0,0.05)]
            "
        >
            <div className="flex items-center justify-between">
                {/* Text */}
                <div className="pr-4">
                    <p className="font-inter font-medium text-[15px] text-[#3A3A3A]">
                        Wedding page
                    </p>
                    <p className="mt-[4px] font-inter text-[13px] text-[#3A3A3A]/70 leading-[150%]">
                        {isActive
                            ? 'Your page is live and visible to guests'
                            : 'Your page is currently private'}
                    </p>
                </div>

                {/* Toggle */}
                <button
                    onClick={toggleStatus}
                    disabled={loading}
                    className={`
                        relative
                        w-[44px]
                        h-[24px]
                        rounded-full
                        transition-colors
                        duration-200
                        ${isActive ? 'bg-[#D8C9A6]' : 'bg-[#E5E5E5]'}
                        disabled:opacity-60
                    `}
                >
                    <span
                        className={`
                            absolute
                            top-[2px]
                            left-[2px]
                            w-[20px]
                            h-[20px]
                            rounded-full
                            bg-white
                            transition-transform
                            duration-200
                            ${isActive ? 'translate-x-[17px]' : 'translate-x-0'}
                        `}
                    />
                </button>
            </div>
        </div>
    )
}

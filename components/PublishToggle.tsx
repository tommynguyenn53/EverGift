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
        <div className="bg-white rounded-xl p-4 shadow space-y-3">
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-medium">Wedding page</p>
                    <p className="text-sm text-gray-500">
                        {isActive
                            ? 'Your page is live and visible to guests'
                            : 'Your page is currently private'}
                    </p>
                </div>

                <button
                    onClick={toggleStatus}
                    disabled={loading}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                        isActive ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                >
          <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  isActive ? 'translate-x-6' : 'translate-x-1'
              }`}
          />
                </button>
            </div>
        </div>
    )
}

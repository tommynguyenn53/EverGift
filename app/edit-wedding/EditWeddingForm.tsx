'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabase/client'

type Wedding = {
    id: string
    partner_one_name: string
    partner_two_name: string
    wedding_date: string
    welcome_message: string
    slug: string
}

export default function EditWeddingForm({ wedding }: { wedding: Wedding }) {
    const supabase = supabaseBrowser()
    const router = useRouter()

    const [partnerOne, setPartnerOne] = useState(wedding.partner_one_name)
    const [partnerTwo, setPartnerTwo] = useState(wedding.partner_two_name)
    const [weddingDate, setWeddingDate] = useState(wedding.wedding_date)
    const [welcomeMessage, setWelcomeMessage] = useState(
        wedding.welcome_message
    )

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSave = async () => {
        setLoading(true)
        setError(null)

        const { error: updateError } = await supabase
            .from('weddings')
            .update({
                partner_one_name: partnerOne,
                partner_two_name: partnerTwo,
                wedding_date: weddingDate,
                welcome_message: welcomeMessage,
            })
            .eq('id', wedding.id)

        if (updateError) {
            setError(updateError.message)
            setLoading(false)
            return
        }

        router.push('/dashboard')
    }

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">
                    Partner one name
                </label>
                <input
                    value={partnerOne}
                    onChange={(e) => setPartnerOne(e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
                    Partner two name
                </label>
                <input
                    value={partnerTwo}
                    onChange={(e) => setPartnerTwo(e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
                    Wedding date
                </label>
                <input
                    type="date"
                    value={weddingDate}
                    onChange={(e) => setWeddingDate(e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
                    Welcome message
                </label>
                <textarea
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                    rows={4}
                    className="w-full rounded-md border px-3 py-2"
                />
            </div>

            <div className="pt-4 space-y-2">
                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="w-full rounded-md bg-black text-white py-2 font-medium disabled:opacity-60"
                >
                    {loading ? 'Saving…' : 'Save changes'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                    Page link: /{wedding.slug}
                </p>
            </div>
        </div>
    )
}

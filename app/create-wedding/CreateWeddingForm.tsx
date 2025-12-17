'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabase/client'
import { generateWeddingSlug } from '@/lib/utils/slug'


export default function CreateWeddingForm() {
    const supabase = supabaseBrowser()
    const router = useRouter()

    const [partnerOne, setPartnerOne] = useState('')
    const [partnerTwo, setPartnerTwo] = useState('')
    const [weddingDate, setWeddingDate] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleCreate = async () => {
        setLoading(true)
        setError(null)

        const {
            data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
            setError('Not authenticated')
            setLoading(false)
            return
        }

        const headerText = `${partnerOne} & ${partnerTwo}`
        const welcomeMessage = `Welcome to our wedding page! We can’t wait to celebrate with you.`
        const slug = generateWeddingSlug(partnerOne, partnerTwo)

        const { error: insertError } = await supabase
            .from('weddings')
            .insert({
                user_id: user.id,
                partner_one_name: partnerOne,
                partner_two_name: partnerTwo,
                wedding_date: weddingDate,
                header_text: headerText,
                welcome_message: welcomeMessage,
                slug,
                status: 'draft',
            })

        if (insertError) {
            setError(insertError.message)
            setLoading(false)
            return
        }

        router.push('/wedding-ready')
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
                    required
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
                    required
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
                    required
                    className="w-full rounded-md border px-3 py-2"
                />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
                onClick={handleCreate}
                disabled={loading || !partnerOne || !partnerTwo || !weddingDate}
                className="rounded-md bg-black text-white px-4 py-2 font-medium disabled:opacity-60"
            >
                {loading ? 'Creating…' : 'Create wedding'}
            </button>
        </div>
    )
}

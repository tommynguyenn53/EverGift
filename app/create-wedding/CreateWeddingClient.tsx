'use client'

import { useEffect, useState, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import CreateWeddingForm from './CreateWeddingForm'

export default function CreateWeddingClient() {
    const [wedding, setWedding] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    const initializedRef = useRef(false)
    const searchParams = useSearchParams()
    const router = useRouter()

    // 1️⃣ Initial draft + wedding fetch
    useEffect(() => {
        if (initializedRef.current) return
        initializedRef.current = true

        const init = async () => {
            try {
                const draftRes = await fetch('/api/weddings/draft', {
                    method: 'POST',
                })

                const draftData = await draftRes.json()
                const weddingId = draftData.weddingId

                const weddingRes = await fetch(`/api/weddings/${weddingId}`)
                const weddingData = await weddingRes.json()

                setWedding(weddingData.wedding)
            } catch (err) {
                console.error('Init failed:', err)
            } finally {
                setLoading(false)
            }
        }

        init()
    }, [])

    // 2️⃣ Stripe success → sync → REFRESH wedding
    useEffect(() => {
        if (!wedding?.id) return
        if (searchParams.get('stripe') !== 'success') return

        const syncStripeAndRefresh = async () => {
            try {
                // sync payouts
                await fetch(`/api/weddings/${wedding.id}/sync-stripe`, {
                    method: 'POST',
                })

                // 🔑 re-fetch wedding from DB (source of truth)
                const refreshed = await fetch(`/api/weddings/${wedding.id}`)
                const refreshedData = await refreshed.json()

                setWedding(refreshedData.wedding)

                // clean URL
                router.replace('/create-wedding')
            } catch (err) {
                console.error('Stripe sync failed:', err)
            }
        }

        syncStripeAndRefresh()
    }, [searchParams, wedding?.id, router])

    if (loading) return <p>Loading…</p>
    if (!wedding) return <p>Something went wrong.</p>

    return <CreateWeddingForm wedding={wedding} />
}

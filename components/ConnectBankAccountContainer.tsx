'use client'

import { useState } from 'react'
import ConnectBankAccountSection from './ConnectBankAccountSection'

type ConnectBankAccountContainerProps = {
    weddingId: string
    connected: boolean
    beforeConnect?: () => Promise<void>
}

export default function ConnectBankAccountContainer({weddingId,
                                                    connected, beforeConnect

                                                    }: ConnectBankAccountContainerProps) {
    const [loading, setLoading] = useState(false)

    const handleConnectStripe = async () => {
        try {
            setLoading(true)

            if (beforeConnect) {
                await beforeConnect() // 🔥 SAVE DRAFT FIRST
            }

            const res = await fetch('/api/stripe/connect/onboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ weddingId }),
            })

            const data = await res.json()

            if (!res.ok || !data.url) {
                throw new Error(data.error || 'Failed to start Stripe onboarding')
            }

            // Redirect user to Stripe onboarding
            window.location.href = data.url
        } catch (error) {
            console.error('Stripe connect error:', error)
            alert('Something went wrong connecting to Stripe.')
            setLoading(false)
        }
    }

    if (connected) {
        return (
            <div className="mt-[16px] md:mt-[24px] flex items-center justify-center gap-[8px] md:gap-[14px] text-green-600 text-[14px] md:text-[21px] font-inter">
                ✓ Stripe account connected
            </div>
        )
    }


    return (
        <ConnectBankAccountSection
            onConnect={handleConnectStripe}
            loading={loading}
        />
    )
}

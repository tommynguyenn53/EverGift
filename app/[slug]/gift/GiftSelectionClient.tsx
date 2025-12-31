'use client'

import { useState } from 'react'
import GiftAmountSelector from '@/components/GiftAmountSelector'
import GiftSummaryCard from '@/components/GiftSummaryCard'
import FeeCoverageToggle from '@/components/FeeCoverageToggle'
import { calculateSummary } from '@/lib/payments/calculateSummary'
import { formatCents } from '@/lib/payments/format'

type Props = {
    weddingId: string
    slug: string
}

const MESSAGE_LIMIT = 200

export default function GiftSelectionClient({ weddingId, slug }: Props) {
    const [amountCents, setAmountCents] = useState(0)
    const [guestCoversFees, setGuestCoversFees] = useState(false)
    const [guestName, setGuestName] = useState('')
    const [message, setMessage] = useState('')

    const {
        platformFeeCents,
        stripeFeeCents,
        totalChargedCents,
    } = calculateSummary(amountCents, guestCoversFees)

    const totalFeesCents = guestCoversFees
        ? totalChargedCents - amountCents
        : platformFeeCents + stripeFeeCents



    const handleProceedToPayment = async () => {
        if (!amountCents || !guestName) return

        const res = await fetch(`/${slug}/gift/create-checkout-session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                weddingId,
                slug,
                amountCents,
                guestName,
                message,
                guestCoversFees,
            }),
        })

        if (!res.ok) {
            alert('Failed to start payment')
            return
        }

        const { url } = await res.json()
        window.location.href = url
    }


    return (
        <main className="w-full flex flex-col items-center">
            <GiftAmountSelector amountCents={amountCents} onChange={setAmountCents} />

            {/* Name */}
            <div className="mt-[24px] md:mt-[36px] w-[298px] md:w-[447px]">
                <label className="block mb-[6px] md:mb-[9px] font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                    Your name
                </label>
                <input
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-[10px] md:rounded-[15px] bg-white px-[15px] md:px-[22.5px] py-[15px] md:py-[22.5px] border border-black/12 font-inter text-[15px] md:text-[22.5px]"
                />
            </div>

            {/* Message */}
            <div className="mt-[24px] md:mt-[36px] w-[298px] md:w-[447px]">
                <label className="block mb-[6px] md:mb-[9px] font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                    Add a message (optional)
                </label>
                <textarea
                    value={message}
                    maxLength={MESSAGE_LIMIT}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    placeholder="Write your message here…"
                    className="w-full resize-none rounded-[10px] md:rounded-[15px] bg-white px-[15px] md:px-[22.5px] py-[15px] md:py-[22.5px] border border-black/12 font-inter text-[15px] md:text-[22.5px]"
                />
                <div className="mt-[6px] md:mt-[9px] flex justify-between text-[11px] md:text-[16.5px] text-[#3A3A3A]">
                    <span>This message will be shared with the couple.</span>
                    <span className="opacity-60">{message.length}/{MESSAGE_LIMIT}</span>
                </div>
            </div>

            {/* Fees */}
            <div className="mt-[28px] md:mt-[42px] w-[298px] md:w-[447px]">
                <div className="flex items-center justify-between">
                    <p className="w-[240px] md:w-[360px] font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                        Help the couple receive the full amount — I’ll cover the fees
                    </p>
                    <FeeCoverageToggle value={guestCoversFees} onChange={setGuestCoversFees} />
                </div>
                <p className="mt-[5px] md:mt-[7.5px] text-[11px] md:text-[16.5px] text-[#3A3A3A]">
                    {guestCoversFees
                        ? `Adds approx. ${formatCents(totalFeesCents)} to your total`
                        : 'Fees will be deducted from the gift'}
                </p>
            </div>

            {/* Summary */}
            <div className="mt-[24px] md:mt-[36px]">
                <GiftSummaryCard
                    amountCents={amountCents}
                    guestCoversFees={guestCoversFees}
                />
            </div>

            {/* CTA */}
            <button
                onClick={handleProceedToPayment}
                disabled={!amountCents || !guestName}
                className="mt-[32px] md:mt-[48px] w-[288px] md:w-[432px] h-[55px] md:h-[82.5px] rounded-[14px] md:rounded-[21px]
                bg-[#D8C9A6] text-white font-inter font-medium text-[16px] md:text-[24px] disabled:opacity-60
                transition hover:opacity-90 active:opacity-80 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
                Proceed to Payment
            </button>
        </main>
    )
}

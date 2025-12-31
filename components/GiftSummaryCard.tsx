'use client'

import { calculateSummary } from '@/lib/payments/calculateSummary'
import { formatCents } from '@/lib/payments/format'

type Props = {
    amountCents: number
    guestCoversFees: boolean
}

export default function GiftSummaryCard({
                                        amountCents,
                                        guestCoversFees,
                                    }: Props) {
    if (!amountCents) return null

    const {
        platformFeeCents,
        stripeFeeCents,
        totalChargedCents,
    } = calculateSummary(amountCents, guestCoversFees)

    const totalFeesCents = guestCoversFees
        ? totalChargedCents - amountCents
        : platformFeeCents + stripeFeeCents


    return (
        <div
            className="w-[287px] md:w-[430.5px] rounded-[12px] md:rounded-[18px] bg-white px-[15px] md:px-[22.5px]
            py-[15px] md:py-[22.5px] shadow-[0px_2px_6px_rgba(0,0,0,0.04)] flex flex-col gap-[10px] md:gap-[15px]"
        >
            {/* Title */}
            <p className="font-inter text-[12px] md:text-[18px] tracking-[0.015em] text-[#3A3A3A]">
                Summary
            </p>

            {/* Divider */}
            <div className="w-[257px] md:w-[385.5px] h-px bg-black/10"/>

            {/* Rows */}
            <div className="flex justify-between">
        <span className="font-inter text-[12px] md:text-[18px] text-[#3A3A3A]">
          Gift amount
        </span>
                <span className="font-inter text-[12px] md:text-[18px] text-[#3A3A3A]">
          {formatCents(amountCents)}
        </span>
            </div>

            <div className="flex justify-between">
              <span className="font-inter text-[12px] md:text-[18px] text-[#3A3A3A]">
                {guestCoversFees ? 'Fees — Covered by you' : 'Fees — Deducted from gift'}
              </span>

                <span className="font-inter text-[12px] md:text-[18px] text-[#3A3A3A]">
                {formatCents(totalFeesCents)}
              </span>
            </div>


            {/* Divider */}
            <div className="w-[257px] md:w-[385.5px] h-px bg-black/10"/>

            {/* Total */}
            <div className="flex justify-between">
        <span className="font-inter font-medium text-[12px] md:text-[18px] text-[#3A3A3A]">
          Total charged
        </span>
                <span className="font-inter font-medium text-[12px] md:text-[18px] text-[#3A3A3A]">
          {formatCents(totalChargedCents)}
        </span>
            </div>

            {/* Helper text */}
            <p className="text-[11px] md:text-[16.5px] tracking-[0.015em] text-[#3A3A3A]">
                {guestCoversFees
                    ? 'The couple receives the full amount'
                    : 'Fees will be deducted from the gift'}
            </p>
        </div>
    )
}

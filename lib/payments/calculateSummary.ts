// lib/payments/calculateSummary.ts
import {
    PLATFORM_FEE_RATE,
    STRIPE_PERCENT,
    STRIPE_FLAT_FEE_CENTS,
} from './config'

export function calculateSummary(
    amountCents: number,
    guestCoversFees: boolean
) {
    const platformFeeCents = Math.round(amountCents * PLATFORM_FEE_RATE)

    let stripeFeeCents: number
    let totalChargedCents: number
    let coupleReceivesCents: number

    if (guestCoversFees) {
        /**
         * GROSS-UP:
         * Solve so that:
         * (gross - stripeFee(gross) - platformFee) === amount
         */
        const grossCents = Math.ceil(
            (amountCents + platformFeeCents + STRIPE_FLAT_FEE_CENTS) /
            (1 - STRIPE_PERCENT)
        )

        stripeFeeCents = Math.round(
            grossCents * STRIPE_PERCENT + STRIPE_FLAT_FEE_CENTS
        )

        totalChargedCents = grossCents
        coupleReceivesCents = amountCents
    } else {
        /**
         * NO TOGGLE:
         * Stripe fee is charged ONLY on the gift amount
         */
        stripeFeeCents = Math.round(
            amountCents * STRIPE_PERCENT + STRIPE_FLAT_FEE_CENTS
        )

        totalChargedCents = amountCents
        coupleReceivesCents =
            amountCents - platformFeeCents - stripeFeeCents
    }

    return {
        platformFeeCents,
        stripeFeeCents,
        totalChargedCents,
        coupleReceivesCents,
    }
}

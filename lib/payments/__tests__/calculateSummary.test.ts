import { describe, it, expect } from 'vitest'
import { calculateSummary } from '../calculateSummary'

const AMOUNTS = [
    50_00,
    100_00,
    150_00,
    200_00,
]

describe('calculateSummary', () => {
    describe('toggle OFF (fees deducted from gift)', () => {
        it.each(AMOUNTS)(
            'correctly calculates fees for $%d',
            (amountCents) => {
                const result = calculateSummary(amountCents, false)

                // No negative values
                expect(result.platformFeeCents).toBeGreaterThanOrEqual(0)
                expect(result.stripeFeeCents).toBeGreaterThanOrEqual(0)
                expect(result.coupleReceivesCents).toBeGreaterThanOrEqual(0)

                // Total charged is exactly the gift amount
                expect(result.totalChargedCents).toBe(amountCents)

                // Couple receives gift minus fees
                expect(result.coupleReceivesCents).toBe(
                    amountCents -
                    result.platformFeeCents -
                    result.stripeFeeCents
                )
            }
        )
    })

    describe('toggle ON (guest covers fees)', () => {
        it.each(AMOUNTS)(
            'ensures couple receives full $%d',
            (amountCents) => {
                const result = calculateSummary(amountCents, true)

                // Core invariant
                expect(result.coupleReceivesCents).toBe(amountCents)

                // Guest must pay at least the gift amount
                expect(result.totalChargedCents).toBeGreaterThan(amountCents)

                // No negative values
                expect(result.platformFeeCents).toBeGreaterThanOrEqual(0)
                expect(result.stripeFeeCents).toBeGreaterThanOrEqual(0)
            }
        )
    })

    describe('edge case: $1 gift', () => {
        it('does not produce negative or zero values', () => {
            const amountCents = 100

            const off = calculateSummary(amountCents, false)
            const on = calculateSummary(amountCents, true)

            expect(off.coupleReceivesCents).toBeGreaterThanOrEqual(0)
            expect(on.coupleReceivesCents).toBe(amountCents)

            expect(off.totalChargedCents).toBe(amountCents)
            expect(on.totalChargedCents).toBeGreaterThan(amountCents)
        })
    })
})

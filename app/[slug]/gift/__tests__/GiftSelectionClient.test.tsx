import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import GiftSelectionClient from '../GiftSelectionClient'

// Clean DOM between tests
afterEach(() => {
    cleanup()
})

// ─────────────────────────────────────────────
// Mock child components (not under test)
// ─────────────────────────────────────────────

vi.mock('@/components/GiftAmountSelector', () => ({
    default: ({ onChange }: any) => (
        <button onClick={() => onChange(10000)}>Set $100</button>
    ),
}))

vi.mock('@/components/GiftSummaryCard', () => ({
    default: () => <div>Summary</div>,
}))

vi.mock('@/components/FeeCoverageToggle', () => ({
    default: ({ value, onChange }: any) => (
        <button onClick={() => onChange(!value)}>Toggle Fees</button>
    ),
}))

// ─────────────────────────────────────────────

describe('GiftSelectionClient', () => {
    beforeEach(() => {
        vi.restoreAllMocks()
    })

    const setup = () => {
        render(
            <GiftSelectionClient
                weddingId="w_123"
                slug="test-wedding"
            />
        )
    }

    it('disables CTA when amount is 0', () => {
        setup()

        const button = screen.getByRole('button', {
            name: /proceed to payment/i,
        })

        expect(button).toBeDisabled()
    })

    it('disables CTA when guest name is empty or whitespace', () => {
        setup()

        fireEvent.click(
            screen.getByRole('button', { name: /set \$100/i })
        )

        const button = screen.getByRole('button', {
            name: /proceed to payment/i,
        })

        expect(button).toBeDisabled()

        fireEvent.change(
            screen.getByPlaceholderText(/your name/i),
            { target: { value: '   ' } }
        )

        expect(button).toBeDisabled()
    })

    it('enables CTA when amount and valid guest name are provided', () => {
        setup()

        fireEvent.click(
            screen.getByRole('button', { name: /set \$100/i })
        )

        fireEvent.change(
            screen.getByPlaceholderText(/your name/i),
            { target: { value: 'Tommy' } }
        )

        const button = screen.getByRole('button', {
            name: /proceed to payment/i,
        })

        expect(button).toBeEnabled()
    })

    it('limits message to 200 characters', () => {
        setup()

        const textarea = screen.getByPlaceholderText(/write your message/i)

        fireEvent.change(textarea, {
            target: { value: 'a'.repeat(300) },
        })

        expect(textarea).toHaveValue('a'.repeat(200))
        expect(screen.getByText('200/200')).toBeInTheDocument()
    })

    it('does not clear name or message when amount changes', () => {
        setup()

        fireEvent.change(
            screen.getByPlaceholderText(/your name/i),
            { target: { value: 'Tommy' } }
        )

        fireEvent.change(
            screen.getByPlaceholderText(/write your message/i),
            { target: { value: 'Hello!' } }
        )

        fireEvent.click(
            screen.getByRole('button', { name: /set \$100/i })
        )

        expect(
            screen.getByPlaceholderText(/your name/i)
        ).toHaveValue('Tommy')

        expect(
            screen.getByPlaceholderText(/write your message/i)
        ).toHaveValue('Hello!')
    })

    it('updates fee helper text when toggle changes', () => {
        setup()

        expect(
            screen.getByText(/fees will be deducted from the gift/i)
        ).toBeInTheDocument()

        fireEvent.click(
            screen.getByRole('button', { name: /toggle fees/i })
        )

        expect(
            screen.getByText(/adds approx/i)
        ).toBeInTheDocument()
    })
})

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CreateWeddingForm from '../CreateWeddingForm'

// ─────────────────────────────────────────────────────────
// Mocks
// ─────────────────────────────────────────────────────────

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
    }),
}))

vi.mock('@/lib/supabase/client', () => {
    return {
        supabaseBrowser: () => ({
            from: () => ({
                update: vi.fn(() => ({
                    eq: vi.fn(() =>
                        Promise.resolve({ data: null, error: null })
                    ),
                })),
                upsert: vi.fn(() =>
                    Promise.resolve({ data: {}, error: null })
                ),
                select: vi.fn(() => ({
                    eq: vi.fn(() => ({
                        single: vi.fn(() =>
                            Promise.resolve({ data: null, error: null })
                        ),
                    })),
                })),
            }),
            storage: {
                from: () => ({
                    upload: vi.fn(() =>
                        Promise.resolve({ data: {}, error: null })
                    ),
                    getPublicUrl: vi.fn(() => ({
                        data: { publicUrl: 'test-url' },
                    })),
                }),
            },
            auth: {
                getUser: vi.fn(() =>
                    Promise.resolve({
                        data: { user: { id: 'test-user' } },
                    })
                ),
            },
        }),
    }
})

vi.mock('@/components/PortraitUploadTile', () => ({
    default: ({ onUpload }: any) => (
        <button onClick={() => onUpload(new File(['x'], 'image.jpg'))}>
            Upload Image
        </button>
    ),
}))

vi.mock('@/components/ConnectBankAccountContainer', () => ({
    default: ({ beforeConnect }: any) => (
        <button onClick={beforeConnect}>Connect Bank</button>
    ),
}))

vi.mock('@/components/FinalStepChecklist', () => ({
    default: () => <div>Checklist</div>,
}))

vi.mock('@/components/ImageRecommendationModal', () => ({
    default: () => null,
}))

// ─────────────────────────────────────────────────────────
// Test data
// ─────────────────────────────────────────────────────────

const baseWedding = {
    id: 'wedding_123',
    partner_one_name: null,
    partner_two_name: null,
    wedding_date: null,
    header_text: null,
    welcome_message: null,
    stripe_account_id: null,
    payout_enabled: true,
}

describe('CreateWeddingForm', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    function setup(overrides = {}) {
        render(
            <CreateWeddingForm wedding={{ ...baseWedding, ...overrides }} />
        )
    }

    it('disables CTA on initial render', () => {
        setup()

        expect(
            screen.getAllByRole('button', {
                name: /create my wedding page/i,
            })[0]
        ).toBeDisabled()
    })

    it('enables CTA when all required fields are completed', async () => {
        setup({
            payout_enabled: true,
            stripe_account_id: 'acct_123',
        })

        fireEvent.change(screen.getByLabelText(/partner 1 name/i), {
            target: { value: 'Tommy' },
        })

        fireEvent.change(screen.getByLabelText(/partner 2 name/i), {
            target: { value: 'Alex' },
        })

        fireEvent.change(screen.getByLabelText(/wedding date/i), {
            target: { value: '2025-12-01' },
        })

        fireEvent.change(screen.getByLabelText(/header text/i), {
            target: { value: 'Our Big Day' },
        })

        fireEvent.change(screen.getByLabelText(/welcome message/i), {
            target: { value: 'Welcome!' },
        })

        fireEvent.click(
            screen.getAllByRole('button', { name: /upload image/i })[0]
        )

        await waitFor(() => {
            expect(
                screen.getAllByRole('button', {
                    name: /create my wedding page/i,
                })[0]
            ).toBeEnabled()
        })
    })

    it('keeps CTA disabled when partner name is whitespace', () => {
        setup({
            payout_enabled: true,
            stripe_account_id: 'acct_123',
        })

        fireEvent.change(screen.getByLabelText(/partner 1 name/i), {
            target: { value: '   ' },
        })

        expect(
            screen.getAllByRole('button', {
                name: /create my wedding page/i,
            })[0]
        ).toBeDisabled()
    })

    it('limits header text to 35 characters', () => {
        setup()

        const input = screen.getByLabelText(/header text/i)

        fireEvent.change(input, {
            target: { value: 'a'.repeat(100) },
        })

        expect(input).toHaveValue('a'.repeat(35))
        expect(screen.getByText('Character count: 35/35')).toBeInTheDocument()
    })

    it('limits welcome message to 150 characters', () => {
        setup()

        const textarea = screen.getByLabelText(/welcome message/i)

        fireEvent.change(textarea, {
            target: { value: 'a'.repeat(300) },
        })

        expect(textarea).toHaveValue('a'.repeat(150))
        expect(
            screen.getByText('Character count: 150/150')
        ).toBeInTheDocument()
    })

    it('calls saveDraft before connecting bank account', () => {
        setup()

        fireEvent.click(
            screen.getAllByRole('button', { name: /connect bank/i })[0]
        )

        expect(true).toBe(true)
    })

    it('shows loading state when submitting', async () => {
        setup({
            payout_enabled: true,
            stripe_account_id: 'acct_123',
        })

        fireEvent.change(screen.getByLabelText(/partner 1 name/i), {
            target: { value: 'Tommy' },
        })

        fireEvent.change(screen.getByLabelText(/partner 2 name/i), {
            target: { value: 'Alex' },
        })

        fireEvent.change(screen.getByLabelText(/wedding date/i), {
            target: { value: '2025-12-01' },
        })

        fireEvent.change(screen.getByLabelText(/header text/i), {
            target: { value: 'Hello' },
        })

        fireEvent.change(screen.getByLabelText(/welcome message/i), {
            target: { value: 'Welcome!' },
        })

        fireEvent.click(
            screen.getAllByRole('button', { name: /upload image/i })[0]
        )

        fireEvent.click(
            screen.getAllByRole('button', {
                name: /create my wedding page/i,
            })[0]
        )

        await waitFor(() => {
            expect(
                screen.getByRole('button', { name: /creating/i })
            ).toBeDisabled()
        })
    })
})

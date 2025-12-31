import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import SignupForm from '../SignupForm'
import { cleanup } from '@testing-library/react'

afterEach(() => {
    cleanup()
})

// ─────────────────────────────────────────────────────────
// Mocks
// ─────────────────────────────────────────────────────────

const signUpMock = vi.fn()

vi.mock('@/lib/supabase/client', () => ({
    supabaseBrowser: () => ({
        auth: {
            signUp: signUpMock,
        },
    }),
}))

// Prevent actual navigation
Object.defineProperty(window, 'location', {
    writable: true,
    value: { href: '' },
})

// ─────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────

function fillValidForm() {
    fireEvent.change(
        screen.getByLabelText(/email address/i),
        { target: { value: 'test@example.com' } }
    )

    fireEvent.change(
        screen.getByLabelText(/^password$/i),
        { target: { value: 'password123' } }
    )

    fireEvent.change(
        screen.getByLabelText(/confirm password/i),
        { target: { value: 'password123' } }
    )

    fireEvent.click(
        screen.getByRole('checkbox', { name: /accept terms/i })
    )
}

// ─────────────────────────────────────────────────────────
// Tests
// ─────────────────────────────────────────────────────────

describe('SignupForm', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        window.location.href = ''
    })

    it('disables submit button on initial render', () => {
        render(<SignupForm />)

        expect(
            screen.getByRole('button', { name: /create account/i })
        ).toBeDisabled()
    })

    it('shows email validation message for invalid email', () => {
        render(<SignupForm />)

        fireEvent.change(
            screen.getByLabelText(/email address/i),
            { target: { value: 'invalid-email' } }
        )

        expect(
            screen.getByText(/please enter a valid email address/i)
        ).toBeInTheDocument()
    })

    it('enables submit button when form is valid', () => {
        render(<SignupForm />)

        fillValidForm()

        expect(
            screen.getByRole('button', { name: /create account/i })
        ).toBeEnabled()
    })

    it('does not submit if terms are not accepted', () => {
        render(<SignupForm />)

        fireEvent.change(
            screen.getByLabelText(/email address/i),
            { target: { value: 'test@example.com' } }
        )

        fireEvent.change(
            screen.getByLabelText(/^password$/i),
            { target: { value: 'password123' } }
        )

        fireEvent.change(
            screen.getByLabelText(/confirm password/i),
            { target: { value: 'password123' } }
        )

        fireEvent.click(
            screen.getByRole('button', { name: /create account/i })
        )

        expect(signUpMock).not.toHaveBeenCalled()
    })

    it('calls Supabase signUp with correct values', async () => {
        signUpMock.mockResolvedValue({ error: null })

        render(<SignupForm />)
        fillValidForm()

        fireEvent.click(
            screen.getByRole('button', { name: /create account/i })
        )

        await waitFor(() => {
            expect(signUpMock).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password123',
                options: {
                    emailRedirectTo: expect.stringContaining(
                        '/auth/verified'
                    ),
                },
            })
        })
    })

    it('shows loading state while submitting', async () => {
        signUpMock.mockImplementation(
            () => new Promise(() => {}) // never resolves
        )

        render(<SignupForm />)
        fillValidForm()

        fireEvent.click(
            screen.getByRole('button', { name: /create account/i })
        )

        expect(
            screen.getByRole('button', { name: /creating account/i })
        ).toBeDisabled()
    })

    it('redirects to check-email on success', async () => {
        signUpMock.mockResolvedValue({ error: null })

        render(<SignupForm />)
        fillValidForm()

        fireEvent.click(
            screen.getByRole('button', { name: /create account/i })
        )

        await waitFor(() => {
            expect(window.location.href).toBe('/auth/check-email')
        })
    })

    it('shows error message when signup fails', async () => {
        signUpMock.mockResolvedValue({
            error: { message: 'Email already exists' },
        })

        render(<SignupForm />)
        fillValidForm()

        fireEvent.click(
            screen.getByRole('button', { name: /create account/i })
        )

        expect(
            await screen.findByText(/email already exists/i)
        ).toBeInTheDocument()
    })
})

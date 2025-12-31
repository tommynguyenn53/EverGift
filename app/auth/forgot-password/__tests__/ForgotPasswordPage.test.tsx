import {render, screen, fireEvent, waitFor, cleanup} from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import ForgotPasswordPage from '../page'

afterEach(() => {
    cleanup()
})


// --------------------
// Mocks
// --------------------

const resetPasswordMock = vi.fn()

vi.mock('@/lib/supabase/client', () => ({
    supabaseBrowser: () => ({
        auth: {
            resetPasswordForEmail: resetPasswordMock,
        },
    }),
}))

vi.mock('@/components/PageBackground', () => ({
    default: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
}))

// --------------------
// Helpers
// --------------------

const getSendButton = () =>
    screen.getAllByRole('button', { name: /send reset link/i })[0]

const getResendButton = () =>
    screen.getAllByRole('button', { name: /resend link/i })[0]

function fillEmail(email = 'test@example.com') {
    fireEvent.change(screen.getByLabelText(/email address/i), {
        target: { value: email },
    })
}

// --------------------
// Tests
// --------------------

describe('ForgotPasswordPage', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('disables submit button on initial render', () => {
        render(<ForgotPasswordPage />)

        expect(getSendButton()).toBeDisabled()
    })

    it('enables submit button when email is entered', () => {
        render(<ForgotPasswordPage />)

        fillEmail()

        expect(getSendButton()).toBeEnabled()
    })

    it('calls Supabase resetPasswordForEmail with correct params', async () => {
        resetPasswordMock.mockResolvedValue({ error: null })

        render(<ForgotPasswordPage />)

        fillEmail()
        fireEvent.click(getSendButton())

        await waitFor(() => {
            expect(resetPasswordMock).toHaveBeenCalledWith(
                'test@example.com',
                expect.objectContaining({
                    redirectTo: expect.stringContaining('/auth/reset-password'),
                })
            )
        })
    })

    it('shows "check your email" state after successful submission', async () => {
        resetPasswordMock.mockResolvedValue({ error: null })

        render(<ForgotPasswordPage />)

        fillEmail()
        fireEvent.click(getSendButton())

        expect(
            await screen.findByText(/check your email/i)
        ).toBeInTheDocument()

        expect(
            screen.getByText(/didn’t get the email/i)
        ).toBeInTheDocument()
    })

    it('allows resending the reset link', async () => {
        resetPasswordMock.mockResolvedValue({ error: null })

        render(<ForgotPasswordPage />)

        fillEmail()
        fireEvent.click(getSendButton())

        const resendButton = await screen.findByRole('button', {
            name: /resend link/i,
        })

        fireEvent.click(resendButton)

        await waitFor(() => {
            expect(resetPasswordMock).toHaveBeenCalledTimes(2)
        })

        expect(
            await screen.findByText(/reset link resent/i)
        ).toBeInTheDocument()
    })

    it('shows error message when Supabase returns an error', async () => {
        resetPasswordMock.mockResolvedValue({
            error: { message: 'User not found' },
        })

        render(<ForgotPasswordPage />)

        fillEmail()
        fireEvent.click(getSendButton())

        expect(
            await screen.findByText(/user not found/i)
        ).toBeInTheDocument()
    })

    it('shows loading state while sending', async () => {
        resetPasswordMock.mockImplementation(
            () => new Promise(() => {})
        )

        render(<ForgotPasswordPage />)

        fillEmail()
        fireEvent.click(getSendButton())

        expect(
            screen.getAllByRole('button', { name: /sending/i })[0]
        ).toBeDisabled()
    })
})

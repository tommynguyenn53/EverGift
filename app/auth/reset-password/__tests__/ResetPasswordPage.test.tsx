import {render, screen, fireEvent, waitFor, cleanup} from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach} from 'vitest'
import ResetPasswordPage from '../page'

afterEach(() => {
    cleanup()
})
// --------------------
// Mocks
// --------------------

const updateUserMock = vi.fn()
const signOutMock = vi.fn()
const getSessionMock = vi.fn()
const pushMock = vi.fn()

vi.mock('@/lib/supabase/client', () => ({
    supabaseBrowser: () => ({
        auth: {
            updateUser: updateUserMock,
            signOut: signOutMock,
            getSession: getSessionMock,
        },
    }),
}))

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: pushMock,
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

const getSubmitButton = () =>
    screen.getByRole('button', { name: /reset password/i })

function fillPasswords(password = 'password123') {
    fireEvent.change(
        screen.getByPlaceholderText(/new password/i),
        { target: { value: password } }
    )

    fireEvent.change(
        screen.getByPlaceholderText(/confirm password/i),
        { target: { value: password } }
    )
}

// --------------------
// Tests
// --------------------

describe('ResetPasswordPage', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('calls getSession on mount', () => {
        render(<ResetPasswordPage />)

        expect(getSessionMock).toHaveBeenCalled()
    })

    it('disables submit button initially', () => {
        render(<ResetPasswordPage />)

        expect(getSubmitButton()).toBeDisabled()
    })

    it('enables submit button when passwords are valid and match', () => {
        render(<ResetPasswordPage />)

        fillPasswords()

        expect(getSubmitButton()).toBeEnabled()
    })

    it('does not submit if passwords are invalid', () => {
        render(<ResetPasswordPage />)

        fireEvent.change(
            screen.getByPlaceholderText(/new password/i),
            { target: { value: 'short' } }
        )

        fireEvent.change(
            screen.getByPlaceholderText(/confirm password/i),
            { target: { value: 'short' } }
        )

        fireEvent.click(getSubmitButton())

        expect(updateUserMock).not.toHaveBeenCalled()
    })

    it('calls Supabase updateUser with correct password', async () => {
        updateUserMock.mockResolvedValue({ error: null })

        render(<ResetPasswordPage />)

        fillPasswords()
        fireEvent.click(getSubmitButton())

        await waitFor(() => {
            expect(updateUserMock).toHaveBeenCalledWith({
                password: 'password123',
            })
        })
    })

    it('signs out and redirects on successful password reset', async () => {
        updateUserMock.mockResolvedValue({ error: null })

        render(<ResetPasswordPage />)

        fillPasswords()
        fireEvent.click(getSubmitButton())

        await waitFor(() => {
            expect(signOutMock).toHaveBeenCalled()
            expect(pushMock).toHaveBeenCalledWith('/auth/password-updated')
        })
    })

    it('shows error message when updateUser fails', async () => {
        updateUserMock.mockResolvedValue({
            error: { message: 'Something went wrong' },
        })

        render(<ResetPasswordPage />)

        fillPasswords()
        fireEvent.click(getSubmitButton())

        expect(
            await screen.findByText(/something went wrong/i)
        ).toBeInTheDocument()
    })

    it('shows loading state while submitting', async () => {
        updateUserMock.mockImplementation(
            () => new Promise(() => {})
        )

        render(<ResetPasswordPage />)

        fillPasswords()
        fireEvent.click(getSubmitButton())

        expect(
            screen.getByRole('button', { name: /updating/i })
        ).toBeDisabled()
    })
})

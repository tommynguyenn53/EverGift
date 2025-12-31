import {render, screen, fireEvent, waitFor, cleanup} from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach} from 'vitest'
import LoginForm from '../LoginForm'

afterEach(() => {
    cleanup()
})


// --------------------
// Mocks
// --------------------

const signInMock = vi.fn()
const pushMock = vi.fn()

vi.mock('@/lib/supabase/client', () => ({
    supabaseBrowser: () => ({
        auth: {
            signInWithPassword: signInMock,
        },
    }),
}))

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: pushMock,
    }),
}))

// --------------------
// Helpers
// --------------------

const getLoginButton = () =>
    screen.getAllByRole('button', { name: /log in/i })[0]

function fillValidForm() {
    fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test@example.com' },
    })

    fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'password123' },
    })
}

// --------------------
// Tests
// --------------------

describe('LoginForm', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('disables submit button on initial render', () => {
        render(<LoginForm />)

        expect(getLoginButton()).toBeDisabled()
    })

    it('enables submit button when email and password are filled', () => {
        render(<LoginForm />)

        fillValidForm()

        expect(getLoginButton()).toBeEnabled()
    })

    it('does not submit if fields are empty', () => {
        render(<LoginForm />)

        fireEvent.click(getLoginButton())

        expect(signInMock).not.toHaveBeenCalled()
    })

    it('calls Supabase signInWithPassword with correct values', async () => {
        signInMock.mockResolvedValue({ error: null })

        render(<LoginForm />)

        fillValidForm()
        fireEvent.click(getLoginButton())

        await waitFor(() => {
            expect(signInMock).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password123',
            })
        })
    })

    it('shows loading state while submitting', async () => {
        signInMock.mockImplementation(() => new Promise(() => {}))

        render(<LoginForm />)

        fillValidForm()
        fireEvent.click(getLoginButton())

        expect(
            screen.getAllByRole('button', { name: /logging in/i })[0]
        ).toBeDisabled()
    })

    it('redirects to dashboard on successful login', async () => {
        signInMock.mockResolvedValue({ error: null })

        render(<LoginForm />)

        fillValidForm()
        fireEvent.click(getLoginButton())

        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith('/dashboard')
        })
    })

    it('shows error message when login fails', async () => {
        signInMock.mockResolvedValue({
            error: { message: 'Invalid login credentials' },
        })

        render(<LoginForm />)

        fillValidForm()
        fireEvent.click(getLoginButton())

        expect(
            await screen.findByText(/invalid login credentials/i)
        ).toBeInTheDocument()

        expect(pushMock).not.toHaveBeenCalled()
    })
})

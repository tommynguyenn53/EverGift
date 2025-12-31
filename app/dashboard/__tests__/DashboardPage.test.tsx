import { describe, it, expect, vi } from 'vitest'
import DashboardPage from '../page'
import { redirect } from 'next/navigation'

vi.mock('next/navigation', () => ({
    redirect: vi.fn(),
}))

vi.mock('@/lib/supabase/server', () => ({
    supabaseServer: vi.fn(() => ({
        auth: {
            getUser: vi.fn(() =>
                Promise.resolve({ data: { user: null } })
            ),
        },
        from: vi.fn(() => ({
            select: vi.fn(() => ({
                eq: vi.fn(() => ({
                    single: vi.fn(() =>
                        Promise.resolve({ data: null })
                    ),
                })),
            })),
        })),
    })),
}))


describe('DashboardPage', () => {
    it('redirects to login when user is not authenticated', async () => {
        await DashboardPage()
        expect(redirect).toHaveBeenCalledWith('/auth/login')
    })
})

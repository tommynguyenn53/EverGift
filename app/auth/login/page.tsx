import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

import AppHeader from '@/components/AppHeader'
import LoginForm from './LoginForm'

export default async function LoginPage() {
    const cookieStore = await cookies()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // 🔒 Logged-in users should not access login
    if (user) {
        redirect('/dashboard')
    }

    return (
        <>
            <AppHeader />

            <main>
                <div className="min-h-screen flex items-center justify-center px-4">
                    <div className="w-full max-w-sm space-y-6">
                        <h1 className="text-2xl font-semibold text-center">
                            Log in to EverGift
                        </h1>

                        <LoginForm />

                        <div className="space-y-2 text-center text-sm text-gray-600">
                            <p>
                                <a href="/auth/forgot-password" className="underline">
                                    Forgot your password?
                                </a>
                            </p>
                            <p>
                                Don’t have an account?{' '}
                                <a href="/auth/signup" className="underline">
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

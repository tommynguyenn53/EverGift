import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

import AppHeader from '@/components/AppHeader'
import SignupForm from './SignupForm'

export default async function SignupPage() {
    // ✅ Important: await cookies()
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

    // 🔒 Prevent logged-in users from accessing signup page
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
                            Create your EverGift account
                        </h1>

                        <SignupForm />

                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <a href="/auth/login" className="underline">
                                Log in
                            </a>
                        </p>
                    </div>
                </div>
            </main>
        </>
    )
}

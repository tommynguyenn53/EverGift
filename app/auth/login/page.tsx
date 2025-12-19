import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

import AppHeader from '@/components/AppHeader'
import LoginForm from './LoginForm'
import PageBackground from "@/components/PageBackground";

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
            <PageBackground>

            <main className="">
                <div className="w-full max-w-sm flex flex-col items-center text-center">

                    {/* Heading */}
                    <h1
                        className="
              mt-[40px]
              font-inter
              font-medium
              text-[26px]
              tracking-[0.015em]
              text-[#3A3A3A]
            "
                    >
                        Log In to EverGift
                    </h1>

                    {/* Sub text */}
                    <p
                        className="
              mt-[20px]
              font-inter
              font-normal
              text-[15px]
              leading-[150%]
              tracking-[0.015em]
              text-[#3A3A3A]
            "
                    >
                        Log in to manage your <br/> personalised wedding gifting page.
                    </p>

                    {/* Form */}
                    <div className="mt-[40px] w-full">
                        <LoginForm />
                    </div>

                    {/* Links (unchanged for now) */}


                </div>
            </main>
            </PageBackground>
    )
}

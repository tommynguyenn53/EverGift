import {redirect} from 'next/navigation'
import {createServerClient} from '@supabase/ssr'
import {cookies} from 'next/headers'

import AppHeader from '@/components/AppHeader'
import SignupForm from './SignupForm'
import PageBackground from "@/components/PageBackground";

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
        data: {user},
    } = await supabase.auth.getUser()

    // 🔒 Prevent logged-in users from accessing signup page
    if (user) {
        redirect('/dashboard')
    }

    return (
        <PageBackground>
            <main className="">
                <div className="">
                    {/* Heading */}
                    <h1
                        className="
                        mt-[40px]
                        font-inter
                        font-medium
                        text-[26px]
                        tracking-[0.015em]
                        text-[#3A3A3A]
                        text-center
                      "
                    >
                        Create Your <br/> EverGift Account
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
                        text-center
                      "
                    >
                        Sign up to create and manage your <br/> personalised wedding gifting page.
                    </p>

                    {/* Form */}
                    <div className="mt-[40px] w-full max-w-sm flex flex-col items-center">

                        <SignupForm/>
                    </div>

                    {/* Login link */}
                    <p
                        className="
                        mt-[16px]
                        text-center
                        font-inter
                        text-[15px]
                        leading-[170%]
                        tracking-[0.015em]
                        text-[#3A3A3A]
                      "
                                        >
                      <span className="font-normal">
                        Already have an account?
                      </span>
                    <br/>
                    <a
                        href="/auth/login"
                        className="
                          font-medium
                          text-[#C9A86A]
                          underline
                          transition
                          hover:opacity-80
                          active:opacity-60
                        "
                        >
                            Log in
                        </a>
                    </p>

                </div>
            </main>
        </PageBackground>
    )

}


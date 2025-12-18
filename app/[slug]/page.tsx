import { notFound } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'
import ProfileMenu from "@/components/ProfileMenu";

type Props = {
    params: Promise<{
        slug: string
    }>
}

export default async function PublicWeddingPage({ params }: Props) {
    const { slug } = await params

    if (!slug) {
        notFound()
    }

    const supabase = await supabaseServer()

    const { data: wedding, error } = await supabase
        .from('weddings')
        .select(
            `
      id,
      user_id,
      partner_one_name,
      partner_two_name,
      wedding_date,
      welcome_message,
      status
    `
        )
        .eq('slug', slug)
        .single()

    if (error || !wedding) {
        notFound()
    }

    // Get current user (if logged in)
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const isOwner = user && user.id === wedding.user_id

    // Visibility rules
    if (wedding.status !== 'active' && !isOwner) {
        notFound()
    }

    return (


        <div className="min-h-screen flex items-center justify-center px-4">
            {/* Owner-only profile menu */}
            {isOwner && (
                <div className="absolute top-4 right-4">
                    <ProfileMenu />
                </div>
            )}

            <div className="w-full max-w-xl text-center space-y-6">

                {/* Draft preview banner (owner only) */}
                {isOwner && wedding.status === 'draft' && (

                    <div className="rounded-md bg-yellow-100 text-yellow-800 px-4 py-2 text-sm">
                        This page is in draft mode and only visible to you.
                    </div>
                )}

                <h1 className="text-3xl font-semibold">
                    {wedding.partner_one_name} & {wedding.partner_two_name}
                </h1>

                <p className="text-gray-600">
                    {new Date(wedding.wedding_date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>

                <p className="text-gray-700 max-w-md mx-auto">
                    {wedding.welcome_message}
                </p>

                <button
                    disabled
                    className="mt-6 rounded-md bg-[#d6c7a1] text-black px-6 py-3 font-medium opacity-70 cursor-not-allowed"
                >
                    Give a gift (coming soon)
                </button>
            </div>
        </div>
    )
}
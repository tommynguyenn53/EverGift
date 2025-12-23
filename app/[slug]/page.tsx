import { notFound } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";

type Props = {
    params: Promise<{
        slug: string
    }>
}

type WeddingImage = {
    storage_path: string
}

export default async function PublicWeddingPage({ params }: Props) {
    const { slug } = await params
    if (!slug) notFound()

    const supabase = await supabaseServer()

    const { data: wedding, error } = await supabase
        .from('weddings')
        .select(`
      id,
      user_id,
      partner_one_name,
      partner_two_name,
      wedding_date,
      header_text,
      welcome_message,
      status
    `)
        .eq('slug', slug)
        .single()

    if (error || !wedding) notFound()

    const { data: image } = await supabase
        .from('images')
        .select('storage_path')
        .eq('wedding_id', wedding.id)
        .single<WeddingImage>()

    let collageUrl: string | null = null

    if (image?.storage_path) {
        const { data } = supabase.storage
            .from('wedding-images')
            .getPublicUrl(image.storage_path)

        collageUrl = data.publicUrl
    }



    const {
        data: { user },
    } = await supabase.auth.getUser()

    const isOwner = user && user.id === wedding.user_id

    // Visibility rules
    if (wedding.status !== 'active' && !isOwner) {
        notFound()
    }

    const formattedDate = new Date(wedding.wedding_date).toLocaleDateString(
        undefined,
        {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }
    )

    return (
        <div
            className="min-h-screen px-[24px] py-[20px] bg-gradient-to-b from-[#EDE0C3] via-[#F6EEDC] to-[#FFFEFA]"
        >
            <AppHeader tagline={wedding.header_text} showProfile={!!isOwner}/>
            <main>
                <div className="w-full max-w-sm flex flex-col items-center text-center">

                    {/* Draft banner (owner only) */}
                    {isOwner && wedding.status === 'draft' && (
                        <div className="mt-[40px] rounded-md bg-yellow-100 text-yellow-800 px-4 py-2 text-sm">
                            This page is in draft mode and only visible to you.
                        </div>
                    )}

                    {/* Names */}
                    <h1
                        className="
              mt-[32px]
              playfair-display-heading_text
              text-[36px]
              tracking-[0.015em]
              text-[#3A3A3A]
            "
                    >
                        {wedding.partner_one_name} &amp; {wedding.partner_two_name}
                    </h1>

                    {/* Date */}
                    <p
                        className="
              mt-[12px]
              playfair-display-date_text
              text-[20px]
              tracking-[0.015em]
              text-[#3A3A3A]
            "
                    >
                        {formattedDate}
                    </p>

                    {/* Collage (placeholder for now) */}
                    {collageUrl && (
                        <img
                            src={collageUrl}
                            alt="Wedding photo collage"
                            className="mt-[32px] w-[229px] h-[344px] object-cover"
                        />
                    )}


                    {/* Message */}
                    <p
                        className="
              mt-[32px]
              playfair-display-body_text
              text-[15px]
              leading-[150%]
              text-[#3A3A3A]
              whitespace-pre-line
            "
                    >
                        {wedding.welcome_message}

                    </p>

                    {/* CTA (disabled for now) */}
                    <button
                        className="
              mt-[24px]
              shadow-[6px_4px_18px_rgba(0,0,0,0.1)]
              inline-flex
              items-center
              justify-center
              rounded-[14px]
              bg-[#D8C9A6]
              px-[62px]
              py-[16px]
              font-inter
              font-medium
              text-[16px]
              text-white
              transition
              hover:opacity-90
              active:opacity-80
              active:scale-[0.98]
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
                    >
                        Give a Gift
                    </button>

                </div>
            </main>
            <Footer/>
        </div>
    )
}

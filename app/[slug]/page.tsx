import {notFound} from 'next/navigation'
import {supabaseServer} from '@/lib/supabase/server'
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import Link from "next/link"

type Props = {
    params: Promise<{
        slug: string
    }>
}

type WeddingImage = {
    storage_path: string
}

export default async function PublicWeddingPage({params}: Props) {
    const {slug} = await params
    if (!slug) notFound()

    const supabase = await supabaseServer()

    const {data: wedding, error} = await supabase
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

    const {data: image} = await supabase
        .from('images')
        .select('storage_path')
        .eq('wedding_id', wedding.id)
        .single<WeddingImage>()

    let collageUrl: string | null = null

    if (image?.storage_path) {
        const {data} = supabase.storage
            .from('wedding-images')
            .getPublicUrl(image.storage_path)

        collageUrl = data.publicUrl
    }

    const {
        data: {user},
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
                <div className="w-full max-w-sm mx-auto flex flex-col items-center text-center">

                    {/* Draft banner (owner only) */}
                    {isOwner && wedding.status === 'draft' && (
                        <div
                            className="mt-[40px] w-full max-w-[520px]
                            rounded-[12px] bg-[#FFF7E0]
                            border border-[#E8D9B5]
                            px-[16px] py-[14px]
                            font-inter text-[13px] md:text-[18px]
                            text-[#6F5A1E]"
                        >
                            <p className="font-medium">
                                This page is in draft mode
                            </p>

                            <p className="mt-[4px] text-[#6F5A1E]/80">
                                Only you can see it until it’s published.
                            </p>

                            <a
                                href="/dashboard"
                                className="inline-block mt-[8px]
                                font-medium text-[#C9A86A]
                                underline underline-offset-4
                                hover:opacity-80 transition hover:opacity-80 active:opacity-60"
                            >
                                Return to dashboard →
                            </a>
                        </div>
                    )}

                    {/* Names */}
                    <h1
                        className="mt-[32px] md:mt-[48px] playfair-display-heading_text text-[36px] md:text-[54px]
                        tracking-[0.015em] text-[#3A3A3A]"
                    >
                        {wedding.partner_one_name} &amp; {wedding.partner_two_name}
                    </h1>

                    {/* Date */}
                    <p
                        className="playfair-display-date_text mt-[12px] md:mt-[18px] font-playfair font-normal
                        text-[20px] md:text-[30px] tracking-[0.015em] text-[#3A3A3A]"
                    >
                        {formattedDate}
                    </p>

                    {/* Collage (placeholder for now) */}
                    {collageUrl && (
                        <img
                            src={collageUrl}
                            alt="Wedding photo collage"
                            className="mt-[32px] md:mt[48px] w-[229px] h-[344px] md:w-[344px] md:h-[603px] object-cover"
                        />
                    )}


                    {/* Message */}
                    <p
                        className="playfair-display-body_text mt-[32px] md:mt-[48px] font-playfair font-normal
                        text-[15px] md:text-[22.5px] leading-[150%] text-[#3A3A3A] w-[270px] md:w-[430px] whitespace-pre-line"
                    >
                        {wedding.welcome_message}

                    </p>

                    <Link
                        href={`/${slug}/gift`}
                        className="mt-[24px] md:mt-[36px] shadow-[6px_4px_18px_rgba(0,0,0,0.1)] inline-flex items-center
                        justify-center rounded-[14px] md:rounded-[21px] bg-[#D8C9A6] px-[62px] py-[16px] md:px-[90px]
                        md:py-[20px] font-inter font-medium text-[16px] md:text-[24px] text-white transition hover:opacity-90
                        active:opacity-80 active:scale-[0.98]"
                    >
                        Give a Gift
                    </Link>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

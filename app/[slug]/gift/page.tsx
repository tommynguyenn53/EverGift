import { notFound } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'
import GiftSelectionClient from './GiftSelectionClient'
import AppHeader from '@/components/AppHeader'
import Footer from '@/components/Footer'

type Props = {
    params: Promise<{
        slug: string
    }>
}

export default async function GiftSelectionPage({ params }: Props) {
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
      header_text,
      status
    `)
        .eq('slug', slug)
        .single()

    if (error || !wedding) notFound()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const isOwner = user && user.id === wedding.user_id

    if (wedding.status !== 'active' && !isOwner) notFound()

    return (
        <div className="min-h-screen px-[24px] md:px-[36px] py-[20px] md:py-[30px] bg-gradient-to-b from-[#EDE0C3] via-[#F6EEDC] to-[#FFFEFA]">
            <AppHeader tagline={wedding.header_text} showProfile={!!isOwner} />

            <GiftSelectionClient weddingId={wedding.id}  slug={slug}/>

            <Footer/>
        </div>
    )
}

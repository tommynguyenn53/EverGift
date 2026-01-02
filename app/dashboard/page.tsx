import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'
import PublishToggle from '@/components/PublishToggle'
import PageBackground from '@/components/PageBackground'
import WeddingQrCodeDashboard from '@/components/WeddingQrCodeDashboard'
import StripeStatusCard from "@/components/StripeStatusCard";

type Gift = {
    id: string
    amount_cents: number
    created_at: string
    guest_name: string | null
    message_text: string | null
}


function formatAmount(cents: number) {
    return `$${(cents / 100).toFixed(2)}`
}

function formatDate(date: string) {
    return new Date(date).toLocaleString('en-AU', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    })
}

export default async function DashboardPage() {
    const supabase = await supabaseServer()

    const { data } = await supabase.auth.getUser()

    if (!data?.user) {
        redirect('/auth/login')
        return null // THIS IS REQUIRED FOR TESTS
    }

    const user = data.user



    const { data: wedding } = await supabase
        .from('weddings')
        .select('id, partner_one_name, partner_two_name, slug, status, stripe_account_id, payout_enabled')
        .eq('user_id', user.id)
        .single()

    if (!wedding || !wedding.payout_enabled) redirect('/create-wedding')

    /* ----------------------------
       Gifts summary (PAID gifts)
    ---------------------------- */

    const { data: giftStats } = await supabase
        .from('gifts')
        .select('amount_cents')
        .eq('wedding_id', wedding.id)
        .eq('status', 'paid')

    const typedGiftStats = (giftStats ?? []) as { amount_cents: number }[]

    const totalGifts = typedGiftStats.length
    const totalAmount = typedGiftStats.reduce(
        (sum, g) => sum + g.amount_cents,
        0
    )

    /* ----------------------------
       Recent gifts (last 5)
    ---------------------------- */

    const { data: recentGifts } = await supabase
        .from('gifts')
        .select('id, amount_cents, created_at, guest_name, message_text')
        .eq('wedding_id', wedding.id)
        .eq('status', 'paid')
        .order('created_at', { ascending: false })
        .limit(5)


    const typedRecentGifts = (recentGifts ?? []) as Gift[]

    const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${wedding.slug}`

    return (
        <PageBackground>
            <main className="w-full flex flex-col items-center">

                {/* Heading */}
                <h1 className="mt-[40px] md:mt-[60px] font-inter font-medium text-[26px] md:text-[39px] tracking-[0.015em]
                text-[#3A3A3A] text-center">
                    Hi {wedding.partner_one_name} and {wedding.partner_two_name}
                </h1>

                <p className="mt-[20px] md:mt-[30px] font-inter text-[15px] md:text-[22.5px] leading-[150%]
                tracking-[0.015em] text-[#3A3A3A] text-center max-w-[320px] md:max-w-[480px]">
                    Here’s your wedding page overview.
                </p>

                <p className="mt-[16px] md:mt-[24px] font-inter text-[15px] md:text-[22.5px] leading-[150%]
                tracking-[0.015em] text-[#3A3A3A] text-center">
                    Press the QR code to save or share it.
                </p>

                <div className="mt-[24px] md:mt-[36px]">
                    <PublishToggle
                        weddingId={wedding.id}
                        initialStatus={wedding.status}
                    />
                </div>

                <StripeStatusCard
                    weddingId={wedding.id}
                    stripeAccountId={wedding.stripe_account_id}
                    payoutEnabled={wedding.payout_enabled}
                />


                <div className="mt-[32px] md:mt-[48px] flex gap-[20px] md:gap-[30px]">

                    <div className="w-[130px] md:w-[195px] h-[130px] md:h-[195px] rounded-[10px] md:rounded-[15px]
                    bg-white px-[20px] md:px-[30px] flex flex-col justify-center shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                        <p className="font-inter font-medium text-[12px] md:text-[18px] text-[#3A3A3A]">
                            Total Amount Received
                        </p>

                        <p className="mt-[5px] font-inter text-[10px] md:text-[15px] leading-[150%] text-[#3A3A3A]">
                            {totalAmount ? formatAmount(totalAmount) : '$—'}
                        </p>

                        <p className="mt-[12px] font-inter font-medium text-[12px] md:text-[18px] text-[#3A3A3A]">
                            Total Gifts
                        </p>

                        <p className="mt-[5px] font-inter text-[10px] md:text-[15px] leading-[150%] text-[#3A3A3A]">
                            {totalGifts || '—'}
                        </p>
                    </div>

                    <WeddingQrCodeDashboard value={pageUrl} />
                </div>

                <div className="mt-[32px] md:mt-[48px] grid grid-cols-2 gap-[12px] md:gap-[18px]">
                    <a
                        href={pageUrl}
                        className="w-[150px] md:w-[225px] h-[55px] md:h-[82.5px] rounded-[14px] md:rounded-[21px]
                        bg-[#D8C9A6] flex items-center justify-center font-inter font-medium text-[16px] md:text-[24px]
                        text-white shadow-[6px_4px_18px_rgba(0,0,0,0.1)] transition hover:opacity-90 active:opacity-80
                        active:scale-[0.98]"
                    >
                        View Live Page
                    </a>

                    <a
                        href="/edit-wedding"
                        className="w-[150px] md:w-[225px] h-[55px] md:h-[82.5px] rounded-[14px] md:rounded-[21px]
                        bg-[#D8C9A6] flex items-center justify-center font-inter font-medium text-[16px] md:text-[24px]
                        text-white shadow-[6px_4px_18px_rgba(0,0,0,0.1)] transition hover:opacity-90 active:opacity-80
                        active:scale-[0.98]"
                    >
                        Edit Wedding
                    </a>
                </div>

                {/* Recent Gifts */}
                <div className="w-[270px] md:w-[405px]">
                    <h2 className="mt-[32px] md:mt-[48px] font-inter font-medium text-[15px] md:text-[22.5px]
                    tracking-[0.015em] text-[#3A3A3A] text-left">
                        Recent Gifts
                    </h2>

                    <div className="mt-[16px] md:mt-[24px] flex flex-col gap-[12px] md:gap-[18px]">
                        {typedRecentGifts.length > 0 ? (
                            typedRecentGifts.map((gift) => (
                                <div
                                    key={gift.id}
                                    className="w-[270px] md:w-[405px] rounded-[10px] md:rounded-[15px] bg-white px-[15px]
                                    md:px-[22.5px] py-[15px] md:py-[22.5px]"
                                >
                                    <div className="flex flex-col gap-[10px] md:gap-[15px]">
                                        <p className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                                            {gift.guest_name ?? 'Guest'} — {formatAmount(gift.amount_cents)}
                                        </p>

                                        <p className="font-inter font-regular text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                                            {gift.message_text
                                                ? `"${gift.message_text.length > 35
                                                    ? gift.message_text.slice(0, 35) + '…'
                                                    : gift.message_text
                                                }"`
                                                : '"No message"'}
                                        </p>

                                        <p className="font-inter text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                                            {formatDate(gift.created_at)}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div
                                className="w-[270px] md:w-[405px] rounded-[10px] md:rounded-[15px] bg-white px-[15px]
                                md:px-[22.5px] py-[15px] md:py-[22.5px] text-center font-inter text-[15px]
                                md:text-[22.5px] text-[#3A3A3A]/70">
                                No gifts yet — they’ll appear here once guests start gifting.
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </PageBackground>
    )
}

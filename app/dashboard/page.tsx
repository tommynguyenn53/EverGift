import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'
import PublishToggle from '@/components/PublishToggle'
import PageBackground from '@/components/PageBackground'
import WeddingQrCodeDashboard from '@/components/WeddingQrCodeDashboard'

type Gift = {
    id: string
    amount_cents: number
    created_at: string
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

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) redirect('/auth/login')

    const { data: wedding } = await supabase
        .from('weddings')
        .select('id, partner_one_name, partner_two_name, slug, status')
        .eq('user_id', user.id)
        .single()

    if (!wedding) redirect('/create-wedding')

    /* ----------------------------
       Gifts summary
    ---------------------------- */

    const { data: giftStats } = await supabase
        .from('gifts')
        .select('amount_cents', { count: 'exact' })
        .eq('wedding_id', wedding.id)
        .eq('status', 'completed')

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
        .select('id, amount_cents, created_at')
        .eq('wedding_id', wedding.id)
        .eq('status', 'completed')
        .order('created_at', { ascending: false })
        .limit(5)

    const typedRecentGifts = (recentGifts ?? []) as Gift[]


    const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${wedding.slug}`

    return (
        <PageBackground>
            <main className="w-full flex flex-col items-center">

                {/* Heading */}
                <h1 className="mt-[40px] font-inter font-medium text-[26px] tracking-[0.015em] text-[#3A3A3A] text-center">
                    Hi {wedding.partner_one_name} and {wedding.partner_two_name}
                </h1>

                {/* Subtext */}
                <p className="mt-[20px] font-inter text-[15px] leading-[150%] tracking-[0.015em] text-[#3A3A3A] text-center max-w-[320px]">
                    Here’s your wedding page overview.
                </p>

                <p className="mt-[16px] font-inter text-[15px] leading-[150%] tracking-[0.015em] text-[#3A3A3A] text-center">
                    Press the QR code to save or share it.
                </p>

                {/* Publish toggle */}
                <div className="mt-[24px]">
                    <PublishToggle
                        weddingId={wedding.id}
                        initialStatus={wedding.status}
                    />
                </div>

                {/* Stats + QR */}
                <div className="mt-[32px] flex gap-[20px]">

                    {/* Totals tile */}
                    <div className="w-[130px] h-[130px] rounded-[10px] bg-white px-[20px] flex flex-col justify-center shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                        <p className="font-inter font-medium text-[12px] text-[#3A3A3A]">
                            Total Amount Received
                        </p>

                        <p className="mt-[5px] font-inter text-[10px] leading-[150%] text-[#3A3A3A]">
                            {totalAmount ? formatAmount(totalAmount) : '$—'}
                        </p>

                        <p className="mt-[12px] font-inter font-medium text-[12px] text-[#3A3A3A]">
                            Total Gifts
                        </p>

                        <p className="mt-[5px] font-inter text-[10px] leading-[150%] text-[#3A3A3A]">
                            {totalGifts || '—'}
                        </p>
                    </div>

                    <WeddingQrCodeDashboard value={pageUrl} />
                </div>

                {/* Actions */}
                <div className="mt-[32px] grid grid-cols-2 gap-[12px]">
                    <a
                        href={pageUrl}
                        className="w-[150px] h-[55px] rounded-[14px] bg-[#D8C9A6] flex items-center justify-center font-inter font-medium text-[16px] text-white shadow-[6px_4px_18px_rgba(0,0,0,0.1)]"
                    >
                        View Live Page
                    </a>

                    <a
                        href="/edit-wedding"
                        className="w-[150px] h-[55px] rounded-[14px] bg-[#D8C9A6] flex items-center justify-center font-inter font-medium text-[16px] text-white shadow-[6px_4px_18px_rgba(0,0,0,0.1)]"
                    >
                        Edit Wedding
                    </a>
                </div>

                {/* Recent Gifts */}
                <div className="w-[280px]">
                    <h2 className="mt-[32px] font-inter font-medium text-[15px] tracking-[0.015em] text-[#3A3A3A] text-left">
                        Recent Gifts
                    </h2>

                    <div className="mt-[16px] flex flex-col gap-[12px]">
                        {recentGifts && recentGifts.length > 0 ? (
                            typedRecentGifts.map((gift) => (
                                <div
                                    key={gift.id}
                                    className="w-[270px] rounded-[10px] bg-white px-[15px] py-[15px]"
                                >
                                    <div className="flex flex-col gap-[10px]">
                                        <p className="font-inter font-medium text-[15px] text-[#3A3A3A]">
                                            Guest — {formatAmount(gift.amount_cents)}
                                        </p>

                                        <p className="font-inter text-[15px] text-[#3A3A3A]">
                                            “Thank you for celebrating with us”
                                        </p>

                                        <p className="font-inter text-[15px] text-[#3A3A3A]">
                                            {formatDate(gift.created_at)}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="w-[270px] rounded-[10px] bg-white px-[15px] py-[15px] text-center font-inter text-[15px] text-[#3A3A3A]/70">
                                No gifts yet — they’ll appear here once guests start gifting.
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </PageBackground>
    )
}

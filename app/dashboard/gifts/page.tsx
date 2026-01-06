import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'
import PageBackground from '@/components/PageBackground'
import DashboardGiftCard from "@/components/DashboardGiftCard";

type Gift = {
    id: string
    amount_cents: number
    platform_fee_cents: number
    stripe_fee_cents: number
    guest_covered_fees: boolean
    created_at: string
    guest_name: string | null
    message_text: string | null
    image_path: string | null
    image_public_url: string | null
}

const PAGE_SIZE = 5

function formatAmount(cents: number) {
    return `$${(cents / 100).toFixed(2)}`
}

function formatDate(date: string) {
    return new Date(date).toLocaleString('en-AU', {
        timeZone: 'Australia/Sydney',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    })
}

function getNetGiftAmount(gift: Gift) {
    if (gift.guest_covered_fees) {
        return gift.amount_cents
    }

    return (
        gift.amount_cents -
        gift.platform_fee_cents -
        gift.stripe_fee_cents
    )
}

/* 🔽 READ PAGE FROM URL */
type Props = {
    searchParams: Promise<{ page?: string }>
}


export default async function AllGiftsPage({ searchParams }: Props) {
    const supabase = await supabaseServer()
    const resolvedSearchParams = await searchParams


    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) redirect('/auth/login')

    const { data: wedding } = await supabase
        .from('weddings')
        .select('id')
        .eq('user_id', user.id)
        .single()

    if (!wedding) redirect('/dashboard')

    /* 🔽 PAGINATION LOGIC */
    const page = Math.max(1, Number(resolvedSearchParams.page ?? 1))
    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    const { data: gifts, count } = await supabase
        .from('gifts')
        .select(
            `
            id,
            amount_cents,
            platform_fee_cents,
            stripe_fee_cents,
            guest_covered_fees,
            created_at,
            guest_name,
            message_text,
            image_path,
            image_public_url
        `,
            { count: 'exact' }
        )
        .eq('wedding_id', wedding.id)
        .eq('status', 'paid')
        .order('created_at', { ascending: false })
        .range(from, to)

    const typedGifts = (gifts ?? []) as Gift[]
    const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE))

    return (
        <PageBackground>
            <main className="w-full flex flex-col items-center">
                {/* Heading */}
                <h1
                    className="mt-[40px] md:mt-[60px]
                    font-inter font-medium text-[26px] md:text-[39px]
                    tracking-[0.015em] text-[#3A3A3A] text-center"
                >
                    All Gifts & Messages
                </h1>

                <p
                    className="mt-[16px] md:mt-[24px]
                    font-inter text-[15px] md:text-[22.5px]
                    leading-[150%] tracking-[0.015em]
                    text-[#3A3A3A]/80 text-center max-w-[320px]"
                >
                    Messages and wishes sent by your guests
                </p>

                {/* Gifts list */}
                <div className="mt-[32px] md:mt-[48px] w-[270px] md:w-[405px]">
                    <div className="flex flex-col gap-[12px] md:gap-[18px]">
                        {typedGifts.length > 0 ? (
                            typedGifts.map((gift) => (
                                <DashboardGiftCard
                                    key={gift.id}
                                    guestName={gift.guest_name}
                                    amount={formatAmount(getNetGiftAmount(gift))}
                                    message={gift.message_text}
                                    date={formatDate(gift.created_at)}
                                    imageUrl={gift.image_public_url}
                                />
                            ))
                        ) : (
                            <div
                                className="rounded-[10px] md:rounded-[15px] bg-white px-[15px]
                                md:px-[22.5px] py-[15px] md:py-[22.5px]
                                text-center font-inter text-[15px]
                                md:text-[22.5px] text-[#3A3A3A]/70"
                            >
                                No gifts yet — they’ll appear here once guests start gifting.
                            </div>
                        )}
                    </div>

                    {/* 🔽 PAGINATION CONTROLS */}
                    {totalPages > 1 && (
                        <div className="mt-[36px] md:mt-[54px] flex items-center justify-between text-[14px]">
                            <a
                                href={`/dashboard/gifts?page=${page - 1}`}
                                className={`font-inter ${
                                    page <= 1
                                        ? 'pointer-events-none opacity-40'
                                        : 'hover:underline transition hover:opacity-90 active:opacity-80'
                                }`}
                            >
                                ← Last
                            </a>

                            <span className="opacity-70">
                                Page {page} of {totalPages}
                            </span>

                            <a
                                href={`/dashboard/gifts?page=${page + 1}`}
                                className={`font-inter ${
                                    page >= totalPages
                                        ? 'pointer-events-none opacity-40'
                                        : 'hover:underline transition hover:opacity-90 active:opacity-80'
                                }`}
                            >
                                Next →
                            </a>
                        </div>
                    )}

                    {/* Back */}
                    <a
                        href="/dashboard"
                        className="mt-[36px] md:mt-[54px] h-[55px] md:h-[82.5px]
                        flex items-center justify-center rounded-[14px] md:rounded-[21px]
                        bg-[#D8C9A6] font-inter font-medium text-[16px] md:text-[24px]
                        text-white shadow-[6px_4px_18px_rgba(0,0,0,0.1)]
                        hover:opacity-90 transition active:scale-[0.98]"
                    >
                        Return to Dashboard
                    </a>
                </div>
            </main>
        </PageBackground>
    )
}

import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'
import PageBackground from '@/components/PageBackground'

type Gift = {
    id: string
    amount_cents: number
    platform_fee_cents: number
    stripe_fee_cents: number
    guest_covered_fees: boolean
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

export default async function AllGiftsPage() {
    const supabase = await supabaseServer()

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

    const { data: gifts } = await supabase
        .from('gifts')
        .select(`
            id,
            amount_cents,
            platform_fee_cents,
            stripe_fee_cents,
            guest_covered_fees,
            created_at,
            guest_name,
            message_text
        `)
        .eq('wedding_id', wedding.id)
        .eq('status', 'paid')
        .order('created_at', { ascending: false })

    const typedGifts = (gifts ?? []) as Gift[]

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
                                <div
                                    key={gift.id}
                                    className="w-full rounded-[10px] md:rounded-[15px]
                                    bg-white px-[15px] md:px-[22.5px]
                                    py-[15px] md:py-[22.5px]
                                    shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
                                >
                                    <div className="flex flex-col gap-[10px] md:gap-[15px]">
                                        <p className="font-inter font-medium text-[15px] md:text-[22.5px] text-[#3A3A3A]">
                                            {gift.guest_name ?? 'Guest'} —{' '}
                                            {formatAmount(getNetGiftAmount(gift))}
                                        </p>

                                        <p
                                            className="font-inter text-[15px] md:text-[22.5px]
                                            leading-[150%] text-[#3A3A3A]"
                                        >
                                            {gift.message_text
                                                ? `"${gift.message_text}"`
                                                : '"No message"'}
                                        </p>

                                        <p
                                            className="font-inter text-[13px] md:text-[19.5px]
                                            text-[#3A3A3A]/70"
                                        >
                                            {formatDate(gift.created_at)}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div
                                className="rounded-[10px] md:rounded-[15px]
                                bg-white px-[15px] md:px-[22.5px]
                                py-[15px] md:py-[22.5px]
                                text-center font-inter text-[15px]
                                md:text-[22.5px] text-[#3A3A3A]/70"
                            >
                                No gifts yet — messages will appear here once guests start gifting.
                            </div>
                        )}
                    </div>

                    {/* Back link */}
                    <a
                        href="/dashboard"
                        className="mt-[20px] inline-block
                        font-inter font-medium text-[12px] md:text-[18px]
                        text-[#C9A86A] underline hover:opacity-80"
                    >
                        ← Back to dashboard
                    </a>
                </div>
            </main>
        </PageBackground>
    )
}

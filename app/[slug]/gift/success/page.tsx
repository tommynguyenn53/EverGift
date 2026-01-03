import { notFound } from 'next/navigation'
import AppHeader from '@/components/AppHeader'
import Footer from '@/components/Footer'
import { formatCents } from '@/lib/payments/format'
import { supabaseService } from '@/lib/supabase/service'


type Props = {
    params: { slug: string }
    searchParams: { session_id?: string }
}

export const dynamic = 'force-dynamic'


export default async function GiftSuccessPage({ params, searchParams }: Props) {
    const { slug } = params
    const { session_id: sessionId } = searchParams


    if (!slug || !sessionId) notFound()

    const supabase = supabaseService

// 2️⃣ Fetch gift by PRIMARY KEY (no race condition)
    const { data: gift, error } = await supabase
        .from('gifts')
        .select(`
        amount_cents,
        platform_fee_cents,
        stripe_fee_cents,
        guest_covered_fees,
        guest_name,
        message_text,
        wedding:weddings (
          partner_one_name,
          partner_two_name,
          slug
    )
  `)
        .eq('stripe_checkout_session_id', sessionId)
        .single()

    if (error || !gift) notFound()


    const wedding = gift.wedding

    if (!wedding) notFound()


    const totalFees = gift.platform_fee_cents + gift.stripe_fee_cents

    const totalCharged = gift.guest_covered_fees
        ? gift.amount_cents + totalFees
        : gift.amount_cents


    return (
        <div className="min-h-screen px-[24px] py-[20px] bg-gradient-to-b from-[#EDE0C3] via-[#F6EEDC] to-[#FFFEFA]">
            <AppHeader tagline="A celebration of love" showProfile={false}/>

            <main className="flex flex-col items-center text-center">

                {/* Heading */}
                <h1
                    className="mt-[32px] md:mt-[48px] font-inter font-normal text-[28px] md:text-[42px] leading-[130%]
                    tracking-[0.015em] text-[#3A3A3A]"
                >
                    Your Gift Has<br />Been Received
                </h1>

                {/* Checkmark */}
                <img
                    src="/checkmark-icon.svg"
                    alt="Success"
                    className="mt-[24px] md:mt-[36px] w-[64px] md:w-[96px]"
                />


                {/* Thank you text */}
                <p
                    className="mt-[24px] md:mt-[36px] font-inter text-[16px] md:text-[24px] text-[#3A3A3A] max-w-[250px]
                    md:max-w-[375px]"
                >
                    Your gift for {wedding.partner_one_name} &amp;{' '}
                    {wedding.partner_two_name} has been sent successfully.
                    <br /><br />
                    Thank you for celebrating this special moment with them.
                </p>

                {/* Summary card */}
                <div className="mt-[32px] md:mt-[48px]">
                    <div
                        className="w-[287px] md:w-[430.5px] rounded-[12px] md:rounded-[18px] bg-white px-[15px] md:px-[22.5px]
                          py-[15px] md:py-[22.5px] shadow-[0px_2px_6px_rgba(0,0,0,0.04)] flex flex-col gap-[10px] md:gap-[15px]"
                    >
                        <p className="font-inter text-[12px] md:text-[18px] tracking-[0.015em] text-[#3A3A3A] text-left">
                            Summary - Successful Payment
                        </p>

                        <div className="w-full h-px bg-black/10" />

                        <div className="flex justify-between text-[12px] md:text-[18px] text-[#3A3A3A]">
                            <span>Gift Amount</span>
                            <span>{formatCents(gift.amount_cents)}</span>
                        </div>

                        <div className="flex justify-between text-[12px] md:text-[18px] text-[#3A3A3A]">

                            <span>
                            Fees {gift.guest_covered_fees ? '(covered)' : '(deducted)'}
                          </span>

                            <span>{formatCents(totalFees)}</span>
                        </div>

                        <div className="w-full h-px bg-black/10" />

                        <div className="flex justify-between font-medium text-[12px] md:text-[18px] text-[#3A3A3A]">
                            <span>Total</span>
                            <span>{formatCents(totalCharged)}</span>
                        </div>
                    </div>
                </div>

                {/* Message card */}
                {gift.message_text && (
                    <div className="mt-[24px] md:mt-[36px]">

                        <div className="w-[287px] md:w-[430.5px] rounded-[12px] md:rounded-[18px] bg-white px-[15px]
                          md:px-[22.5px] py-[15px] md:py-[22.5px] flex flex-col shadow-[0px_2px_6px_rgba(0,0,0,0.04)]
                          gap-[10px] md:gap-[15px]"
                        >
                            <p className="font-inter text-[12px] md:text-[18px] tracking-[0.015em] text-[#3A3A3A] text-left">
                                Message from You
                            </p>

                            <div className="w-full h-px bg-black/10"/>


                            <p className="font-inter text-[13px] md:text-[19.5px] text-[#3A3A3A] italic text-left">
                                "{gift.message_text}"
                            </p>
                        </div>
                    </div>
                )}


                {/* CTA */}
                <a
                    href={`/${wedding.slug}`}
                    className="mt-[32px] md:mt-[48px] w-[288px] md:w-[432px] h-[55px] md:h-[82.5px] flex items-center
                    justify-center rounded-[14px] md:rounded-[21px] bg-[#D8C9A6] font-inter font-medium text-[16px]
                    md:text-[24px] text-white shadow-[6px_4px_18px_rgba(0,0,0,0.1)] hover:opacity-90 transition
                    disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 active:opacity-80 active:scale-[0.98]"
                >
                    Return to Couple’s Page
                </a>

            </main>

            <Footer/>
        </div>
    )
}

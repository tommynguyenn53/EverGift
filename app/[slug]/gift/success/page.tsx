import { notFound } from 'next/navigation'
import Stripe from 'stripe'
import AppHeader from '@/components/AppHeader'
import Footer from '@/components/Footer'
import { formatCents } from '@/lib/payments/format'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

type Props = {
    params: { slug: string }
    searchParams: { session_id?: string }
}

export const dynamic = 'force-dynamic'

export default async function GiftSuccessPage({ params, searchParams }: Props) {
    const { slug } = params
    const sessionId = searchParams.session_id

    if (!slug || !sessionId) notFound()

    // ✅ SOURCE OF TRUTH = STRIPE
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['payment_intent'],
    })

    if (session.payment_status !== 'paid') notFound()

    const paymentIntent = session.payment_intent as Stripe.PaymentIntent | null

    const amountTotal = session.amount_total ?? 0
    const metadata = session.metadata ?? {}

    const guestName = metadata.guest_name ?? 'Guest'
    const messageText = metadata.message_text ?? null

    return (
        <div className="min-h-screen px-[24px] py-[20px] bg-gradient-to-b from-[#EDE0C3] via-[#F6EEDC] to-[#FFFEFA]">
            <AppHeader tagline="A celebration of love" showProfile={false} />

            <main className="flex flex-col items-center text-center">

                <h1 className="mt-[32px] md:mt-[48px] font-inter text-[28px] md:text-[42px] text-[#3A3A3A]">
                    Your Gift Has<br />Been Received
                </h1>

                <img
                    src="/checkmark-icon.svg"
                    alt="Success"
                    className="mt-[24px] md:mt-[36px] w-[64px] md:w-[96px]"
                />

                <p className="mt-[24px] md:mt-[36px] font-inter text-[16px] md:text-[24px] text-[#3A3A3A] max-w-[375px]">
                    Thank you for celebrating this special moment.
                </p>

                <div className="mt-[32px] md:mt-[48px] w-[287px] md:w-[430px] bg-white rounded-[12px] px-[15px] py-[15px] shadow">
                    <div className="flex justify-between">
                        <span>Amount Paid</span>
                        <span>{formatCents(amountTotal)}</span>
                    </div>
                </div>

                {messageText && (
                    <div className="mt-[24px] w-[287px] md:w-[430px] bg-white rounded-[12px] px-[15px] py-[15px] shadow italic">
                        “{messageText}”
                    </div>
                )}

                {/* CTA */}
                <a
                    href={`/${slug}`}
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

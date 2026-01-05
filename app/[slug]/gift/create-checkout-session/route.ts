import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseServer } from '@/lib/supabase/server'
import { calculateSummary } from '@/lib/payments/calculateSummary'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
    try {
        const {
            weddingId,
            amountCents,
            guestName,
            message,
            guestCoversFees,
            slug,
            imagePath,
            imagePublicUrl
        } = await req.json()

        if (!weddingId || amountCents < 100) {
            return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
        }

        const supabase = await supabaseServer()

        const { data: wedding } = await supabase
            .from('weddings')
            .select('stripe_account_id')
            .eq('id', weddingId)
            .single()

        if (!wedding?.stripe_account_id) {
            return NextResponse.json(
                { error: 'Wedding not payout-ready' },
                { status: 400 }
            )
        }



        const {
            platformFeeCents,
            stripeFeeCents,
            totalChargedCents,
        } = calculateSummary(amountCents, guestCoversFees)

        // 1️⃣ Create Checkout Session
        const session = await stripe.checkout.sessions.create(
            {
                mode: 'payment',
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'aud',
                            unit_amount: totalChargedCents,
                            product_data: {
                                name: 'Wedding Gift',
                            },
                        },
                        quantity: 1,
                    },
                ],
                payment_intent_data: {
                    application_fee_amount: platformFeeCents,
                    metadata: {
                        wedding_id: weddingId,
                        guest_name: guestName ?? '',
                        message_text: message ?? '',
                    },
                },
                success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}/gift/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}/gift`,
            },
            {
                stripeAccount: wedding.stripe_account_id,
            }
        )


        // 2️⃣ Insert pending gift
        const { error: giftError } = await supabase.from('gifts').insert({
            wedding_id: weddingId,
            amount_cents: amountCents,
            platform_fee_cents: platformFeeCents,
            stripe_fee_cents: stripeFeeCents,
            guest_covered_fees: guestCoversFees,
            stripe_checkout_session_id: session.id, // Checkout session ID
            guest_name: guestName,
            message_text: message,
            image_path: imagePath ?? null,
            image_public_url: imagePublicUrl ?? null,
            status: 'pending',

        })

        if (giftError) {
            console.error(giftError)
            return NextResponse.json(
                { error: 'Failed to save gift' },
                { status: 500 }
            )
        }

        return NextResponse.json({ url: session.url })
    } catch (err) {
        console.error(err)
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        )
    }
}
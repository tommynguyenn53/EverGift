export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseService } from '@/lib/supabase/service'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
    console.log('🔔 WEBHOOK HIT')

    const body = await req.text()
    const sig = req.headers.get('stripe-signature')

    if (!sig) {
        return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (err) {
        console.error('Webhook signature verification failed', err)
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    console.log('✅ Verified event:', event.type)


    const supabase = supabaseService
    const eventId = event.id

    /**
     * 🔒 IDEMPOTENCY CHECK
     * If we've already processed this Stripe event, exit immediately
     */
    const { data: alreadyProcessed } = await supabase
        .from('stripe_webhook_events')
        .select('id')
        .eq('id', eventId)
        .single()

    if (alreadyProcessed) {
        console.log('🔁 Duplicate webhook ignored:', eventId)
        return NextResponse.json({ received: true })
    }

    try {
        /**
         * ✅ HANDLE EVENT
         */

        if (event.type === 'account.updated') {
            const account = event.data.object as Stripe.Account

            const payoutsEnabled =
                account.payouts_enabled === true &&
                (account.requirements?.currently_due?.length ?? 0) === 0 &&
                (account.requirements?.past_due?.length ?? 0) === 0

            console.log('🔔 Stripe account updated', {
                accountId: account.id,
                payoutsEnabled,
                currently_due: account.requirements?.currently_due,
                past_due: account.requirements?.past_due,
            })

            const { error } = await supabase
                .from('weddings')
                .update({
                    payout_enabled: payoutsEnabled,
                })
                .eq('stripe_account_id', account.id)

            if (error) {
                console.error('Failed to update payout_enabled', error)
                throw error
            }
        }


        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session
            const sessionId = session.id

            console.log('💰 Checkout completed:', sessionId)

            const paymentIntentId = session.payment_intent as string | null

            if (!paymentIntentId) {
                console.error('Missing payment_intent on session', sessionId)
                return NextResponse.json({ received: true })
            }

            // 🔁 Retry loop (keep this — it's good)
            let gift = null

            for (let i = 0; i < 5; i++) {
                const { data } = await supabase
                    .from('gifts')
                    .select('*')
                    .eq('stripe_checkout_session_id', sessionId)
                    .single()

                if (data) {
                    gift = data
                    break
                }

                await new Promise((r) => setTimeout(r, 500))
            }

            if (!gift) {
                console.error('Gift not found after retries for session', sessionId)
                return NextResponse.json({ received: true })
            }

            await supabase
                .from('gifts')
                .update({
                    status: 'paid',
                    stripe_payment_intent_id: paymentIntentId,
                })
                .eq('stripe_checkout_session_id', sessionId)
                .neq('status', 'paid')
        }


        if (event.type === 'checkout.session.expired') {
            const session = event.data.object as Stripe.Checkout.Session

            await supabaseService
                .from('gifts')
                .update({ status: 'failed' })
                .eq('stripe_checkout_session_id', session.id)
                .eq('status', 'pending')
        }


        /**
         * ✅ MARK EVENT AS PROCESSED
         * Only done AFTER successful handling
         */
        await supabase
            .from('stripe_webhook_events')
            .insert({ id: eventId })

        console.log('✅ Webhook processed successfully:', eventId)
        return NextResponse.json({ received: true })
    } catch (err) {
        console.error('Webhook processing failed:', err)
        return NextResponse.json({ received: false }, { status: 500 })
    }
}

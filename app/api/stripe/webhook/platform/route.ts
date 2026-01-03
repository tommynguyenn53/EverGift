export const runtime = 'nodejs'

import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { supabaseService } from '@/lib/supabase/service'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
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
            process.env.STRIPE_WEBHOOK_SECRET_PLATFORM!
        )
    } catch (err) {
        console.error('Platform webhook signature failed', err)
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const supabase = supabaseService

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session

        const expanded = await stripe.checkout.sessions.retrieve(session.id, {
            expand: ['payment_intent'],
        })

        const paymentIntent = expanded.payment_intent as Stripe.PaymentIntent

        const { error } = await supabase
            .from('gifts')
            .update({
                status: 'paid',
                stripe_payment_intent_id: paymentIntent.id,
            })
            .eq('stripe_checkout_session_id', session.id)

        if (error) {
            console.error('❌ Failed to mark gift paid', error)
            return NextResponse.json({ received: false }, { status: 500 })
        }
    }

    if (event.type === 'checkout.session.expired') {
        const session = event.data.object as Stripe.Checkout.Session

        await supabase
            .from('gifts')
            .update({ status: 'failed' })
            .eq('stripe_checkout_session_id', session.id)
            .eq('status', 'pending')
    }

    return NextResponse.json({ received: true })
}

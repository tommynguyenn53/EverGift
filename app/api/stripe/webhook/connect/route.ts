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
            process.env.STRIPE_WEBHOOK_SECRET_CONNECT!
        )
    } catch (err) {
        console.error('❌ Connect webhook signature failed', err)
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    if (event.type === 'account.updated') {
        const account = event.data.object as Stripe.Account

        const payoutsEnabled =
            account.payouts_enabled === true &&
            (account.requirements?.currently_due?.length ?? 0) === 0 &&
            (account.requirements?.past_due?.length ?? 0) === 0

        await supabaseService
            .from('weddings')
            .update({ payout_enabled: payoutsEnabled })
            .eq('stripe_account_id', account.id)
    }

    return NextResponse.json({ received: true })
}

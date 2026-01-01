// app/api/stripe/debug-balance/route.ts
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const connectedAccountId = searchParams.get('account')

    if (!connectedAccountId) {
        return NextResponse.json(
            { error: 'Missing account id' },
            { status: 400 }
        )
    }

    const balance = await stripe.balance.retrieve({
        stripeAccount: connectedAccountId,
    })

    return NextResponse.json({
        available: balance.available,
        pending: balance.pending,
    })
}

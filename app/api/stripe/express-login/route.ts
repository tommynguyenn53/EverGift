import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { supabaseService } from '@/lib/supabase/service'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
    const { weddingId } = await req.json()

    const { data: wedding } = await supabaseService
        .from('weddings')
        .select('stripe_account_id')
        .eq('id', weddingId)
        .single()

    if (!wedding?.stripe_account_id) {
        return NextResponse.json({ error: 'Stripe account not found' }, { status: 400 })
    }

    const loginLink = await stripe.accounts.createLoginLink(
        wedding.stripe_account_id
    )

    return NextResponse.json({ url: loginLink.url })
}

import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
})

export async function POST(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    console.log('🔵 sync-stripe called')

    const { id: weddingId } = await context.params
    console.log('💍 weddingId:', weddingId)

    const cookieStore = await cookies()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    console.log('👤 user:', user?.id)

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: wedding, error } = await supabase
        .from('weddings')
        .select('stripe_account_id')
        .eq('id', weddingId)
        .eq('user_id', user.id)
        .single()

    console.log('📄 wedding row:', wedding)
    console.log('❗ weddingError:', error)

    if (!wedding?.stripe_account_id) {
        console.log('⚠️ No stripe_account_id')
        return NextResponse.json({ payoutEnabled: false })
    }

    const account = await stripe.accounts.retrieve(
        wedding.stripe_account_id
    )

    console.log('💳 Stripe account:', {
        payouts_enabled: account.payouts_enabled,
        charges_enabled: account.charges_enabled,
        details_submitted: account.details_submitted,
    })

    const payoutEnabled = account.payouts_enabled === true

    const { error: updateError } = await supabase
        .from('weddings')
        .update({ payout_enabled: payoutEnabled })
        .eq('id', weddingId)

    console.log('📝 DB update error:', updateError)

    return NextResponse.json({ payoutEnabled })
}

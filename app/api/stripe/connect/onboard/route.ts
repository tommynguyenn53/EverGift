import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
    try {
        // cookies() is async in route handlers
        const cookieStore = await cookies()

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return cookieStore.get(name)?.value
                    },
                    set(name: string, value: string, options: any) {
                        cookieStore.set({ name, value, ...options })
                    },
                    remove(name: string, options: any) {
                        cookieStore.set({ name, value: '', ...options })
                    },
                },
            }
        )

        // 1️⃣ Auth check
        const {
            data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // 2️⃣ Read weddingId from request body
        const { weddingId } = await req.json()

        if (!weddingId) {
            return NextResponse.json(
                { error: 'Missing weddingId' },
                { status: 400 }
            )
        }

        // 3️⃣ Fetch the wedding (ownership check)
        const { data: wedding, error: weddingError } = await supabase
            .from('weddings')
            .select('id, stripe_account_id')
            .eq('id', weddingId)
            .eq('user_id', user.id)
            .single()

        if (weddingError || !wedding) {
            return NextResponse.json(
                { error: 'Wedding not found' },
                { status: 404 }
            )
        }

        let stripeAccountId = wedding.stripe_account_id


        // 4️⃣ Create Stripe Express account if needed
        if (!stripeAccountId) {
            const account = await stripe.accounts.create({
                type: 'express',
                country: 'AU',
                email: user.email!,
                capabilities: {
                    card_payments: { requested: true },
                    transfers: { requested: true },
                },
            })

            stripeAccountId = account.id

            await supabase
                .from('weddings')
                .update({ stripe_account_id: stripeAccountId })
                .eq('id', weddingId)
        }

        // 5️⃣ Create onboarding link
        const accountLink = await stripe.accountLinks.create({
            account: stripeAccountId,
            type: 'account_onboarding',
            refresh_url: `${process.env.NEXT_PUBLIC_SITE_URL}/create-wedding?`,
            return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/create-wedding`,
        })

        return NextResponse.json({ url: accountLink.url })
    } catch (err: any) {
        console.error('Stripe onboarding error:', err)

        return NextResponse.json(
            { error: err?.message || 'Failed to start Stripe onboarding' },
            { status: 500 }
        )
    }
}

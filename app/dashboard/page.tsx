import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'
import WeddingQrCode from '@/components/WeddingQrCode'
import LogoutButton from '@/components/LogoutButton'
import PublishToggle from '@/components/PublishToggle'


export default async function DashboardPage() {
    const supabase = await supabaseServer()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/auth/login')
    }

    const { data: wedding } = await supabase
        .from('weddings')
        .select(`
      id,
      partner_one_name,
      partner_two_name,
      slug,
      status
    `)
        .eq('user_id', user.id)
        .single()

    if (!wedding) {
        redirect('/create-wedding')
    }

    const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${wedding.slug}`

    return (
        <div className="p-6 max-w-xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Hi {wedding.partner_one_name} and {wedding.partner_two_name}
                    </h1>
                    <p className="text-gray-600">
                        Here’s your wedding page overview.
                    </p>
                </div>
                <LogoutButton />
            </div>

            {/* QR + Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow text-center">
                    <p className="text-sm text-gray-500">Total Amount Received</p>
                    <p className="text-xl font-semibold mt-2">$—</p>
                    <p className="text-sm text-gray-400 mt-1">
                        Stripe coming soon
                    </p>
                </div>

                <WeddingQrCode value={pageUrl} />
            </div>

            <PublishToggle
                weddingId={wedding.id}
                initialStatus={wedding.status}
            />


            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
                <a
                    href={pageUrl}
                    className="rounded-md bg-[#d6c7a1] text-black py-2 text-sm font-medium text-center"
                >
                    View live page
                </a>

                <a
                    href="/edit-wedding"
                    className="rounded-md bg-[#d6c7a1] text-black py-2 text-sm font-medium text-center"
                >
                    Edit wedding details
                </a>
            </div>

            {/* Recent gifts */}
            <div className="pt-4">
                <h2 className="text-lg font-semibold mb-3">
                    Recent gifts
                </h2>

                <div className="bg-white rounded-xl p-4 text-center text-sm text-gray-500">
                    No gifts yet — they’ll appear here once guests start gifting.
                </div>
            </div>
        </div>
    )
}

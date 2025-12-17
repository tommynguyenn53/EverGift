import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'
import WeddingQrCode from '@/components/WeddingQrCode'


export default async function WeddingReadyPage() {
    const supabase = await supabaseServer()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/auth/login')
    }

    const { data: wedding } = await supabase
        .from('weddings')
        .select('slug')
        .eq('user_id', user.id)
        .single()

    if (!wedding) {
        redirect('/create-wedding')
    }

    const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${wedding.slug}`

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm text-center space-y-6">
                <h1 className="text-2xl font-semibold">
                    Your wedding page is ready 🎉
                </h1>

                <p className="text-gray-600">
                    Your personal QR code and page link are below.
                    You can start sharing them with your guests.
                </p>

                <WeddingQrCode value={pageUrl} />

                <p className="text-sm text-gray-500">
                    Press and hold the QR code to save or share it.
                </p>

                <div className="grid grid-cols-2 gap-3">
                    <a
                        href={pageUrl}
                        className="rounded-md bg-[#d6c7a1] text-black py-2 text-sm font-medium"
                    >
                        View live page
                    </a>

                    <a
                        href="/edit-wedding"
                        className="rounded-md bg-[#d6c7a1] text-black py-2 text-sm font-medium"
                    >
                        Edit wedding details
                    </a>

                    <a
                        href="/dashboard"
                        className="rounded-md bg-[#d6c7a1] text-black py-2 text-sm font-medium col-span-2"
                    >
                        Go to dashboard
                    </a>
                </div>
            </div>
        </div>
    )
}

import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'
import WeddingQrCode from '@/components/WeddingQrCode'
import PageBackground from '@/components/PageBackground'
import WeddingReadyActions from "@/app/wedding-ready/WeddingReadyActions";

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
        <PageBackground>
            <main className="flex flex-col items-center px-4">
                <div className="w-full max-w-sm text-center">

                    {/* Heading */}
                    <h1
                        className="
                          mt-[40px]
                          font-inter
                          font-medium
                          text-[26px]
                          tracking-[0.015em]
                          text-[#3A3A3A]
                        "
                    >
                        Your Wedding Page <br/> Is Ready
                    </h1>

                    {/* Subtext */}
                    <p
                        className="
                          mt-[20px]
                          font-inter
                          font-normal
                          text-[15px]
                          leading-[150%]
                          tracking-[0.015em]
                          text-[#3A3A3A]
                        "
                    >
                        Your personal QR code and page link are <br/> below.
                        You can start sharing them <br/> with your guests.
                    </p>

                    {/* QR Code */}
                    <div className="mt-[32px] flex justify-center">
                        <WeddingQrCode value={pageUrl} />
                    </div>

                    {/* QR helper text */}
                    <p
                        className="
                          mt-[16px]
                          font-inter
                          font-normal
                          text-[15px]
                          tracking-[0.015em]
                          text-[#3A3A3A]
                        "
                    >
                        Press the QR code to save or share it.
                    </p>

                    {/* Action buttons */}
                    <div className= "flex justify-center">
                        <WeddingReadyActions pageUrl={pageUrl} />
                    </div>



                </div>
            </main>
        </PageBackground>
    )
}

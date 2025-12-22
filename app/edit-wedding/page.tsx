import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'
import EditWeddingForm from './EditWeddingForm'
import AppHeader from '@/components/AppHeader'
import PageBackground from "@/components/PageBackground";


export default async function EditWeddingPage() {
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
      wedding_date,
      header_text,
      welcome_message,
      slug
    `)
        .eq('user_id', user.id)
        .single()

    if (!wedding) {
        redirect('/create-wedding')
    }

    return (
            <PageBackground>
            <main> <div className="w-full flex flex-col items-center">

                <EditWeddingForm wedding={wedding} />
            </div>
            </main>
            </PageBackground>
    )
}

import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'
import EditWeddingForm from './EditWeddingForm'
import AppHeader from '@/components/AppHeader'


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
      welcome_message,
      slug
    `)
        .eq('user_id', user.id)
        .single()

    if (!wedding) {
        redirect('/create-wedding')
    }

    return (
        <>
            <AppHeader/>
            <main> <div className="p-6 max-w-xl mx-auto">
                <h1 className="text-2xl font-semibold mb-4">
                    Edit wedding details
                </h1>

                <EditWeddingForm wedding={wedding} />
            </div>
            </main>
        </>
    )
}

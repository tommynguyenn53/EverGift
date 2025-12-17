import { supabaseServer } from '@/lib/supabase/server'
import CreateWeddingForm from './CreateWeddingForm'

export default async function CreateWeddingPage() {
    const supabase = await supabaseServer()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4">
                Create your wedding
            </h1>

            <p className="text-gray-600 mb-6">
                Let’s get started{user?.email ? `, ${user.email}` : ''}.
            </p>

            <CreateWeddingForm />
        </div>
    )
}

import { supabaseServer } from '@/lib/supabase/server'

export default async function CreateWeddingPage() {
    const supabase = await supabaseServer()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4">
                Create your wedding page
            </h1>

            <p className="text-gray-600">
                Let’s get started, {user?.email}
            </p>

            {/* Wedding creation form comes next */}
        </div>
    )
}

import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'

export default async function DashboardPage() {
    const supabase = await supabaseServer()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Safety — middleware should already handle this
    if (!user) {
        redirect('/auth/login')
    }

    // Check if user already has a wedding
    const { data: wedding } = await supabase
        .from('weddings')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle()

    // First-time user → create wedding
    if (!wedding) {
        redirect('/create-wedding')
    }

    // Returning user → dashboard summary
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

            <p className="text-gray-600">
                Welcome back, {user.email}
            </p>

            {/* Dashboard content goes here */}
        </div>
    )
}

import { supabaseServer } from '@/lib/supabase/server'

export default async function TestPage() {
    const supabase = await supabaseServer()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    return (
        <div style={{ padding: 24 }}>
            <h1>Supabase Test</h1>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    )
}

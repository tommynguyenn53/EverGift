import { Suspense } from 'react'
import CreateWeddingClient from './CreateWeddingClient'

export default function CreateWeddingPage() {
    return (
        <Suspense fallback={null}>
            <CreateWeddingClient />
        </Suspense>
    )
}

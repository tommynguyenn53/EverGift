import AppHeader from "@/components/AppHeader";

export default function CheckEmailPage() {
    return (
        <>
            <AppHeader/>
            <main>
                <div className="min-h-screen flex items-center justify-center px-4">
                    <div className="w-full max-w-sm text-center space-y-4">
                        <h1 className="text-2xl font-semibold">Check your email</h1>
                        <p className="text-gray-600">
                            We’ve sent you a confirmation link.
                            Please verify your email to continue.
                        </p>
                    </div>
                </div>
            </main>
        </>
    )
}

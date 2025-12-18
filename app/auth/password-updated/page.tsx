import AppHeader from "@/components/AppHeader";

export default function PasswordUpdatedPage() {
    return (
        <>
            <AppHeader/>
            <main>
                <div className="min-h-screen flex items-center justify-center px-4">
                    <div className="w-full max-w-sm text-center space-y-6">
                        <h1 className="text-2xl font-semibold">
                            Password updated ✅
                        </h1>

                        <p className="text-gray-600">
                            Your password has been changed successfully.
                            You can now log in with your new password.
                        </p>

                        <a
                            href="/auth/login"
                            className="block w-full rounded-md bg-black text-white py-2 font-medium"
                        >
                            Log in
                        </a>
                    </div>
                </div>
            </main>
        </>

    )
}

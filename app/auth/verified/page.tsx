export default function VerifiedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm text-center space-y-6">
                <h1 className="text-2xl font-semibold">
                    Account created 🎉
                </h1>

                <p className="text-gray-600">
                    Your email has been verified successfully.
                    You can now log in to EverGift.
                </p>

                <a
                    href="/auth/login"
                    className="block w-full rounded-md bg-black text-white py-2 font-medium"
                >
                    Log in
                </a>
            </div>
        </div>
    )
}

import LoginForm from './LoginForm'

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm space-y-6">
                <h1 className="text-2xl font-semibold text-center">
                    Log in to EverGift
                </h1>

                <LoginForm />

                <div className="space-y-2 text-center text-sm text-gray-600">
                    <p>
                        <a href="/auth/forgot-password" className="underline">
                            Forgot your password?
                        </a>
                    </p>
                    <p>
                        Don’t have an account?{' '}
                        <a href="/auth/signup" className="underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

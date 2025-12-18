import SignupForm from './SignupForm'
import AppHeader from "@/components/AppHeader";

export default function SignupPage() {
    return (
        <>
            <AppHeader/>
            <main>
                <div className="min-h-screen flex items-center justify-center px-4">
                    <div className="w-full max-w-sm space-y-6">
                        <h1 className="text-2xl font-semibold text-center">
                            Create your EverGift account
                        </h1>

                        <SignupForm/>

                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <a href="/auth/login" className="underline">
                                Log in
                            </a>
                        </p>
                    </div>
                </div>
            </main>
        </>
    )
}

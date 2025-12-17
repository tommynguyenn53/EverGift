import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm text-center space-y-6">
                <h1 className="text-2xl font-semibold">
                    This page isn’t available
                </h1>

                <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full border-2 border-[#d6c7a1] flex items-center justify-center text-[#d6c7a1] text-2xl font-bold">
                        !
                    </div>
                </div>

                <p className="text-gray-600">
                    The wedding link you followed may be incorrect,
                    expired, or no longer active.
                </p>

                <Link
                    href="/"
                    className="block w-full rounded-md bg-[#d6c7a1] text-black py-2 font-medium"
                >
                    Return to EverGift homepage
                </Link>

                <p className="text-xs text-gray-500">
                    If you believe this link should still be active,
                    please contact the couple or EverGift support.
                </p>
            </div>
        </div>
    )
}
